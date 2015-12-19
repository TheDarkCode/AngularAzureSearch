using AngularAzureSearch.WebAPI.PartitionRepositories;
using System.Web.Http;

namespace AngularAzureSearch.WebAPI.Controllers.api
{
    [RoutePrefix("api/item")]
    public class ItemController : ApiController
    {
        #region ctors

        private readonly IItemRepository _repo;

        public ItemController(IItemRepository repo)
        {
            this._repo = repo;
        }

        #endregion
    }
}
