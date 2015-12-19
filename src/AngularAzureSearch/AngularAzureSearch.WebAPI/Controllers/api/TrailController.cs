using AngularAzureSearch.WebAPI.Entities.Trails;
using AngularAzureSearch.WebAPI.Repositories;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNet.SignalR;
using System.Web.Http;
using AngularAzureSearch.WebAPI.Hubs;
namespace AngularAzureSearch.WebAPI.Controllers.api
{
    [RoutePrefix("api/trail")]
    public class TrailController : ApiController
    {
        #region ctors

        private readonly ITrailRepository _repo;
        private readonly IHubContext _context;

        public TrailController(ITrailRepository repo)
        {
            this._repo = repo;
            this._context = GlobalHost.ConnectionManager.GetHubContext<TrailHub>();
        }

        #endregion

        #region Standard CRUD

        [AllowAnonymous]
        public IEnumerable<Trail> GetAllInCollection()
        {
            var result = _repo.GetAllInCollection();

            return result;
        }

        public Task<Trail> GetById(string id)
        {
            return _repo.GetById(id);
        }

        [System.Web.Http.Authorize]
        public async Task<IHttpActionResult> Post([FromBody]Trail entity)
        {
            var result = await _repo.CreateDocumentAsync(entity);
            var id = result.Resource.Id;
            var model = _repo.GetById(id);

            // Send Trail Posted to All Clients
            //_context = GlobalHost.ConnectionManager.GetHubContext<TrailHub>();
            _context.Clients.All.postNewTrail(entity);

            return Ok(model);
        }

        [System.Web.Http.Authorize]
        public async Task<IHttpActionResult> Put(string id, [FromBody]Trail entity)
        {
            await _repo.UpdateDocumentAsync(entity);
            var model = _repo.GetById(id);

            // Send Trail Put to All Clients
            // _context = GlobalHost.ConnectionManager.GetHubContext<TrailHub>();
            _context.Clients.All.putNewTrail(entity);

            return Ok(model);
        }
        
        [System.Web.Http.Authorize]
        public async Task<IHttpActionResult> Delete(string id)
        {
            await _repo.DeleteDocumentAsync(id);

            // Remove Trail from All Clients
            // _context = GlobalHost.ConnectionManager.GetHubContext<TrailHub>();
            _context.Clients.All.deleteTrail(id);

            return Ok();
        }
        #endregion
    }
}