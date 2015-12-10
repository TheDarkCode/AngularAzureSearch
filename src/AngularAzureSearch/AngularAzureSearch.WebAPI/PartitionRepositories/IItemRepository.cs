using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;
using AngularAzureSearch.WebAPI.Entities.Items;

namespace AngularAzureSearch.WebAPI.PartitionRepositories
{
    public interface IItemRepository
    {
        Task<Item> Create(Item item, string tenantId);
        IEnumerable<Item> Find(Expression<Func<Item, bool>> predicate);
        IEnumerable<Item> Find(string tenantId, Expression<Func<Item, bool>> predicate);
        void getResolver(int resolverService);
    }
}