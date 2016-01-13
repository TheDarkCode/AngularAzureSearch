<p align="center">
<img src="https://raw.githubusercontent.com/TheDarkCode/AngularAzureSearch/master/res/Photoshop/AngularAzureSearch-Logo.png" alt="AngularAzureSearch" height="auto" width="75%">
</p>

[![Packagist](https://img.shields.io/packagist/l/doctrine/orm.svg)](https://github.com/TheDarkCode/AngularAzureSearch/LICENSE.md)

Sample full-featured web application containing separate WebRole (Front-End Client), WebAPI (Web API 2 Site using DocumentDB as data store), and Apache Cordova MobileApp using AngularJS / Ionic.

This project's goal is to integrate best practices across multiple projects utilizing the following frameworks and feature sets: AngularJS v1.4.3+, Azure Search, Bing Maps, ASP.NET MVC 5 / Web API 2,  Azure DocumentDB, Apache Cordova, Ionic Framework v1.2, Real Time Updates (SignalR), ASP.NET Identity / OWIN, Dynamic Cross Origin Resource Sharing (CORS), Dependency Injection (Ninject), Dynamic Multi-Tenant Data Partitioning (Hash/Managed Hash/Range/Lookup/Spillover), Azure Blob Storage, and Two-Factor Authentication (SendGrid, Twilio).

Builds 25+ will include Azure ML integration to demonstrate matching users to Azure Search scoring profiles.

Once it is ready to declare release worthy, I will create nuget and Visual Studio 2015 template options to allow you to pull in only what pieces you need for your specific implementation. The WebRole / MobileApp projects will be rewritten with Angular 2 as part of a planned rewrite to occur once .NET 5 becomes generally available in Q1 2016.

####LIVE CLIENT DEMO: https://angularazuresearch.azurewebsites.net/
#####LOGIN: demo@github.com
#####PASSWORD: $Ecret123

####LIVE API DEMO: https://githubapi.azurewebsites.net/

######NOTICE: YOU MUST UPDATE ENDPOINT URIs PRIOR TO PRODUCTION DEPLOYMENTS. DEMO SERVICES WILL THROTTLE PUBLIC USERS.

####Current Live Demo Version: Build 21, 12/18/2015
####Current Development Version: Build 23, 1/12/2016
#####Status: 
  - WebRole works for User login/signup and Trails data CRUD operations. Confirm Email not tested. dlFramework still in development.
  - WebAPI is fully working for Trails data and User accounts. (0 Errors, 0 Warnings) Support for dynamic partitioning is in-progress.
  - DataIndexer is set to Trails data schema. Must configure via app settings config file. Will support bulk import in next update.
  - MobileApp to be changed to Ionic framework with Build 22. Cors policy in WebAPI will be updated to reflect changes. Will support Android, iOS, and Win Phone builds.

##E-Mail Support: support@dryverless.com

######Upcoming Changes (Within Next 5 Builds):
        1. Azure ML sample integration to demonstrate how to use custom session parameters to automatically associate a user to a scoring profile or different index. ML web service calls will be made an endpoint in the Web API to avoid CORS issues.
        2. Demonstrate Azure Search as a Web API endpoint.
        3. Sample CRUD operations for documents that are partitioned across DocDB collections via Web API.
        4. Dynamic routing, pagination of DocDB calls, data grids with sorting/filtering/search, and a sample page templates (with parallax) for WebRole.
        5. Expanded DataIndexer with async I/O for bulk importing documents to DocDB. Dynamic index creation from input JSON schema with configurable option definitions (sortable/filterable, etc based on variable type - ex: string, geojson).
        6. External Login Providers (Facebook / Twitter) and 2-factor authentication support (SendGrid/Twilio) via Web API.
        7. MobileApp integration of Push Notifications via Azure Mobile Services, use of cordova plugins such as camera and gps.

######Current To Do List:
        Mapping Module Additions ::
        1. Adding info boxes, mapType toggle, save (grab existing url, save to scope, export to User factory) / share search function (grab existing url, save to scope, display textbox with value, and select social button with baseUrl - Twitter, FB, Whatsapp, Email, etc), and add (toggleable) custom zoom controls. Also show # of pins if they are stacked close together when zoomed out (port PinClusterer - http://rtsinani.github.io/PinClusterer/).
        2. Adding other standard shapes for searching by polygon (ie: square, circle).
        3. Modifying CSS to create alternative theme(s). (Some prep work done in dlFramework)

        Boilerplate ::
        4. Updating to latest versions of angularjs, bootstrap, etc. (Angular 2? Bootstrap 4? Fonts and Icons to be continuously updated in future commits.)
        5. Creating sample with AngularUI Router (ui-router) in place of ngRoute. (Part of MobileApp going forward.)
        6. Adding additional commenting. (Continuous)

######Known Issues/Warnings:
  - dlMenu animations do not render properly in all instances. Delayed in some cases.
  - Url still contains filters and orderby parameters after leaving Homes page.
  - Confirm Email not tested. Manage user account view will be resolved in next update.
  - External login providers (Facebook / Twitter / Google / Microsoft) are not implemented yet. Will be added in the coming updates.
  - Limitation for Cors is that it must have the correct URI syntax. Do not add "www." if it is not necessary. Future updates will address this.
  - Range and Lookup Partition Resolver Initializers are not completed yet. Spillover Resolver is not async.
  - Multiple partitioning resolvers requires multiple clients. Current implementation is limited to a single resolver per client.
  - External login support and autopopulating data/profile pictures from FB/Twitter accounts will be added in next round of updates.
  - Interaction with Blob Storage to upload/download files is not completed. Still needs to be linked up with DocDB.

####Azure Service Requirements for Deployment

You must configure the project with your own Azure Search Keys, Azure DocumentDB Database Connection Information, and Bing Maps API Keys.

######If you are new to Azure, you can get a free trial at the following link: 
https://azure.microsoft.com/en-us/pricing/free-trial/

######Bing Maps API (10k transactions/mo for free)
http://www.microsoft.com/maps/Licensing/licensing.aspx#mainTab2

######Azure Search Service are free excluding outbound data transfers (3 data connections / indexes / indexers, 50 MB Total Storage, 10,000 Documents).
https://azure.microsoft.com/en-us/pricing/details/search/

######Azure DocumentDB requires at least an S1 plan ($25/mo = 250 RU/sec, 10 GB Storage) for each collection used (even empty ones).
https://azure.microsoft.com/en-us/pricing/details/documentdb/

######Data Transfers Pricing Details
https://azure.microsoft.com/en-us/pricing/details/data-transfers/

####Generating Mobile App Splash Screen and Icons

While connected to the internet, you should use the following instructions from the Ionic Framework site to auto-generate the appropriately cropped and resized splash and app icons for all the platforms you are deploying to: http://ionicframework.com/docs/cli/icon-splashscreen.html

The TL;DR version is to add the icon and splash screens (renamed to icon.png and splash.png [or psd]) to the "resources" folder at the root of the MobileApp project. Then set your command line or terminal window to the Mobile App project's directory. From there, enter the following commands: "ionic resources --icon" and "ionic resources --splash". The commands will automatically generate the icons and splash screens for all platforms currently added to the project. If it doesn't work, delete the existing icons and splash screens and run the commands again. You must have the Ionic Framework installed via NPM (with the appropriate path set) in order to execute "ionic" prefixed commands.

##Related GitHub Projects / Credits

###Azure Search Demos by Liam Cavanagh, Microsoft
######https://github.com/liamca/AzureSearchDemos
######http://azure.microsoft.com/en-us/documentation/services/search/

###DocumentDb with Web API by Richard J. Leopold
######https://github.com/rleopold/DocDbWebApi/
######(Article found here: http://4rjl.net/post/azure-documentdb-with-web-api)

###DocumentDB.AspNet.Identity by Adrian Fernandez, Microsoft
######https://github.com/tracker086/DocumentDB.AspNet.Identity

###GolfTracker.DocumentDB by King Wilder, Gizmo Beach
######https://github.com/kahanu/GolfTracker.DocumentDB/
######(Video / Article Series found here: http://www.nosqlcentral.net/Story/Details/videos/kahanu/1-documentdb-golf-tracker-overview)

###azure-documentdb-dotnet by Ryan CrawCour & Aravind Ramachandran, Microsoft
######https://github.com/Azure/azure-documentdb-dotnet/
######(Article found here: https://azure.microsoft.com/en-us/documentation/articles/documentdb-sharding/)

###angular-parallax by Brett Donohoo 
######https://github.com/brettdonohoo/angular-parallax

###MailService by James Bisiar
######https://github.com/bisiar

###angular-fullscreen by  Fabio Biondi
######https://github.com/fabiobiondi/angular-fullscreen

###angularUtils (pagination) by Michael Bromley
######https://github.com/michaelbromley/angularUtils

###angular-modal-service by Dave Kerr
######https://github.com/dwmkerr/angular-modal-service/

###MVA-SignalR by Jon Galloway & Brady Gaster, Microsoft
######https://github.com/jongalloway/MVA-SignalR

###Ionic Framework
######https://github.com/driftyco/ionic

##Helpful Links

######http://blogs.msdn.com/b/documentdb/archive/2014/12/03/scaling-a-multi-tenant-application-with-azure-documentdb.aspx
######DocumentDB Documentation: https://msdn.microsoft.com/en-us/library/azure/dn781482.aspx
######Azure Search Documentation: https://msdn.microsoft.com/en-us/library/azure/dn798933.aspx
######Ionic Framework Documentation: http://ionicframework.com/docs/
######W3C Recommendation on Cross-Origin-Resource-Sharing: http://www.w3.org/TR/cors/

##Related Microsoft Virtual Academy Courses

####Adding Microsoft Azure Search to Your Websites and Apps:
######https://mva.microsoft.com/en-us/training-courses/adding-microsoft-azure-search-to-your-websites-and-apps-10540

####Developing Solutions with Azure DocumentDB:
######https://mva.microsoft.com/en-us/training-courses/developing-solutions-with-azure-documentdb-10554

####Lighting Up Real-Time Web Communications with SignalR:
######https://mva.microsoft.com/en-us/training-courses/lighting-up-real-time-web-communications-with-signalr-8358
