
# AngularAzureSearch.WebAPI

Creates the kernel that will manage your application.


#### Returns

The created kernel.

Load your modules or register your services here!

| Name | Description |
| ---- | ----------- |
| kernel | *Ninject.IKernel*<br>The kernel. |
Starts the application

Stops the application.

Generates an URI-friendly ID for the . E.g. "Get-Values-id_name" instead of "GetValues/{id}?name={name}"

| Name | Description |
| ---- | ----------- |
| description | *System.Web.Http.Description.ApiDescription*<br>The . |


#### Returns

The ID as a string.


## Areas.HelpPage.Controllers.HelpController

The controller that will handle requests for the help page.


## Areas.HelpPage.HelpPageConfig

Use this class to customize the Help Page. For example you can set a custom to supply the documentation or you can provide the samples for the requests/responses.

Gets the model that represents an API displayed on the help page. The model is initialized on the first call and cached for subsequent calls.

| Name | Description |
| ---- | ----------- |
| config | *System.Web.Http.HttpConfiguration*<br>The . |
| apiDescriptionId | *System.String*<br>The ID. |


#### Returns

 An 

Gets the help page sample generator.

| Name | Description |
| ---- | ----------- |
| config | *System.Web.Http.HttpConfiguration*<br>The . |


#### Returns

The help page sample generator.

Gets the model description generator.

| Name | Description |
| ---- | ----------- |
| config | *System.Web.Http.HttpConfiguration*<br>The configuration. |


#### Returns

The 

Specifies the actual type of passed to the in an action. The help page will use this information to produce more accurate request samples.

| Name | Description |
| ---- | ----------- |
| config | *System.Web.Http.HttpConfiguration*<br>The . |
| type | *System.Type*<br>The type. |
| controllerName | *System.String*<br>Name of the controller. |
| actionName | *System.String*<br>Name of the action. |
Specifies the actual type of passed to the in an action. The help page will use this information to produce more accurate request samples.

| Name | Description |
| ---- | ----------- |
| config | *System.Web.Http.HttpConfiguration*<br>The . |
| type | *System.Type*<br>The type. |
| controllerName | *System.String*<br>Name of the controller. |
| actionName | *System.String*<br>Name of the action. |
| parameterNames | *System.String[]*<br>The parameter names. |
Specifies the actual type of returned as part of the in an action. The help page will use this information to produce more accurate response samples.

| Name | Description |
| ---- | ----------- |
| config | *System.Web.Http.HttpConfiguration*<br>The . |
| type | *System.Type*<br>The type. |
| controllerName | *System.String*<br>Name of the controller. |
| actionName | *System.String*<br>Name of the action. |
Specifies the actual type of returned as part of the in an action. The help page will use this information to produce more accurate response samples.

| Name | Description |
| ---- | ----------- |
| config | *System.Web.Http.HttpConfiguration*<br>The . |
| type | *System.Type*<br>The type. |
| controllerName | *System.String*<br>Name of the controller. |
| actionName | *System.String*<br>Name of the action. |
| parameterNames | *System.String[]*<br>The parameter names. |
Sets the documentation provider for help page.

| Name | Description |
| ---- | ----------- |
| config | *System.Web.Http.HttpConfiguration*<br>The . |
| documentationProvider | *System.Web.Http.Description.IDocumentationProvider*<br>The documentation provider. |
Sets the help page sample generator.

| Name | Description |
| ---- | ----------- |
| config | *System.Web.Http.HttpConfiguration*<br>The . |
| sampleGenerator | *AngularAzureSearch.WebAPI.Areas.HelpPage.HelpPageSampleGenerator*<br>The help page sample generator. |
Sets the sample directly for all actions with the specified media type.

| Name | Description |
| ---- | ----------- |
| config | *System.Web.Http.HttpConfiguration*<br>The . |
| sample | *System.Object*<br>The sample. |
| mediaType | *System.Net.Http.Headers.MediaTypeHeaderValue*<br>The media type. |
Sets the sample directly for all actions with the specified type and media type.

| Name | Description |
| ---- | ----------- |
| config | *System.Web.Http.HttpConfiguration*<br>The . |
| sample | *System.Object*<br>The sample. |
| mediaType | *System.Net.Http.Headers.MediaTypeHeaderValue*<br>The media type. |
| type | *System.Type*<br>The parameter type or return type of an action. |
Sets the objects that will be used by the formatters to produce sample requests/responses.

| Name | Description |
| ---- | ----------- |
| config | *System.Web.Http.HttpConfiguration*<br>The . |
| sampleObjects | *Unknown type*<br>The sample objects. |
Sets the sample request directly for the specified media type and action.

| Name | Description |
| ---- | ----------- |
| config | *System.Web.Http.HttpConfiguration*<br>The . |
| sample | *System.Object*<br>The sample request. |
| mediaType | *System.Net.Http.Headers.MediaTypeHeaderValue*<br>The media type. |
| controllerName | *System.String*<br>Name of the controller. |
| actionName | *System.String*<br>Name of the action. |
Sets the sample request directly for the specified media type and action with parameters.

