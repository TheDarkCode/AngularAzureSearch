using System;
using System.ComponentModel.DataAnnotations;
using Microsoft.Azure.Documents.Spatial;
using Newtonsoft.Json;

namespace AngularAzureSearch.WebAPI.Entities.Analytic
{
    public class Analytic : EntityBase
    {
        /// <summary>
        /// Pass the lowercase string name of the class to the base class.
        /// This is used in the repository for storage and querying,
        /// to organize documents by this type name.
        /// Temporary fix for analytic data added.
        /// </summary>
        public Analytic() : base("analytic", "analytic")
        {

        }

        [JsonProperty("location")]
        public Point Location { get; set; }
    }
}