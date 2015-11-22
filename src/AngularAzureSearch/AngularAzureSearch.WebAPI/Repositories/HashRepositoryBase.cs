using AngularAzureSearch.WebAPI.Entities;
using Microsoft.Azure.Documents;
using Microsoft.Azure.Documents.Client;
using Microsoft.Azure.Documents.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace AngularAzureSearch.WebAPI.Repositories
{
    /// <summary>
    /// All hash repository classes must inherit from this base class.
    /// This base class contains all the basic CRUD operations.
    /// </summary>
    /// <typeparam name="T">The entity type used for the repository.</typeparam>
    public class HashRepositoryBase<T> : DocumentDbClient, IHashRepository<T> where T : ItemBase
    {
        #region ctors

        private Expression<Func<T, bool>> _tenantIdPredicate = null;

        /// <summary>
        /// All Repository classes must inherit this base class.
        /// </summary>
        /// <param name="type">The name of the entity (T), which is the same as the name passed into the model (lowercase).</param>
        /// <param name="dbName">The name of the database.</param>
        /// <param name="collectionName">The name of the collection.</param>
        public HashRepositoryBase(string tenantId, string dbName, string collectionName)
            : base(dbName, collectionName)
        {
            _tenantIdPredicate = v => v.tenantId == tenantId;
        }

        #endregion

        #region Public Methods

        /// <summary>
        /// Get a list of T, with an optional predicate.
        /// </summary>
        /// <param name="predicate">The linq expression Where clause.</param>
        /// <returns>An IEnumerable of T.</returns>
        public IEnumerable<T> Get(Expression<Func<T, bool>> predicate = null)
        {
            var query = Client.CreateDocumentQuery<T>(Collection.DocumentsLink)
                .Where(_tenantIdPredicate)
                .AsQueryable();

            if (predicate != null)
            {
                query = query.Where(predicate);
            }

            return query;
        }

        public Task<T> GetById(string id)
        {
            return Task<T>.Run(() =>
                Client.CreateDocumentQuery<T>(Collection.DocumentsLink)
                .Where(_tenantIdPredicate)
                .Where(p => p.Id == id)
                .AsEnumerable()
                .FirstOrDefault());
        }

        public async Task<ResourceResponse<Document>> CreateDocumentAsync(T entity)
        {
            return await Client.CreateDocumentAsync(Collection.DocumentsLink, entity);
        }

        public async Task<ResourceResponse<Document>> UpdateDocumentAsync(T entity)
        {
            var doc = GetDocument(entity.Id);

            return await Client.ReplaceDocumentAsync(doc.SelfLink, entity);
        }

        public async Task<ResourceResponse<Document>> DeleteDocumentAsync(string id)
        {
            var doc = GetDocument(id);

            return await Client.DeleteDocumentAsync(doc.SelfLink);
        }


        #endregion

        #region Private Methods

        private Document GetDocument(string id)
        {
            var doc = Client.CreateDocumentQuery<Document>(Collection.DocumentsLink)
                            .Where(d => d.Id == id)
                            .AsEnumerable()
                            .FirstOrDefault();
            return doc;
        }


        #endregion
    }
}
