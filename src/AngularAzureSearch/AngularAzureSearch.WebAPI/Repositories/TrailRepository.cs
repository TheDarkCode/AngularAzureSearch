using AngularAzureSearch.WebAPI.Entities.Trails;
using AngularAzureSearch.WebAPI.Helpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AngularAzureSearch.WebAPI.Repositories
{
    public class TrailRepository : RepositoryBase<Trail>, ITrailRepository
    {
        public TrailRepository():base("trail", AppSettingsConfig.Db, AppSettingsConfig.MainCollection)
        {

        }
    }
}
