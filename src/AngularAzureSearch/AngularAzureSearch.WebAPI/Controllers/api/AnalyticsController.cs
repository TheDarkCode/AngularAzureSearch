using System.Collections.Generic;
using System.Threading.Tasks;
using System.Web.Http;
using AngularAzureSearch.WebAPI.Entities.Analytic;
using AngularAzureSearch.WebAPI.Hubs;
using AngularAzureSearch.WebAPI.Repositories;
using Microsoft.AspNet.SignalR;

namespace AngularAzureSearch.WebAPI.Controllers.api
{
    [RoutePrefix("api/analytics")]
    public class AnalyticsController : ApiController
    {

        #region ctors

        private readonly IAnalyticRepository _repo;
        private readonly IHubContext _context;

        public AnalyticsController(IAnalyticRepository repo)
        {
            this._repo = repo;
            this._context = GlobalHost.ConnectionManager.GetHubContext<AnalyticsHub>();
        }

        #endregion

        #region Standard CRUD

        public IEnumerable<Analytic> GetAllInCollection()
        {
            var result = _repo.GetAllInCollection();

            return result;
        }

        public Task<Analytic> GetById(string id)
        {
            return _repo.GetById(id);
        }

        public async Task<IHttpActionResult> Post([FromBody] Analytic entity)
        {
            var result = await _repo.CreateDocumentAsync(entity);
            var id = result.Resource.Id;
            var model = _repo.GetById(id);

            var hubEventParameters = new
            {
                Analytic = entity
            };

            _context.Clients.All.locationReceived(hubEventParameters);

            return Ok(model);
        }

        public async Task<IHttpActionResult> Put(string id, [FromBody]Analytic entity)
        {
            await _repo.UpdateDocumentAsync(entity);
            var model = _repo.GetById(id);

            // Send Analytic Put to All Clients
            _context.Clients.All.putNewAnalytic(entity);

            return Ok(model);
        }

        [System.Web.Http.Authorize]
        public async Task<IHttpActionResult> Delete(string id)
        {
            await _repo.DeleteDocumentAsync(id);

            // Remove Analytic from All Clients
            _context.Clients.All.deleteAnalytic(id);

            return Ok();
        }
        
        #endregion
    }
}
