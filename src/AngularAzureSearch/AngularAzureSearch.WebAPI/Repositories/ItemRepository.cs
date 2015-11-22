using AngularAzureSearch.WebAPI.Entities.Items;
using AngularAzureSearch.WebAPI.Helpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace AngularAzureSearch.WebAPI.Repositories
{
    public class ItemRepository : HashRepositoryBase<Item>
    {
        // To be completed. This code is inserted only as a temporary error avoidance.
        public ItemRepository():base("item", AppSettingsConfig.Db, AppSettingsConfig.MainCollection)
        {

        }
    }
}
