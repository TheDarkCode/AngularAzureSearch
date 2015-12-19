using AngularAzureSearch.WebAPI.Providers;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;

namespace AngularAzureSearch.WebAPI.Services
{
    public interface IBlobService
    {
        Task<List<Entities.BlobModels.BlobUploadModel>> UploadBlobs(HttpContent httpContent);
        //Task<Models.BlobModels.BlobDownloadModel> DownloadBlob(int blobId);
    }

    public class BlobService : IBlobService
    {
        public async Task<List<Entities.BlobModels.BlobUploadModel>> UploadBlobs(HttpContent httpContent)
        {
            var blobUploadProvider = new BlobStorageUploadProvider();

            var list = await httpContent.ReadAsMultipartAsync(blobUploadProvider)
                .ContinueWith(task =>
                {
                    if (task.IsFaulted || task.IsCanceled)
                    {
                        throw task.Exception;
                    }

                    var provider = task.Result;
                    return provider.Uploads.ToList();
                });

            // TODO: Use data in the list to store blob info in your
            // database so that you can always retrieve it later.

            return list;
        }

        /* public async Task<Models.BlobModels.BlobDownloadModel> DownloadBlob(int blobId)
        {
            // TODO: You must implement this helper method. It should retrieve blob info
            // from your database, based on the blobId. The record should contain the
            // blobName, which you should return as the result of this helper method.
            var blobName = GetBlobName(blobId);

            if (!String.IsNullOrEmpty(blobName))
            {
                var container = BlobHelper.GetBlobContainer();
                var blob = container.GetBlockBlobReference(blobName);

                // Download the blob into a memory stream. Notice that we're not putting the memory
                // stream in a using statement. This is because we need the stream to be open for the
                // API controller in order for the file to actually be downloadable. The closing and
                // disposing of the stream is handled by the Web API framework.
                var ms = new MemoryStream();
                await blob.DownloadToStreamAsync(ms);

                // Strip off any folder structure so the file name is just the file name
                var lastPos = blob.Name.LastIndexOf('/');
                var fileName = blob.Name.Substring(lastPos + 1, blob.Name.Length - lastPos - 1);

                // Build and return the download model with the blob stream and its relevant info
                var download = new Models.BlobModels.BlobDownloadModel
                {
                    BlobStream = ms,
                    BlobFileName = fileName,
                    BlobLength = blob.Properties.Length,
                    BlobContentType = blob.Properties.ContentType
                };

                return download;
            }

            // Otherwise
            return null;
        } */
    }
}
