using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AngularAzureSearch.WebAPI.Entities
{
    /// <summary>
    /// This is the base class that all root entity classes inherit.  This will 
    /// allow the type of entity to be passed in which is used for the 
    /// Where predicate in the RepositoryBase class.
    /// </summary>
    public class EntityBase
    {
        private readonly string _docType;
        private readonly string _type;

        /// <summary>
        /// All root entities inherit this base class.
        /// </summary>
        /// <param name="docType">The name of the type of entity (lowercase).</param>
        /// <param name="Type">The type of the document.</param>
        public EntityBase(string docType, string Type)
        {
            this._docType = docType;
            this._type = Type;
        }

        /// <summary>
        /// This is needed for querying in the RepositoryBase. Used by DocumentDB.
        /// </summary>
        [JsonProperty(PropertyName = "id")]
        public string Id { get; set; }

        /// <summary>
        /// This docType field will be used to organize the documents by "docType" in 
        /// DocumentDB in a single-collection scenario.  The docType is just the lowercase
        /// name of the derived class.
        /// </summary>
        [JsonProperty(PropertyName = "docType")]
        public string docType { get { return _docType; } }

        /// <summary>
        /// This type field will be used to organize the documents by "type" in 
        /// DocumentDB in a single-collection scenario. 
        /// </summary>
        [JsonProperty(PropertyName = "type")]
        public string Type { get { return _type; } }
    }
}
