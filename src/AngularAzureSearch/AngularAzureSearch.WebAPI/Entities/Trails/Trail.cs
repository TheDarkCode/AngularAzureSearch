using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;
using Microsoft.Azure.Documents.Spatial;

namespace AngularAzureSearch.WebAPI.Entities.Trails
{
    public class Trail : EntityBase
    {
        /// <summary>
        /// Pass the lowercase string name of the class to the base class.
        /// This is used in the repository for storage and querying,
        /// to organize documents by this type name.
        /// </summary>
        public Trail() : base("trail")
        {

        }

        [Required]
        public string Name { get; set; }
        public string County { get; set; }
        public Int64 Elevation { get; set; }
        public Point location { get; set; }
    }
}