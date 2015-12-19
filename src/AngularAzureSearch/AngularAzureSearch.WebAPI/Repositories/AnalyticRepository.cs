using AngularAzureSearch.WebAPI.Entities.Analytic;
using AngularAzureSearch.WebAPI.Helpers;

namespace AngularAzureSearch.WebAPI.Repositories
{
    public class AnalyticRepository : RepositoryBase<Analytic>, IAnalyticRepository
    {
        public AnalyticRepository() : base("analytic", "analytic", AppSettingsConfig.Db, AppSettingsConfig.MainCollection)
        {

        }
    }
}