| Name | Description |
| ---- | ----------- |
| config | *System.Web.Http.HttpConfiguration*<br>The . |
| sample | *System.Object*<br>The sample request. |
| mediaType | *System.Net.Http.Headers.MediaTypeHeaderValue*<br>The media type. |
| controllerName | *System.String*<br>Name of the controller. |
| actionName | *System.String*<br>Name of the action. |
| parameterNames | *System.String[]*<br>The parameter names. |
Sets the sample request directly for the specified media type of the action.

| Name | Description |
| ---- | ----------- |
| config | *System.Web.Http.HttpConfiguration*<br>The . |
| sample | *System.Object*<br>The sample response. |
| mediaType | *System.Net.Http.Headers.MediaTypeHeaderValue*<br>The media type. |
| controllerName | *System.String*<br>Name of the controller. |
| actionName | *System.String*<br>Name of the action. |
Sets the sample response directly for the specified media type of the action with specific parameters.

| Name | Description |
| ---- | ----------- |
| config | *System.Web.Http.HttpConfiguration*<br>The . |
| sample | *System.Object*<br>The sample response. |
| mediaType | *System.Net.Http.Headers.MediaTypeHeaderValue*<br>The media type. |
| controllerName | *System.String*<br>Name of the controller. |
| actionName | *System.String*<br>Name of the action. |
| parameterNames | *System.String[]*<br>The parameter names. |

## Areas.HelpPage.HelpPageSampleGenerator

This class will generate the samples for the help page.

Initializes a new instance of the class.

Gets the objects that are used directly as samples for certain actions.

Gets CLR types that are used as the content of or .

Search for samples that are provided directly through .

| Name | Description |
| ---- | ----------- |
| controllerName | *System.String*<br>Name of the controller. |
| actionName | *System.String*<br>Name of the action. |
| parameterNames | *System.Collections.Generic.IEnumerable{System.String}*<br>The parameter names. |
| type | *System.Type*<br>The CLR type. |
| formatter | *System.Net.Http.Formatting.MediaTypeFormatter*<br>The formatter. |
| mediaType | *System.Net.Http.Headers.MediaTypeHeaderValue*<br>The media type. |
| sampleDirection | *AngularAzureSearch.WebAPI.Areas.HelpPage.SampleDirection*<br>The value indicating whether the sample is for a request or for a response. |


#### Returns

The sample that matches the parameters.

Gets the request or response body samples.

| Name | Description |
| ---- | ----------- |
| api | *System.Web.Http.Description.ApiDescription*<br>The . |
| sampleDirection | *AngularAzureSearch.WebAPI.Areas.HelpPage.SampleDirection*<br>The value indicating whether the sample is for a request or for a response. |


#### Returns

The samples keyed by media type.

Gets the sample object that will be serialized by the formatters. First, it will look at the . If no sample object is found, it will try to create one using (which wraps an ) and other factories in .

| Name | Description |
| ---- | ----------- |
| type | *System.Type*<br>The type. |


#### Returns

The sample object.

Gets the request body samples for a given .

| Name | Description |
| ---- | ----------- |
| api | *System.Web.Http.Description.ApiDescription*<br>The . |


#### Returns

The samples keyed by media type.

Gets the response body samples for a given .

| Name | Description |
| ---- | ----------- |
| api | *System.Web.Http.Description.ApiDescription*<br>The . |


#### Returns

The samples keyed by media type.

Resolves the actual type of passed to the in an action.

| Name | Description |
| ---- | ----------- |
| api | *System.Web.Http.Description.ApiDescription*<br>The . |


#### Returns

The type.

Resolves the type of the action parameter or return value when or is used.

| Name | Description |
| ---- | ----------- |
| api | *System.Web.Http.Description.ApiDescription*<br>The . |
| controllerName | *System.String*<br>Name of the controller. |
| actionName | *System.String*<br>Name of the action. |
| parameterNames | *System.Collections.Generic.IEnumerable{System.String}*<br>The parameter names. |
| sampleDirection | *AngularAzureSearch.WebAPI.Areas.HelpPage.SampleDirection*<br>The value indicating whether the sample is for a request or a response. |
| formatters | *System.Collections.ObjectModel.Collection{System.Net.Http.Formatting.MediaTypeFormatter}@*<br>The formatters. |
Gets factories for the objects that the supported formatters will serialize as samples. Processed in order, stopping when the factory successfully returns a non- object.


#### Remarks

 Collection includes just initially. Use SampleObjectFactories.Insert(0, func) to provide an override and SampleObjectFactories.Add(func) to provide a fallback.

Gets the objects that are serialized as samples by the supported formatters.

Writes the sample object using formatter.

| Name | Description |
| ---- | ----------- |
| formatter | *System.Net.Http.Formatting.MediaTypeFormatter*<br>The formatter. |
| value | *System.Object*<br>The value. |
| type | *System.Type*<br>The type. |
| mediaType | *System.Net.Http.Headers.MediaTypeHeaderValue*<br>Type of the media. |


#### Returns




## Areas.HelpPage.HelpPageSampleKey

This is used to identify the place where the sample should be applied.

Creates a new based on , controller name, action name and parameter names.

| Name | Description |
| ---- | ----------- |
| sampleDirection | *AngularAzureSearch.WebAPI.Areas.HelpPage.SampleDirection*<br>The . |
| controllerName | *System.String*<br>Name of the controller. |
| actionName | *System.String*<br>Name of the action. |
| parameterNames | *System.Collections.Generic.IEnumerable{System.String}*<br>The parameter names. |
Creates a new based on media type.

