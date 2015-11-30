﻿using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;

namespace AngularAzureSearch.WebAPI.Models
{
    public class BlobModels
    {
        public class BlobUploadModel
        {
            public string FileName { get; set; }
            public string FileUrl { get; set; }
            public long FileSizeInBytes { get; set; }
            public long FileSizeInKb { get { return (long)Math.Ceiling((double)FileSizeInBytes / 1024); } }
        }

        public class BlobDownloadModel
        {
            public MemoryStream BlobStream { get; set; }
            public string BlobFileName { get; set; }
            public string BlobContentType { get; set; }
            public long BlobLength { get; set; }
        }
    }
}