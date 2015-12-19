using Newtonsoft.Json;

namespace AngularAzureSearch.WebAPI.Entities
{
    /// <summary>
    /// This is the base class that all root item classes inherit.  This will 
    /// allow the type of item to be passed in which is used for the 
    /// Where predicate in the RepositoryBase class.
    /// </summary>
    public class ItemBase
    {
        private readonly string _docType;

        /// <summary>
        /// All root entities inherit this base class.
        /// </summary>
        /// <param name="docType">The name of the type of entity (lowercase).</param>
        public ItemBase(string docType)
        {
            this._docType = docType;
        }

        /// <summary>
        /// This is needed for querying in the RepositoryBase. Used by DocumentDB.
        /// </summary>
        [JsonProperty(PropertyName = "id")]
        public string Id { get; set; }

        /// <summary>
        /// This is needed for placing the document in the correct location.
        /// </summary>
        [JsonProperty(PropertyName = "tenantId")]
        public string tenantId { get; set; }

        /// <summary>
        /// This docType field will be used to organize the documents by "docType" in 
        /// DocumentDB in a single-collection scenario.  The docType is just the lowercase
        /// name of the derived class.
        /// </summary>
        [JsonProperty(PropertyName = "docType")]
        public string docType { get { return _docType; } }
    }
}