| Name | Description |
| ---- | ----------- |
| mediaType | *System.Net.Http.Headers.MediaTypeHeaderValue*<br>The media type. |
Creates a new based on media type, , controller name, action name and parameter names.

| Name | Description |
| ---- | ----------- |
| mediaType | *System.Net.Http.Headers.MediaTypeHeaderValue*<br>The media type. |
| sampleDirection | *AngularAzureSearch.WebAPI.Areas.HelpPage.SampleDirection*<br>The . |
| controllerName | *System.String*<br>Name of the controller. |
| actionName | *System.String*<br>Name of the action. |
| parameterNames | *System.Collections.Generic.IEnumerable{System.String}*<br>The parameter names. |
Creates a new based on media type and CLR type.

| Name | Description |
| ---- | ----------- |
| mediaType | *System.Net.Http.Headers.MediaTypeHeaderValue*<br>The media type. |
| type | *System.Type*<br>The CLR type. |
Gets the name of the action.

Gets the name of the controller.

Gets the media type.

Gets the parameter names.

Gets the .


## Areas.HelpPage.ImageSample

This represents an image sample on the help page. There's a display template named ImageSample associated with this class.

Initializes a new instance of the class.

| Name | Description |
| ---- | ----------- |
| src | *System.String*<br>The URL of an image. |

## Areas.HelpPage.InvalidSample

This represents an invalid sample on the help page. There's a display template named InvalidSample associated with this class.


## Areas.HelpPage.ModelDescriptions.ModelDescription

Describes a type model.


## Areas.HelpPage.ModelDescriptions.ModelDescriptionGenerator

Generates model descriptions for given types.


## Areas.HelpPage.ModelDescriptions.ModelNameAttribute

Use this attribute to change the name of the generated for a type.


## Areas.HelpPage.Models.HelpPageApiModel

The model that represents an API displayed on the help page.

Initializes a new instance of the class.

Gets or sets the that describes the API.

Gets the error messages associated with this model.

Gets the request body parameter descriptions.

Gets or sets the documentation for the request.

Gets or sets the that describes the request body.

Gets or sets the that describes the resource.

Gets the resource property descriptions.

Gets the sample requests associated with the API.

Gets the sample responses associated with the API.

Gets or sets the collection that describes the URI parameters for the API.


## Areas.HelpPage.ObjectGenerator

This class will create an object of a given type and populate it with sample data.

Generates an object for a given type. The type needs to be public, have a public default constructor and settable public properties/fields. Currently it supports the following types: Simple types: , , , , , etc. Complex types: POCO types. Nullables: . Arrays: arrays of simple types or complex types. Key value pairs: Tuples: , , etc Dictionaries: or anything deriving from . Collections: , , , , , or anything deriving from or . Queryables: , .

| Name | Description |
| ---- | ----------- |
| type | *System.Type*<br>The type. |


#### Returns

An object of the given type.


## Areas.HelpPage.SampleDirection

Indicates whether the sample is used for request or response


## Areas.HelpPage.TextSample

This represents a preformatted text sample on the help page. There's a display template named TextSample associated with this class.


## Areas.HelpPage.XmlDocumentationProvider

A custom that reads the API documentation from an XML documentation file.

Initializes a new instance of the class.

| Name | Description |
| ---- | ----------- |
| documentPath | *System.String*<br>The physical path to XML document. |
This confirms the registration code for the new user.

| Name | Description |
| ---- | ----------- |
| userId | *System.String*<br>The UserId for the registering user. |
| code | *System.String*<br>The code used to validate the registration. |


#### Returns



Takes the email address which will send an email to the user with a link to the ResetPassword form.

| Name | Description |
| ---- | ----------- |
| model | *AngularAzureSearch.WebAPI.Entities.ForgotPasswordViewModel*<br>With email address. |


#### Returns



Take the ResetPassword form data to reset the password.

| Name | Description |
| ---- | ----------- |
| model | *AngularAzureSearch.WebAPI.Entities.ResetPasswordViewModel*<br> |


#### Returns

An HTTP Status code - 200 (OK) or 400 (Bad Request)

Uploads one or more blob files.


#### Returns



Returns custom CorsPolicy with AllowAnyHeader and AllowAnyMethod set to true by default. Allowed origins are imported from config via helper then split into an array and added to the CorsPolicy.Origins variable of type "IList string".

| Name | Description |
| ---- | ----------- |
| request | *System.Net.Http.HttpRequestMessage*<br> |
| cancellationToken | *System.Threading.CancellationToken*<br> |


#### Returns



Configure SendGrid Async

| Name | Description |
| ---- | ----------- |
| message | *Microsoft.AspNet.Identity.IdentityMessage*<br> |


#### Returns



SendGrid Email Settings (can be processed to array using helper to use multiple accounts). Ie: you use a comma between each value, and then use a.Split(',') call to build an array then grab string[0], string[1], etc.With potential iterators to check that it.Contains("EXAMPLE")

SendGrid SendAsync

| Name | Description |
| ---- | ----------- |
| message | *Microsoft.AspNet.Identity.IdentityMessage*<br> |


