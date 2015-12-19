using System.Configuration;

namespace AngularAzureSearch.DataIndexer.Helpers
{
    public static class AppSettingsConfig
    {
        /// <summary>
        /// The name of your Azure Search Service.
        /// </summary>
        public static string SearchServiceName { get { return ConfigurationManager.AppSettings["searchServiceName"]; } }

        /// <summary>
        /// The API key used to perform admin functions against your Azure Search Service.
        /// </summary>
        public static string SearchServiceApiKey { get { return ConfigurationManager.AppSettings["searchServiceApiKey"]; } }

        /// <summary>
        /// The full connection string for the DocumentDB database.
        /// </summary>
        public static string DbConnectionString { get { return ConfigurationManager.AppSettings["dbConnectionString"]; } }

        /// <summary>
        /// The DocumentDB collection (name) used as a source for indexing.
        /// </summary>
        public static string SourceCollection { get { return ConfigurationManager.AppSettings["sourceCollection"]; } }

        /// <summary>
        /// The name for the new index you want to create.
        /// </summary>
        public static string IndexName { get { return ConfigurationManager.AppSettings["indexName"]; } }

        /// <summary>
        /// The description for the new index you want to create.
        /// </summary>
        public static string IndexDescription { get { return ConfigurationManager.AppSettings["indexDescription"]; } }

        /// <summary>
        /// The name for the new data source you are creating in Azure Search for your DocumentDB collection.
        /// </summary>
        public static string DataSourceName { get { return ConfigurationManager.AppSettings["dataSourceName"]; } }
        
        /// <summary>
        /// The description for the new data source you are creating in Azure Search for your DocumentDB collection.
        /// </summary>
        public static string DataSourceDescription { get { return ConfigurationManager.AppSettings["dataSourceDescription"]; } }

        /// <summary>
        /// The name for the new indexer you want to create.
        /// </summary>
        public static string IndexerName { get { return ConfigurationManager.AppSettings["indexerName"]; } }

        /// <summary>
        /// The description for the new indexer you want to create.
        /// </summary>
        public static string IndexerDescription { get { return ConfigurationManager.AppSettings["indexerDescription"]; } }

        /// <summary>
        /// The name for the new suggester you want to create.
        /// </summary>
        public static string SuggesterName { get { return ConfigurationManager.AppSettings["suggesterName"]; } }
    }
}
