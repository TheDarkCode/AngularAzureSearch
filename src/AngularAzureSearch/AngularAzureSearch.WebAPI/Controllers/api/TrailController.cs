using AngularAzureSearch.WebAPI.Entities.Trails;
using AngularAzureSearch.WebAPI.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;

namespace AngularAzureSearch.WebAPI.Controllers.api
{
    [RoutePrefix("api/trail")]
    public class TrailController : ApiController
    {
        #region ctors

        private readonly ITrailRepository _repo;

        public TrailController(ITrailRepository repo)
        {
            this._repo = repo;
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

        [Authorize]
        public async Task<IHttpActionResult> Post([FromBody]Trail entity)
        {
            var result = await _repo.CreateDocumentAsync(entity);
            var id = result.Resource.Id;
            var model = _repo.GetById(id);

            return Ok(model);
        }

        [Authorize]
        public async Task<IHttpActionResult> Put(string id, [FromBody]Trail entity)
        {
            await _repo.UpdateDocumentAsync(entity);
            var model = _repo.GetById(id);

            return Ok(model);
        }

        [Authorize]
        public async Task<IHttpActionResult> Delete(string id)
        {
            await _repo.DeleteDocumentAsync(id);

            return Ok();
        }
        #endregion
    }
}