using Microsoft.Azure.Documents.Client;
using AngularAzureSearch.WebAPI.Repositories;
using AngularAzureSearch.WebAPI.PartitionResolvers;
using AngularAzureSearch.WebAPI.Initializers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using AngularAzureSearch.WebAPI.Helpers;
using Microsoft.Azure.Documents.Partitioning;
using AngularAzureSearch.WebAPI.Entities;

namespace AngularAzureSearch.WebAPI.Controllers.api
{
    [RoutePrefix("api/partitioning")]
    public class PartitioningController : ApiController
    {
        #region ctors

        public DocumentClient _client;

        public PartitioningController(DocumentClient client)
        {
            _client = client;
        }

        #endregion

        #region Samples

        [Authorize]
        public async Task<IHttpActionResult> HashPartitionResolver()
        {
            string[] collections = AppSettingsConfig.MainCollection.Split(',');
            var database = await DocumentClientHelper.GetNewDatabaseAsync(_client, AppSettingsConfig.Db);
            HashPartitionResolver hashResolver = await PartitionInitializers.InitializeHashResolver("UserId", _client, database, collections);
            return Ok();
        }

        [Authorize]
        public async Task<IHttpActionResult> RangePartitionResolver()
        {
            string[] collections = AppSettingsConfig.MainCollection.Split(',');
            var database = await DocumentClientHelper.GetNewDatabaseAsync(_client, AppSettingsConfig.Db);
            RangePartitionResolver<string> rangeResolver = await PartitionInitializers.InitializeRangeResolver("UserId", _client, database, collections);
            return Ok();
        }

        [Authorize]
        public async Task<IHttpActionResult> LookupPartitionResolver()
        {
            string[] collections = AppSettingsConfig.MainCollection.Split(',');
            var database = await DocumentClientHelper.GetNewDatabaseAsync(_client, AppSettingsConfig.Db);
            LookupPartitionResolver<string> lookupResolver = await PartitionInitializers.InitializeLookupPartitionResolver("UserId", _client, database, collections);
            return Ok();
        }

        [Authorize]
        public async Task<IHttpActionResult> ManagedHashPartitionResolver()
        {
            string[] collections = AppSettingsConfig.MainCollection.Split(',');
            var database = await DocumentClientHelper.GetNewDatabaseAsync(_client, AppSettingsConfig.Db);
            ManagedHashPartitionResolver managedHashResolver = PartitionInitializers.InitializeManagedHashResolver(u => ((UserProfile)u).UserId, _client, database, 3, null);
            return Ok();
        }

        [Authorize]
        public async Task<IHttpActionResult> SpilloverPartitionResolver()
        {
            string[] collections = AppSettingsConfig.MainCollection.Split(',');
            var database = await DocumentClientHelper.GetNewDatabaseAsync(_client, AppSettingsConfig.Db);
            SpilloverPartitionResolver spilloverResolver = new SpilloverPartitionResolver(_client, database);
            _client.PartitionResolvers[database.SelfLink] = spilloverResolver;
            return Ok();
        }

        #endregion
    }
}
