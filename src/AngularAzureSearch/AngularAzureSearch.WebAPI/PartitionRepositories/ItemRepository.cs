using AngularAzureSearch.WebAPI.Entities.Items;
using AngularAzureSearch.WebAPI.Helpers;
using AngularAzureSearch.WebAPI.Initializers;
using AngularAzureSearch.WebAPI.PartitionResolvers;
using Microsoft.Azure.Documents.Client;
using Microsoft.Azure.Documents.Partitioning;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace AngularAzureSearch.WebAPI.PartitionRepositories
{
    public class ItemRepository : PartitioningRepositoryBase<Item>, IItemRepository
    {
        const int Hash = 0;
        const int ManagedHash = 1;
        const int Spillover = 2;
        const int Range = 3;
        const int Lookup = 4;

        public string[] collections = AppSettingsConfig.MainCollection.Split(',');

        public ItemRepository(int resolverService = 1):base(AppSettingsConfig.Db)
        {
            getResolver(resolverService);
        }

        /// <summary>
        /// Initializes the partition resolver to be used with Item repository.
        /// </summary>
        /// <param name="resolverService"></param>
        public async void getResolver(int resolverService)
        {
            switch (resolverService)
            {
                case Hash:
                    HashPartitionResolver hashResolver = await PartitionInitializers.InitializeHashResolver("tenantId", Client, Database, collections);
                    break;
                case ManagedHash:
                    ManagedHashPartitionResolver managedHashResolver = PartitionInitializers.InitializeManagedHashResolver(i => ((Item)i).tenantId, Client, Database, 3, null);
                    break;
                case Spillover:
                    SpilloverPartitionResolver spilloverResolver = new SpilloverPartitionResolver(Client, Database);
                    Client.PartitionResolvers[Database.SelfLink] = spilloverResolver;
                    break;
                case Range:
                    RangePartitionResolver<string> rangeResolver = await PartitionInitializers.InitializeRangeResolver("tenantId", Client, Database, collections);
                    break;
                case Lookup:
                    LookupPartitionResolver<string> lookupResolver = await PartitionInitializers.InitializeLookupPartitionResolver("tenantId", Client, Database, collections);
                    break;
                default:
                    goto case Hash;
            }
        }

        public IEnumerable<Item> Find(Expression<Func<Item, bool>> predicate)
        {
            return this.Find(null, predicate);
        }

        public override IEnumerable<Item> Find(string tenantId, Expression<Func<Item, bool>> predicate)
        {
            IEnumerable<string> collectionLinks = Client.PartitionResolvers[Database.SelfLink].ResolveForRead(tenantId);
            return collectionLinks.SelectMany(collectionLink => base.Find(collectionLink, predicate)).ToList();
        }

        public async Task<Item> Create(Item item, string tenantId)
        {
            item.tenantId = tenantId;
            string collectionLink = Client.PartitionResolvers[Database.SelfLink].ResolveForCreate(tenantId);
            return (Item)await base.Create(collectionLink, item);
        }

    }
}
