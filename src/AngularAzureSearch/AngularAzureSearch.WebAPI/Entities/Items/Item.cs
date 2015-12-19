using Microsoft.Azure.Documents.Spatial;
using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;

namespace AngularAzureSearch.WebAPI.Entities.Items
{
    public class Item : ItemBase
    {
        /// <summary>
        /// Pass the lowercase string name of the class to the base class.
        /// This is used in the repository for storage and querying,
        /// to organize documents by this type name.
        /// </summary>
        public Item() : base("partitionedItem")
        {

        }

        [Required]
        [JsonProperty("name")]
        public string Name { get; set; }
        [JsonProperty("address")]
        public string Address { get; set; }
        [JsonProperty("desc")]
        public string Description { get; set; }
        [JsonProperty("location")]
        public Point Location { get; set; }
        [JsonProperty("_type")]
        public string Type { get; set; }
    }
}
