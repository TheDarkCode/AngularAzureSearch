using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;
using Microsoft.Azure.Documents.Spatial;
using Newtonsoft.Json;

namespace AngularAzureSearch.WebAPI.Entities.Trails
{
    public class Trail : EntityBase
    {
        /// <summary>
        /// Pass the lowercase string name of the class to the base class.
        /// This is used in the repository for storage and querying,
        /// to organize documents by this type name.
        /// 
        /// Temporary fix for trails data added.
        /// </summary>
        public Trail() : base("trail", "trail")
        {

        }

        [Required]
        [JsonProperty("name")]
        public string Name { get; set; }
        [JsonProperty("county")]
        public string County { get; set; }
        [JsonProperty("elevation")]
        public Int64 Elevation { get; set; }
        [JsonProperty("location")]
        public Point Location { get; set; }
    }
}