#### Returns




## Entities.EntityBase

This is the base class that all root entity classes inherit. This will allow the type of entity to be passed in which is used for the Where predicate in the RepositoryBase class.

All root entities inherit this base class.

| Name | Description |
| ---- | ----------- |
| docType | *System.String*<br>The name of the type of entity (lowercase). |
| Type | *System.String*<br>The type of the document. |
This docType field will be used to organize the documents by "docType" in DocumentDB in a single-collection scenario. The docType is just the lowercase name of the derived class.

This is needed for querying in the RepositoryBase. Used by DocumentDB.

This type field will be used to organize the documents by "type" in DocumentDB in a single-collection scenario.


## Entities.ItemBase

This is the base class that all root item classes inherit. This will allow the type of item to be passed in which is used for the Where predicate in the RepositoryBase class.

All root entities inherit this base class.

| Name | Description |
| ---- | ----------- |
| tenantId | *System.String*<br>The tenant Id of the entity. |
| docType | *System.String*<br>The name of the type of entity (lowercase). |
This docType field will be used to organize the documents by "docType" in DocumentDB in a single-collection scenario. The docType is just the lowercase name of the derived class.

This is needed for querying in the RepositoryBase. Used by DocumentDB.

This is needed for placing the document in the correct location.

Pass the lowercase string name of the class to the base class. This is used in the repository for storage and querying, to organize documents by this type name.


## Entities.Region

The geographic region a user is in.

The Asia Pacific region.

The Europe region.

Other regions.

The US East region.

The West US region.

Pass the lowercase string name of the class to the base class. This is used in the repository for storage and querying, to organize documents by this type name. Temporary fix for trails data added.


## Entities.UserProfile

Represents a user profile to be stored within DocumentDB.

Initializes a new instance of the class.

| Name | Description |
| ---- | ----------- |
| userId | *System.String*<br>The user ID. |
| userName | *System.String*<br>The user screen name. |
| primaryRegion | *AngularAzureSearch.WebAPI.Entities.Region*<br>The primary region for the user |
| status | *AngularAzureSearch.WebAPI.Entities.UserStatus*<br>The user's status. |
| isPublic | *System.Boolean*<br>The user's public status. |
Adds a friend to the user's profile.

| Name | Description |
| ---- | ----------- |
| friend | *AngularAzureSearch.WebAPI.Entities.UserProfile*<br>The user to add. |
Gets or sets the user's creation time.

Checks if the UserProfile object is the same as the specified argument.

| Name | Description |
| ---- | ----------- |
| other | *AngularAzureSearch.WebAPI.Entities.UserProfile*<br>The other object |


#### Returns

If this is equal to the other object.

Gets or sets the list of friends user IDs.

Gets or sets a value indicating whether the user's information is public or private.

Gets or sets the user's last status modified time.

Gets or sets the primary region for the user.

Gets or sets the profile image URL.

Removes a friend to the user's profile.

| Name | Description |
| ---- | ----------- |
| friend | *AngularAzureSearch.WebAPI.Entities.UserProfile*<br>The user to remove. |
Gets or sets the status of the user.

Gets or sets the user's status message.

Gets or sets the ID for the user.

Gets or sets the user specified name.


## Entities.UserStatus

Represents the status of a user.

The user has marked their status as "Appear Away".

The user is available.

The user has marked their status as "Be Right Back".

The user is busy.

The user has marked their status as "Do Not Disturb".

The user has marked their status as "Off Work".

The DocumentDB authorization key.

Blob Storage Connection String

Blob Storage Container Name

The base Url for the host website that is calling the WebApi service.

The comma-separated list of domains, with no trailing slash!

The name of the DocumentDB database.

The default offer type to set new collections. Ie: S1, S2, S3

The DocumentDB endpoint Uri.

The SendGrid mail account for your accress credentials.

The SendGrid From address used for emails to users.

The Name used in all Sent Emails.

The SendGrid password for your access credentials.

The DocumentDB collection (name) for storing main set of documents. You can add additional settings using this template to pass them into new custom repositories. Simply add the corresponding field to the web.config or update in the Azure Portal's app settings. Alternatively, if you want to specify a collection name directly in the repository, you can do that by passing the string directly in quotes.

Twilio From Phone (the phone number to send text messages).

Twilio Sid used in SMS messages.

Twilio Token used for verifying with SMS service.

The DocumentDB collection to store User information.


## Helpers.DocumentClientHashPartitioningManager

Implements methods to add or remove additional partitions and handle data migration to a HashPartitionResolver. Internally uses to handle requests during transit.

Initializes a new instance of the class.

| Name | Description |
| ---- | ----------- |
| partitionKeyExtractor | *Unknown type*<br>The partition key extractor function. |
| client | *Unknown type*<br>The DocumentDB client instance. |
| database | *Unknown type*<br>The database to partition. |
| initialPartitionCount | *Unknown type*<br>The number of initial partitions to create. |
| readMode | *Unknown type*<br>The mode to process requests in during data migrations. |
Add a partition (collection) to the consistent hash ring.


#### Returns

The Task object for the asynchronous execution.

Gets or sets the DocumentDB client instance.

Gets or sets the Database to be re-partitioned.

Gets or sets the for requests during data migration.

