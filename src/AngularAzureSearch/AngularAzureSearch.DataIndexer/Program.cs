//Copyright Microsoft. All rights reserved.
//Licensed under the MIT License at http://mit-license.org/

//Unless required by applicable law or agreed to in writing, software
//distributed under the License is distributed on an "AS IS" BASIS,
//WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//See the License for the specific language governing permissions and
//limitations under the License.

// Data provided by U.S. Geological Survey - Department of the Interior/USGS
// http://geonames.usgs.gov/domestic/download_data.htm

// Modifications by Mark Hamilton for Trails sample data.
// Sample of Trail Data to Upload to DocumentDB is found in Data\Trails folder.

using Microsoft.Azure;
using Microsoft.Azure.Search;
using Microsoft.Azure.Search.Models;
using Microsoft.Spatial;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using System.Timers;
using AngularAzureSearch.DataIndexer.Helpers;

namespace AngularAzureSearch.DataIndexer
{
    class Program
    {
        private static SearchServiceClient _searchClient;
        private static SearchIndexClient _indexClient;

        // This Sample shows how to delete, create, upload documents and query an index
        static void Main(string[] args)
        {
            // Key and Name for Destination Azure Search Service
            string searchServiceName = AppSettingsConfig.SearchServiceName;
            string apiKey = AppSettingsConfig.SearchServiceApiKey;

            // Settings for DocumentDB Source
            string dbConnectionString = AppSettingsConfig.DbConnectionString;
            string sourceCollection = AppSettingsConfig.SourceCollection;
            string dataSourceName = AppSettingsConfig.DataSourceName;
            string dataSourceDescription = AppSettingsConfig.DataSourceDescription;

            // Settings for New Index, Suggester, and Indexer
            string indexName = AppSettingsConfig.IndexName;
            string indexerName = AppSettingsConfig.IndexerName;
            string indexerDescription = AppSettingsConfig.IndexerDescription;
            string suggesterName = AppSettingsConfig.SuggesterName;

            // Create an HTTP reference to the catalog index
            _searchClient = new SearchServiceClient(searchServiceName, new SearchCredentials(apiKey));
            _indexClient = _searchClient.Indexes.GetClient(indexName);

            Console.WriteLine("{0}", "Deleting index...\n");
            if (DeleteIndex(indexName))
            {
                Console.WriteLine("{0}", "Creating index...\n");
                CreateIndex(indexName, suggesterName);
                Console.WriteLine("{0}", "Sync documents from DocumentDB...\n");
                CreateAndSyncIndexer(dbConnectionString, dataSourceName, dataSourceDescription, sourceCollection, indexName, indexerName, indexerDescription);
            }
            Console.WriteLine("{0}", "Complete.  Press any key to end application...\n");
            Console.ReadKey();
        }

        private static bool DeleteIndex(string indexName)
        {
            // Delete the index if it exists
            try
            {
                _searchClient.Indexes.Delete(indexName);
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error deleting index: {0}\r\n", ex.Message.ToString());
                Console.WriteLine("Did you remember to add your SearchServiceName and SearchServiceApiKey to the app.config?\r\n");
                return false;
            }

            return true;
        }

        private static void CreateIndex(string indexName, string suggesterName)
        {
            // Create the Azure Search index based on the included schema
            try
            {
                // Create the suggester for suggestions
                Suggester sg = new Suggester();
                sg.Name = suggesterName;
                sg.SearchMode = SuggesterSearchMode.AnalyzingInfixMatching;
                sg.SourceFields = new List<string>() { "name", "county" };

                var definition = new Index()
                {
                    Name = indexName,
                    Fields = new[]
                    {
                        new Field("id",     DataType.String)         { IsKey = true,  IsSearchable = false, IsFilterable = false, IsSortable = false, IsFacetable = false, IsRetrievable = true},
                        new Field("name",   DataType.String)         { IsKey = false, IsSearchable = true,  IsFilterable = true,  IsSortable = true,  IsFacetable = false, IsRetrievable = true},
                        new Field("county",    DataType.String)         { IsKey = false, IsSearchable = true,  IsFilterable = true,  IsSortable = true,  IsFacetable = true, IsRetrievable = true},
                        new Field("elevation",    DataType.Int64)         { IsKey = false, IsSearchable = false,  IsFilterable = true,  IsSortable = true,  IsFacetable = true, IsRetrievable = true},
                        new Field("location",       DataType.GeographyPoint) { IsKey = false, IsSearchable = false, IsFilterable = false,  IsSortable = false, IsFacetable = false, IsRetrievable = true},
                    },
                    Suggesters = new List<Suggester> { sg }
                };

                _searchClient.Indexes.Create(definition);
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error creating index: {0}\r\n", ex.Message.ToString());
            }

        }

        private static void CreateAndSyncIndexer(string dbConnectionString, string dataSourceName, string dataSourceDescription, string targetCollection, string indexName, string indexerName, string indexerDescription)
        {
            // Create a new indexer and sync it
            try
            {
                var creds = new DataSourceCredentials(dbConnectionString);
                DataSource ds = new DataSource(dataSourceName, DataSourceType.DocumentDb, creds, new DataContainer(targetCollection));
                ds.Description = dataSourceDescription;

                Indexer idx = new Indexer();
                idx.Name = indexerName;
                idx.Description = indexerDescription;
                idx.DataSourceName = dataSourceName;
                idx.TargetIndexName = indexName;
                idx.Parameters = new IndexingParameters();
                idx.Parameters.MaxFailedItems = 10;
                idx.Parameters.MaxFailedItemsPerBatch = 5;
                idx.Parameters.Base64EncodeKeys = false;

                //Delete indexer and datasource if it existed
                _searchClient.DataSources.Delete(dataSourceName);
                _searchClient.Indexers.Delete(indexerName);

                //Create indexer and datasource
                _searchClient.DataSources.Create(ds);
                _searchClient.Indexers.Create(idx);

                //Launch the sync and then monitor progress until complete
                AzureOperationResponse response = _searchClient.Indexers.Run(indexerName);
                IndexerGetStatusResponse statusResponse;
                bool running = true;

                Console.WriteLine("{0}", "Synchronization running...\n");
                while (running)
                {
                    statusResponse = _searchClient.Indexers.GetStatus(indexerName);
                    if (statusResponse.StatusCode != HttpStatusCode.OK)
                    {
                        Console.WriteLine("Error polling for indexer status.  Status Code: {0}", response.StatusCode.ToString());
                        return;
                    }

                    if (statusResponse.ExecutionInfo.LastResult != null)
                    {
                        switch (statusResponse.ExecutionInfo.LastResult.Status.ToString())
                        {
                            case "InProgress":
                                Console.WriteLine("{0}", "Synchronization running...\n");
                                Thread.Sleep(3000);
                                break;

                            case "Success":
                                running = false;
                                Console.WriteLine("Synchronized {0} rows...\n", statusResponse.ExecutionInfo.LastResult.ItemCount.ToString());
                                break;

                            default:
                                running = false;
                                Console.WriteLine("Synchronization failed: {0}\n", statusResponse.ExecutionInfo.LastResult.ErrorMessage.ToString());
                                break;
                        }
                    }
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Error creating indexer: {0}: \n", ex.Message.ToString());
            }

        }
    }
}
