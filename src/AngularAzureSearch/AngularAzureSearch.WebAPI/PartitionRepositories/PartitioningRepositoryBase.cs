using AngularAzureSearch.WebAPI.Entities;
using AngularAzureSearch.WebAPI.PartitionRepositories;
using Microsoft.Azure.Documents;
using Microsoft.Azure.Documents.Client;
using Microsoft.Azure.Documents.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace AngularAzureSearch.WebAPI.PartitionRepositories
{
    /// <summary>
    /// All partitioned repository classes must inherit from this base class.  This base class 
    /// contains all the basic CRUD operations.
    /// </summary>
    /// <typeparam name="T">The entity type used for the repository.</typeparam>
    public class PartitioningRepositoryBase<T> : DocumentDbPartitioningClient, IPartitioningRepository<T> where T : ItemBase
    {
        #region ctors

        /// <summary>
        /// All Repository classes must inherit this base class.
        /// </summary>
        /// <param name="dbName">The name of the database.</param>
        public PartitioningRepositoryBase(string dbName)
            : base(dbName)
        {

        }

        #endregion

        #region Public Methods

        public virtual IEnumerable<T> Find(string collectionLink, Expression<Func<T, bool>> predicate)
        {
            var ret = Client.CreateDocumentQuery<T>(collectionLink)
                .Where(predicate)
                .AsEnumerable();

            return ret;
        }

        public virtual async Task<T> Create(string collectionLink, T entity)
        {
            Document doc = await Client.CreateDocumentAsync(collectionLink, entity);
            T ret = (T)(dynamic)doc;
            return ret;
        }

        public virtual T Get(string collectionLink, string documentId)
        {
            T doc = Client.CreateDocumentQuery<T>(collectionLink)
                .Where(d => d.Id == documentId)
                .AsEnumerable()
                .FirstOrDefault();

            return doc;
        }

        #endregion

        #region Private Methods



        #endregion
    }
}