Removes a partition (collection) from the consistent hash ring.


#### Returns

The Task object for the asynchronous execution.

Internal method to rebalance data across a different number of partitions.

| Name | Description |
| ---- | ----------- |
| newPartitionCount | *System.Int32*<br>The target number of partitions. |


#### Returns

The Task object for the asynchronous execution.


## Helpers.DocumentClientHelper

Providers common helper methods for working with DocumentClient.

Copies the indexing policy from the collection spec.

| Name | Description |
| ---- | ----------- |
| collectionSpec | *AngularAzureSearch.WebAPI.Helpers.DocumentCollectionSpec*<br>The collection spec/template |
| collectionDefinition | *Microsoft.Azure.Documents.DocumentCollection*<br>The collection definition to create. |
Creates the script for insertion

| Name | Description |
| ---- | ----------- |
| docFileNames | *System.String[]*<br>The  |
| currentIndex | *System.Int32*<br>The current number of documents inserted. this marks the starting point for this script |
| maxCount | *System.Int32*<br>The max count. |
| maxScriptSize | *System.Int32*<br>The maximum number of characters that the script can have |


#### Returns

Script as a string

Create a DocumentCollection, and retry when throttled.

| Name | Description |
| ---- | ----------- |
| client | *Microsoft.Azure.Documents.Client.DocumentClient*<br>The DocumentDB client instance. |
| database | *Microsoft.Azure.Documents.Database*<br>The database to use. |
| collectionDefinition | *Microsoft.Azure.Documents.DocumentCollection*<br>The collection definition to use. |
| offerType | *System.String*<br>The offer type for the collection. |


#### Returns

The created DocumentCollection.

Creates a new collection.

| Name | Description |
| ---- | ----------- |
| client | *Microsoft.Azure.Documents.Client.DocumentClient*<br>The DocumentDB client instance. |
| database | *Microsoft.Azure.Documents.Database*<br>The Database where this DocumentCollection exists / will be created |
| collectionId | *System.String*<br>The id of the DocumentCollection to search for, or create. |
| collectionSpec | *AngularAzureSearch.WebAPI.Helpers.DocumentCollectionSpec*<br>The spec/template to create collections from. |


#### Returns

The created DocumentCollection object

Deletes a Database resource

| Name | Description |
| ---- | ----------- |
| client | *Microsoft.Azure.Documents.Client.DocumentClient*<br>The DocumentDB client instance. |
| databaseLink | *System.String*<br>The SelfLink of the Database resource to be deleted |


#### Returns



Execute the function with retries on throttle.

| Name | Description |
| ---- | ----------- |
| client | *Microsoft.Azure.Documents.Client.DocumentClient*<br>The DocumentDB client instance. |
| function | *System.Func{System.Threading.Tasks.Task{``0}}*<br>The function to execute. |


#### Returns

The response from the execution.

Get a DocumentCollection by id, or create a new one if one with the id provided doesn't exist.

| Name | Description |
| ---- | ----------- |
| client | *Microsoft.Azure.Documents.Client.DocumentClient*<br>The DocumentDB client instance. |
| database | *Microsoft.Azure.Documents.Database*<br>The Database where this DocumentCollection exists / will be created |
| collectionId | *System.String*<br>The id of the DocumentCollection to search for, or create. |


#### Returns

The matched, or created, DocumentCollection object

Get a DocumentCollection by id, or create a new one if one with the id provided doesn't exist.

| Name | Description |
| ---- | ----------- |
| client | *Microsoft.Azure.Documents.Client.DocumentClient*<br>The DocumentDB client instance. |
| database | *Microsoft.Azure.Documents.Database*<br>The Database where this DocumentCollection exists / will be created |
| collectionId | *System.String*<br>The id of the DocumentCollection to search for, or create. |
| collectionSpec | *AngularAzureSearch.WebAPI.Helpers.DocumentCollectionSpec*<br>The spec/template to create collections from. |


#### Returns

The matched, or created, DocumentCollection object

Get a Database by id, or create a new one if one with the id provided doesn't exist.

| Name | Description |
| ---- | ----------- |
| client | *Microsoft.Azure.Documents.Client.DocumentClient*<br>The DocumentDB client instance. |
| id | *System.String*<br>The id of the Database to search for, or create. |


#### Returns

The matched, or created, Database object

Get a Database by id, or create a new one if one with the id provided doesn't exist.

| Name | Description |
| ---- | ----------- |
| client | *Microsoft.Azure.Documents.Client.DocumentClient*<br>The DocumentDB client instance. |
| id | *System.String*<br>The id of the Database to search for, or create. |


#### Returns

The matched, or created, Database object

Get a DocumentCollection by id, or create a new one if one with the id provided doesn't exist.

| Name | Description |
| ---- | ----------- |
| client | *Microsoft.Azure.Documents.Client.DocumentClient*<br>The DocumentDB client instance. |
| dbLink | *System.String*<br>The Database SelfLink property where this DocumentCollection exists / will be created |
| id | *System.String*<br>The id of the DocumentCollection to search for, or create. |


#### Returns

The matched, or created, DocumentCollection object

Get a Database by id, or create a new one if one with the id provided doesn't exist.

