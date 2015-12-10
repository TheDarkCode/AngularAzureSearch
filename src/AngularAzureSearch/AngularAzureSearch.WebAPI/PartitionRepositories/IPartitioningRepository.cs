using AngularAzureSearch.WebAPI.Entities;
using Microsoft.Azure.Documents.Client;
using Microsoft.Azure.Documents;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace AngularAzureSearch.WebAPI.PartitionRepositories
{
    public interface IPartitioningRepository<T>
         where T : class
    {
        IEnumerable<T> Find(string collectionLink, Expression<Func<T, bool>> predicate);
        Task<T> Create(string collectionLink, T entity);
        //Task<ResourceResponse<Document>> CreateDocumentAsync(string collectionLink, T entity);
        //Task<ResourceResponse<Document>> DeleteDocumentAsync(string id);
        //IEnumerable<T> Get(string collectionLink, string entityId, Expression<Func<T, bool>> predicate = null);
        //IEnumerable<T> GetAllInCollection(string collectionLink, Expression<Func<T, bool>> predicate = null);
        //IEnumerable<T> GetByTenant(Expression<Func<T, bool>> predicate = null);
        //IEnumerable<T> Find(string collectionLink, Expression<Func<T, bool>> predicate);
        //Task<T> GetById(string id);
        //Task<ResourceResponse<Document>> UpdateDocumentAsync(T entity);
    }
}
