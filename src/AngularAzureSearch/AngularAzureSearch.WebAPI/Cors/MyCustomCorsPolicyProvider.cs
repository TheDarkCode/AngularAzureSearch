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
        public Task<CorsPolicy> GetCorsPolicyAsync(HttpRequestMessage request, CancellationToken cancellationToken)
        {
            CorsPolicy corsPolicy = new CorsPolicy()
            {
                AllowAnyHeader = true,
                AllowAnyMethod = true
                // Optionally ::
                //,AllowAnyOrigin = true
            };

            string[] origins = AppSettingsConfig.CorsPolicyOrigins.Split(',');

            foreach (var origin in origins)
            {
                corsPolicy.Origins.Add(origin);
            }

            return Task.FromResult(corsPolicy);
        }
    }
}
