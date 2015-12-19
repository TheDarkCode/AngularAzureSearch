using AngularAzureSearch.WebAPI.Entities.Trails;
using AngularAzureSearch.WebAPI.Helpers;

namespace AngularAzureSearch.WebAPI.Repositories
{
    public class TrailRepository : RepositoryBase<Trail>, ITrailRepository
    {
        public TrailRepository():base("trail", "trail", AppSettingsConfig.Db, AppSettingsConfig.MainCollection)
        {

        }
    }
}
