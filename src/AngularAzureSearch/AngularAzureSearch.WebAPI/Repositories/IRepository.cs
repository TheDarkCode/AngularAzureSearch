using AngularAzureSearch.WebAPI.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace AngularAzureSearch.WebAPI.Repositories
{
    public interface IRepository<T>
         where T : EntityBase
    {
        Task<Microsoft.Azure.Documents.Client.ResourceResponse<Microsoft.Azure.Documents.Document>> CreateDocumentAsync(T entity);
        Task<Microsoft.Azure.Documents.Client.ResourceResponse<Microsoft.Azure.Documents.Document>> DeleteDocumentAsync(string id);
        IEnumerable<T> Get(Expression<Func<T, bool>> predicate = null);
        IEnumerable<T> GetAllInCollection(Expression<Func<T, bool>> predicate = null);
        IEnumerable<T> GetByType(Expression<Func<T, bool>> predicate = null);
        Task<T> GetById(string id);
        Task<Microsoft.Azure.Documents.Client.ResourceResponse<Microsoft.Azure.Documents.Document>> UpdateDocumentAsync(T entity);
    }
}
