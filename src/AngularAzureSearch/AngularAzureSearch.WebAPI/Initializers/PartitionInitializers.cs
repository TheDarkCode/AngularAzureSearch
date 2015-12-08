using AngularAzureSearch.WebAPI.Helpers;
using AngularAzureSearch.WebAPI.Models;
using AngularAzureSearch.WebAPI.PartitionResolvers;
using Microsoft.Azure.Documents;
using Microsoft.Azure.Documents.Client;
using Microsoft.Azure.Documents.Partitioning;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AngularAzureSearch.WebAPI.Initializers
{
    public class PartitionInitializers
    {
        public static string defaultOfferType = AppSettingsConfig.DefaultOfferType;

        /// <summary>
        /// Initialize a HashPartitionResolver.
        /// </summary>
        /// <param name="client">The DocumentDB client instance to use.</param>
        /// <param name="database">The database to run the samples on.</param>
        /// <returns>The created HashPartitionResolver.</returns>
        public async Task<HashPartitionResolver> InitializeHashResolver(DocumentClient client, Database database)
        {
            // Create some collections to partition data.
            DocumentCollection collection1 = await DocumentClientHelper.GetCollectionAsync(client, database, "Collection.HashBucket0");
            DocumentCollection collection2 = await DocumentClientHelper.GetCollectionAsync(client, database, "Collection.HashBucket1");

            // Initialize a partition resolver that users hashing, and register with DocumentClient. 
            HashPartitionResolver hashResolver = new HashPartitionResolver("UserId", new[] { collection1.SelfLink, collection2.SelfLink });
            client.PartitionResolvers[database.SelfLink] = hashResolver;

            return hashResolver;
        }

        /// <summary>
        /// Initialize a HashPartitionResolver.
        /// </summary>
        /// <param name="client">The DocumentDB client instance to use.</param>
        /// <param name="database">The database to run the samples on.</param>
        /// <returns>The created HashPartitionResolver.</returns>
        public async Task<RangePartitionResolver<string>> InitializeRangeResolver(DocumentClient client, Database database)
        {
            // Create some collections to partition data.
            DocumentCollection collection1 = await DocumentClientHelper.GetCollectionAsync(client, database, "Collection.A-M");
            DocumentCollection collection2 = await DocumentClientHelper.GetCollectionAsync(client, database, "Collection.N-Z");

            // Initialize a partition resolver that assigns users (A-M) -> collection1, and (N-Z) -> collection2
            // and register with DocumentClient. 
            // Note: \uffff is the largest UTF8 value, so M\ufff includes all strings that start with M.
            RangePartitionResolver<string> rangeResolver = new RangePartitionResolver<string>(
                "UserId",
                new Dictionary<Range<string>, string>()
                {
                    { new Range<string>("A", "M\uffff"), collection1.SelfLink },
                    { new Range<string>("N", "Z\uffff"), collection2.SelfLink },
                });

            client.PartitionResolvers[database.SelfLink] = rangeResolver;
            return rangeResolver;
        }

        /// <summary>
        /// Initialize a HashPartitionResolver that uses a custom function to extract the partition key.
        /// </summary>
        /// <param name="client">The DocumentDB client instance to use.</param>
        /// <param name="database">The database to run the samples on.</param>
        /// <returns>The created HashPartitionResolver.</returns>
        public async Task<HashPartitionResolver> InitializeCustomHashResolver(DocumentClient client, Database database)
        {
            DocumentCollection collection1 = await DocumentClientHelper.GetCollectionAsync(client, database, "Collection.HashBucket0");
            DocumentCollection collection2 = await DocumentClientHelper.GetCollectionAsync(client, database, "Collection.HashBucket1");

            var hashResolver = new HashPartitionResolver(
                u => ((UserProfile)u).UserId,
                new[] { collection1.SelfLink, collection2.SelfLink });

            client.PartitionResolvers[database.SelfLink] = hashResolver;
            return hashResolver;
        }

        /// <summary>
        /// Initialize a LookupPartitionResolver.
        /// </summary>
        /// <param name="client">The DocumentDB client instance to use.</param>
        /// <param name="database">The database to run the samples on.</param>
        /// <returns>The created HashPartitionResolver.</returns>
        private async Task<LookupPartitionResolver<string>> InitializeLookupPartitionResolver(DocumentClient client, Database database)
        {
            DocumentCollection collectionUS = await DocumentClientHelper.GetCollectionAsync(client, database, "Collection.US");
            DocumentCollection collectionEU = await DocumentClientHelper.GetCollectionAsync(client, database, "Collection.Europe");
            DocumentCollection collectionOther = await DocumentClientHelper.GetCollectionAsync(client, database, "Collection.Other");

            // This implementation takes strings as input. If you'd like to implement a strongly typed LookupPartitionResolver, 
            // take a look at EnumLookupPartitionResolver for an example.
            var lookupResolver = new LookupPartitionResolver<string>(
                "PrimaryRegion",
                new Dictionary<string, string>()
                {
                    { Region.UnitedStatesEast.ToString(), collectionUS.SelfLink },
                    { Region.UnitedStatesWest.ToString(), collectionUS.SelfLink },
                    { Region.Europe.ToString(), collectionEU.SelfLink },
                    { Region.AsiaPacific.ToString(), collectionOther.SelfLink },
                    { Region.Other.ToString(), collectionOther.SelfLink },
                });

            client.PartitionResolvers[database.SelfLink] = lookupResolver;
            return lookupResolver;
        }

        /// <summary>
        /// Initialize a "managed" HashPartitionResolver that also takes care of creating collections, and cloning collection properties like
        /// stored procedures, offer type and indexing policy.
        /// </summary>
        /// <param name="client">The DocumentDB client instance to use.</param>
        /// <param name="database">The database to run the samples on.</param>
        /// <returns>The created HashPartitionResolver.</returns>
        private ManagedHashPartitionResolver InitializeManagedHashResolver(DocumentClient client, Database database)
        {
            var hashResolver = new ManagedHashPartitionResolver(u => ((UserProfile)u).UserId, client, database, 3, null, new DocumentCollectionSpec { OfferType = defaultOfferType });
            client.PartitionResolvers[database.SelfLink] = hashResolver;
            return hashResolver;
        }
    }
}
