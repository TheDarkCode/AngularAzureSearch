using AngularAzureSearch.WebAPI.Entities;
using Microsoft.Azure.Documents.Client;
using Microsoft.Azure.Documents;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace AngularAzureSearch.WebAPI.Repositories
{
    public interface IRepository<T>
         where T : EntityBase
    {
        Task<ResourceResponse<Document>> CreateDocumentAsync(T entity);
        Task<ResourceResponse<Document>> DeleteDocumentAsync(string id);
        IEnumerable<T> Get(Expression<Func<T, bool>> predicate = null);
        IEnumerable<T> GetAllInCollection(Expression<Func<T, bool>> predicate = null);
        IEnumerable<T> GetByType(Expression<Func<T, bool>> predicate = null);
        Task<T> GetById(string id);
        Task<ResourceResponse<Document>> UpdateDocumentAsync(T entity);
    }
}
