using Microsoft.AspNet.SignalR;
using Microsoft.Owin.Cors;
using Microsoft.Owin;
using Owin;
using System.Threading.Tasks;
using System.Web.Cors;
using AngularAzureSearch.WebAPI.Helpers;

[assembly: OwinStartup(typeof(AngularAzureSearch.WebAPI.Startup))]

namespace AngularAzureSearch.WebAPI
{
    public partial class Startup
    {
        /// <summary>
        /// Allows you to use Redis Cache with SignalR.
        /// </summary>
        void UseRedisBackplane()
        {
            GlobalHost.DependencyResolver.UseRedis("[YOURENDPOINT].redis.cache.windows.net",
                6379,
                "[PASSWORD]",
                "[EVENT NAME]");
        }

        /// <summary>
        /// Allows you to use Service Bus with SignalR.
        /// </summary>
        void UseServiceBusBackplane()
        {
            GlobalHost.DependencyResolver.UseServiceBus("[CONNECTION STRING]", "[TOPIC PREFIX]");
        }

        /// <summary>
        /// Allows you to use SQL Server with SignalR.
        /// </summary>
        void UseSqlBackplane()
        {
            GlobalHost.DependencyResolver.UseSqlServer("[CONNECTION STRING");
        }

        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);

            //UseRedisBackplane();
            //UseServiceBusBackplane();
            //UseSqlBackplane();

            // Branch the pipeline here for requests that start with "/signalr"
            app.Map("/signalr", map =>
            {
                CorsPolicy corsPolicy = new CorsPolicy()
                {
                    AllowAnyHeader = true,
                    //AllowAnyOrigin = true,
                    AllowAnyMethod = true,
                    SupportsCredentials = true
                };

                // Get Allowed Origins from Config and split by comma. Can be changed to any character that you chose.
                string[] origins = AppSettingsConfig.CorsPolicyOrigins.Split(',');

                // To split by multiple types use the following example as a template:
                //string[] origins = AppSettingsConfig.CorsPolicyOrigins.Split(',', '+');

                foreach (string origin in origins)
                {
                    corsPolicy.Origins.Add(origin);
                }

                var corsOptions = new CorsOptions
                {
                    PolicyProvider = new CorsPolicyProvider
                    {
                        PolicyResolver = context => Task.FromResult(corsPolicy)
                    }
                };

                // Setup the CORS middleware to run before SignalR.
                // By default this will allow all origins. You can 
                // configure the set of origins and/or http verbs by
                // providing a cors options with a different policy.
                map.UseCors(corsOptions);
                var hubConfiguration = new HubConfiguration
                {
                    // You can enable JSONP by uncommenting line below.
                    // JSONP requests are insecure but some older browsers (and some
                    // versions of IE) require JSONP to work cross domain
                    EnableDetailedErrors = true,
                    //EnableJSONP = true,
                    //EnableJavaScriptProxies = true
                };
                // Run the SignalR pipeline. We're not using MapSignalR
                // since this branch already runs under the "/signalr"
                // path.
                map.RunSignalR(hubConfiguration);
            });
            //app.MapSignalR();

        }
    }
}