| Name | Description |
| ---- | ----------- |
| client | *Microsoft.Azure.Documents.Client.DocumentClient*<br>The DocumentDB client instance. |
| id | *System.String*<br>The id of the Database to search for, or create. |


#### Returns

The matched, or created, Database object

This method uses a ReadDatabaseFeedAsync method to read a list of all databases on the account. It demonstrates a pattern for how to control paging and deal with continuations This should not be needed for reading a list of databases as there are unlikely to be many hundred, but this same pattern is introduced here and can be used on other ReadFeed methods.

| Name | Description |
| ---- | ----------- |
| client | *Microsoft.Azure.Documents.Client.DocumentClient*<br>The DocumentDB client instance. |


#### Returns

A List of Database entities

Log the number of documents in each collection within the database to the console.

| Name | Description |
| ---- | ----------- |
| client | *Microsoft.Azure.Documents.Client.DocumentClient*<br>The DocumentDB client instance. |
| database | *Microsoft.Azure.Documents.Database*<br>The database to enumerate. |


#### Returns

The Task for the asynchronous execution.

This method uses a ReadCollectionsFeedAsync method to read a list of all collections on a database. It demonstrates a pattern for how to control paging and deal with continuations This should not be needed for reading a list of databases as there are unlikely to be many hundred, but this same pattern is introduced here and can be used on other ReadFeed methods.

| Name | Description |
| ---- | ----------- |
| client | *Microsoft.Azure.Documents.Client.DocumentClient*<br>The DocumentDB client instance. |
| databaseSelfLink | *System.String*<br>The self link for the database. |


#### Returns

A List of Collection entities

Registers the stored procedures, triggers and UDFs in the collection spec/template.

| Name | Description |
| ---- | ----------- |
| client | *Microsoft.Azure.Documents.Client.DocumentClient*<br>The DocumentDB client. |
| collectionSpec | *AngularAzureSearch.WebAPI.Helpers.DocumentCollectionSpec*<br>The collection spec/template. |
| collection | *Microsoft.Azure.Documents.DocumentCollection*<br>The collection. |


#### Returns

The Task object for asynchronous execution.

Bulk import using a stored procedure.

| Name | Description |
| ---- | ----------- |
| client | *Microsoft.Azure.Documents.Client.DocumentClient*<br> |
| collection | *Microsoft.Azure.Documents.DocumentCollection*<br> |
| inputDirectory | *System.String*<br> |
| inputFileMask | *System.String*<br> |


#### Returns




## Helpers.DocumentCollectionSpec

The specification/template for creating a new DocumentCollection.

Gets or sets the IndexingPolicy to use.

Gets or sets the OfferType to use, e.g., S1, S2, S3.

Gets or sets the stored procedures to register.

Gets or sets the triggers to register.

Gets or sets the UDFs to register.

Handy function to remove a suffix from the end of a string (ie: Urls).

| Name | Description |
| ---- | ----------- |
| s | *System.String*<br> |
| suffix | *System.String*<br> |


#### Returns



This method is used for DateTime properties to convert the date to an Epoch date that can be used for DocumentDB range indexes. See this article for more information: http://azure.microsoft.com/blog/2014/11/19/working-with-dates-in-azure-documentdb-4/

| Name | Description |
| ---- | ----------- |
| date | *System.DateTime*<br>The incoming date to convert to epoch integer. |


#### Returns




## Initializers.PartitionInitializers

Partition Initializers contains a collection of methods to initialize different partition resolvers to use such things as hash partitioning, lookup partitioning, and range partitioning.

The defaultOfferType is set in the config file, ie: S1, S2, S3. Will be used if no DocumentCollectionSpec is included for ManagedHashResolver.

Initialize a HashPartitionResolver that uses a custom function to extract the partition key.

| Name | Description |
| ---- | ----------- |
| partitionKeyExtractor | *Unknown type*<br>The partition key extractor function. |
| client | *Microsoft.Azure.Documents.Client.DocumentClient*<br>The DocumentDB client instance to use. |
| database | *Microsoft.Azure.Documents.Database*<br>The database to run the samples on. |
| collectionNames | *Unknown type*<br>The names of collections used. |


#### Returns

The created HashPartitionResolver.

Initialize a HashPartitionResolver.

| Name | Description |
| ---- | ----------- |
| partitionKeyPropertyName | *System.String*<br>The property name to be used as the partition Key. |
| client | *Microsoft.Azure.Documents.Client.DocumentClient*<br>The DocumentDB client instance to use. |
| database | *Microsoft.Azure.Documents.Database*<br>The database to run the samples on. |
| collectionNames | *System.String[]*<br>The names of collections used. |


#### Returns

The created HashPartitionResolver.

Initialize a LookupPartitionResolver. Default is for US East/West to go to first collection name, Europe to second, and AsiaPacific / Other to third.

| Name | Description |
| ---- | ----------- |
| partitionKeyPropertyName | *System.String*<br>The property name to be used as the partition Key. |
| client | *Microsoft.Azure.Documents.Client.DocumentClient*<br>The DocumentDB client instance to use. |
| database | *Microsoft.Azure.Documents.Database*<br>The database to run the samples on. |
| collectionNames | *System.String[]*<br>The names of collections used. |


#### Returns

The created HashPartitionResolver.

