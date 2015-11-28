using AngularAzureSearch.WebAPI.Helpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using System.Web.Cors;
using System.Web.Http.Cors;

namespace AngularAzureSearch.WebAPI.Cors
{
    public class MyCustomCorsPolicyProvider : ICorsPolicyProvider
    {
        /// <summary>
        /// Returns custom CorsPolicy with AllowAnyHeader and AllowAnyMethod set to true by default.
        /// Allowed origins are imported from config via helper then split into an array and added to
        /// the CorsPolicy.Origins variable of type IList<string>.
        /// </summary>
        /// <param name="request"></param>
        /// <param name="cancellationToken"></param>
        /// <returns></returns>
        public Task<CorsPolicy> GetCorsPolicyAsync(HttpRequestMessage request, CancellationToken cancellationToken)
        {
            CorsPolicy corsPolicy = new CorsPolicy()
            {
                AllowAnyHeader = true,
                AllowAnyMethod = true
                // Optionally ::
                //,AllowAnyOrigin = true
            };

            // Get Allowed Origins from Config and split by comma. Can be changed to any character that you chose.
            string[] origins = AppSettingsConfig.CorsPolicyOrigins.Split(',');
            
            // To split by multiple types use the following example as a template:
            // string[] origins = AppSettingsCOnfig.CorsPolicyOrigins.Split(',','+');

            foreach (string origin in origins)
            {
                corsPolicy.Origins.Add(origin);
            }

            return Task.FromResult(corsPolicy);
        }
    }
}
