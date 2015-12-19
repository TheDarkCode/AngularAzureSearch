using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Blob;

namespace AngularAzureSearch.WebAPI.Helpers
{
    public static class BlobHelper
    {
        public static CloudBlobContainer GetBlobContainer()
        {
            //// Pull these from config
            var blobStorageConnectionString = AppSettingsConfig.BlobStorageConnectionString;
            var blobStorageContainerName = AppSettingsConfig.BlobStorageContainerName;

            // Create blob client and return reference to the container
            var blobStorageAccount = CloudStorageAccount.Parse(blobStorageConnectionString);
            var blobClient = blobStorageAccount.CreateCloudBlobClient();
            return blobClient.GetContainerReference(blobStorageContainerName);
        }
    }
}
