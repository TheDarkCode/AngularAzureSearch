using AngularAzureSearch.WebAPI.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AngularAzureSearch.WebAPI.Repositories
{
    public interface IHashRepository<T>
         where T : ItemBase
    {
        Task<Microsoft.Azure.Documents.Client.ResourceResponse<Microsoft.Azure.Documents.Document>> CreateDocumentAsync(T entity);
        Task<Microsoft.Azure.Documents.Client.ResourceResponse<Microsoft.Azure.Documents.Document>> DeleteDocumentAsync(string id);
        IEnumerable<T> Get(System.Linq.Expressions.Expression<Func<T, bool>> predicate = null);
        Task<T> GetById(string id);
        Task<Microsoft.Azure.Documents.Client.ResourceResponse<Microsoft.Azure.Documents.Document>> UpdateDocumentAsync(T entity);
    }
}