Initialize a "managed" HashPartitionResolver that also takes care of creating collections, and cloning collection properties like stored procedures, offer type and indexing policy.

| Name | Description |
| ---- | ----------- |
| partitionKeyExtractor | *Unknown type*<br>The partition key extractor function. (Ex: "u => ((UserProfile)u).UserId") |
| client | *Microsoft.Azure.Documents.Client.DocumentClient*<br>The DocumentDB client instance to use. |
| database | *Microsoft.Azure.Documents.Database*<br>The database to run the samples on. |
| numCollections | *Unknown type*<br>The number of collections to be used. |
| collectionSpec | *AngularAzureSearch.WebAPI.Helpers.DocumentCollectionSpec*<br>The DocumentCollectionSpec to be used for each collection created. If null returns Spec with defaultOfferType as set in config. |


#### Returns

The created HashPartitionResolver.

Initialize a RangePartitionResolver.

| Name | Description |
| ---- | ----------- |
| partitionKeyPropertyName | *System.String*<br>The property name to be used as the partition Key. |
| client | *Microsoft.Azure.Documents.Client.DocumentClient*<br>The DocumentDB client instance to use. |
| database | *Microsoft.Azure.Documents.Database*<br>The database to run the samples on. |
| collectionNames | *System.String[]*<br>The names of collections used. |


#### Returns

The created HashPartitionResolver.


## PartitionRepositories.DocumentDbPartitioningClient

This is the DocumentDB client class that manages the client inherited by partitioning samples.


## PartitionResolvers.EnumLookupPartitionResolver`1

Implement a partition resolver that uses a lookup table to decide how to partition data. Uses an inner partition resolver to support enumerations as the type parameter.

Initializes a new instance of the class.

| Name | Description |
| ---- | ----------- |
| partitionKeyPropertyName | *System.String*<br>The property name for the partition key. |
| partitionMap | *Unknown type*<br>The partition map from key to collection. |
Returns the partition key for the document. Bypass by returning null.

| Name | Description |
| ---- | ----------- |
| document | *System.Object*<br>The document to locate. |


#### Returns

The partition key.

Gets the inner LookupPartitionResolver used for the enumeration.

Returns the collection to create this document. Returns the last collection.

| Name | Description |
| ---- | ----------- |
| partitionKey | *System.Object*<br>The partition key for the create. |


#### Returns

The collection to create in.

Returns the collections to read for a document. Here we return all collections.

| Name | Description |
| ---- | ----------- |
| partitionKey | *System.Object*<br>The partition key for the read. |


#### Returns

The list of collections.


## PartitionResolvers.LookupPartitionResolver`1

Implement a partition resolver that uses a lookup table to decide how to partition data. Use RangePartitionResolver with single value ranges to provide a simpler interface.

Initializes a new instance of the class.

| Name | Description |
| ---- | ----------- |
| partitionKeyPropertyName | *System.String*<br>The property name for the partition key. |
| partitionMap | *Unknown type*<br>The partition map from key to collection. |
Initialize a range partition map containing a single valued Range for each key in the partitionMap.

| Name | Description |
| ---- | ----------- |
| partitionMap | *Unknown type*<br>The lookup partition map. |


#### Returns

The range partition map.


## PartitionResolvers.ManagedHashPartitionResolver

Implement a "managed" hash partition resolver that creates collections as needed.

Initializes a new instance of the class.

| Name | Description |
| ---- | ----------- |
| partitionKeyExtractor | *Unknown type*<br>The partition key extractor function. |
| client | *Microsoft.Azure.Documents.Client.DocumentClient*<br>The DocumentDB client instance. |
| database | *Microsoft.Azure.Documents.Database*<br>The database to use. |
| numberOfCollections | *Unknown type*<br>the number of collections. |
| hashGenerator | *Unknown type*<br>the hash generator. |
| collectionSpec | *AngularAzureSearch.WebAPI.Helpers.DocumentCollectionSpec*<br>the specification/template to create collections from. |
| collectionIdPrefix | *Unknown type*<br>the prefix to use for collections. |
Gets the prefix for collection ids (names).

Gets the template to create collections from.

Gets or creates the collections for the hash resolver.

| Name | Description |
| ---- | ----------- |
| client | *Microsoft.Azure.Documents.Client.DocumentClient*<br>The DocumentDB client instance. |
| database | *Microsoft.Azure.Documents.Database*<br>The database to use. |
| numberOfCollections | *System.Int32*<br>The number of collections. |
| collectionIdPrefix | *System.String*<br>The prefix to use while creating collections. |
| spec | *AngularAzureSearch.WebAPI.Helpers.DocumentCollectionSpec*<br>The specification/template to use to create collections. |


#### Returns

The list of collection self links.

Gets the number of collections/partitions.


## PartitionResolvers.SpilloverPartitionResolver

Creates a PartitionResolver that automatically creates collections as they fill up. Default fillFactor is 90%. Prefix: "Collection."

Initializes a new instance of the class.

| Name | Description |
| ---- | ----------- |
| client | *Microsoft.Azure.Documents.Client.DocumentClient*<br>The DocumentDB client instance. |
| database | *Microsoft.Azure.Documents.Database*<br>The database to use. |
| collectionSpec | *AngularAzureSearch.WebAPI.Helpers.DocumentCollectionSpec*<br>The specification/template to create collections from. |
| collectionIdPrefix | *System.String*<br>The prefix to use for collections. |
| fillFactor | *System.Double*<br>The fill factor for spilling over collections. |
| checkIntervalSeconds | *System.Double*<br>The interval between collection size checks. |
Gets the time interval to check the usage of collections.

Gets the DocumentDB client.

Gets the Collection Id prefix to use.

Gets or sets the list of collections in use.

Gets the collection specification/template to use.

Gets the Database to use.

Gets the collection fill factor to spill over.

Gets or creates the collections for the hash resolver.

| Name | Description |
| ---- | ----------- |
| client | *Microsoft.Azure.Documents.Client.DocumentClient*<br>The DocumentDB client instance. |
| database | *Microsoft.Azure.Documents.Database*<br>The database to use. |
| collectionIdPrefix | *System.String*<br>The prefix to use while creating collections. |
| spec | *AngularAzureSearch.WebAPI.Helpers.DocumentCollectionSpec*<br>The specification/template to use to create collections. |


#### Returns

The list of collection self links.

Returns the partition key for the document. Bypass by returning null.

| Name | Description |
| ---- | ----------- |
| document | *System.Object*<br>The document to locate. |


#### Returns

The partition key.

Gets the last time the collection size was checked.

Returns the collection to create this document. Returns the last collection.

| Name | Description |
| ---- | ----------- |
| partitionKey | *System.Object*<br>The partition key for the create. |


#### Returns

The collection to create in.

Returns the collections to read for a document. Here we return all collections.

| Name | Description |
| ---- | ----------- |
| partitionKey | *System.Object*<br>The partition key for the read. |


#### Returns

The list of collections.

Check if a spillover has to be scheduled.


#### Returns

Should a new collection be created.


## PartitionResolvers.TransitionHashPartitionResolver

Creates a partition resolver that handles routing of reads and creates during transitions between partitioning configurations. Most commonly when you add an additional collection to the hash ring. This also shows how you can manage the policy for handling reads during migration (read both old and new partitions, or throw a retry-able error, etc.)

Initializes a new instance of the class.

| Name | Description |
| ---- | ----------- |
| current | *Microsoft.Azure.Documents.Client.IPartitionResolver*<br>The current IPartitionResolver. |
| next | *Microsoft.Azure.Documents.Client.IPartitionResolver*<br>The next IPartitionResolver. |
| readMode | *AngularAzureSearch.WebAPI.PartitionResolvers.TransitionReadMode*<br>How to handle read requests during transition. |
Gets the current IPartitionResolver to migrate from.

Returns the partition key for the document.

| Name | Description |
| ---- | ----------- |
| document | *System.Object*<br>The document to locate. |


#### Returns

The partition key.

Gets the next IPartitionResolver to migrate to.

Gets the to handle reads during transitions.

Returns the collection to create this document. Returns the last collection.

| Name | Description |
| ---- | ----------- |
| partitionKey | *System.Object*<br>The partition key for the create. |


#### Returns

The collection to create in.

Returns the collections to read for a partitionKey, based on the TransitionReadMode.

| Name | Description |
| ---- | ----------- |
| partitionKey | *System.Object*<br>The partition key for the read. |


#### Returns

The list of collections.


## PartitionResolvers.TransitionReadMode

Specifies how to handle requests to partitions in transition.

Throw an transient Exception when reads are attempted during migration.

Perform reads using partitions from both current and targeted PartitionResolvers, and return the union of results.

Perform reads using the current PartitionResolver.

Perform reads using the targeted PartitionResolver.


## Repositories.DocumentDbClient

This is the DocumentDB client class that the RepositoryBase class will inherit to consume the properties.


## Repositories.ITrailRepository

Add custom members here.


## Repositories.RepositoryBase`1

All repository classes must inherit from this base class. This base class contains all the basic CRUD operations.

All Repository classes must inherit this base class.

| Name | Description |
| ---- | ----------- |
| docType | *System.String*<br>The name of the entity (T), which is the same as the name passed into the model (lowercase). |
| Type | *System.String*<br>The type of the document. |
| dbName | *System.String*<br>The name of the database. |
| collectionName | *System.String*<br>The name of the collection. |
Get a list of T, with an optional predicate.

| Name | Description |
| ---- | ----------- |
| predicate | *Unknown type*<br>The linq expression Where clause. |


#### Returns

An IEnumerable of T.

Get a list of T, with an optional predicate.

| Name | Description |
| ---- | ----------- |
| predicate | *Unknown type*<br>The linq expression Where clause. |


#### Returns

An IEnumerable of T.

Get a list of T, with an optional predicate.

| Name | Description |
| ---- | ----------- |
| predicate | *Unknown type*<br>The linq expression Where clause. |


#### Returns

An IEnumerable of T.

The method used to send mail.

| Name | Description |
| ---- | ----------- |
| from | *System.String*<br>a String that contains the address of the sender |
| to | *System.String*<br>a string that contains the address of the recipient |
| subject | *System.String*<br>a String that contains the title text |
| body | *System.String*<br>a String that contains the message body |
| isHtml | *System.Boolean*<br>Indicate wether the mail message body is HTML |


#### Returns

sucess

Twilio SMS Settings

