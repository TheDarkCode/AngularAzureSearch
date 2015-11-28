# AngularAzureSearch
[![Packagist](https://img.shields.io/packagist/l/doctrine/orm.svg)](https://github.com/TheDarkCode/AngularAzureSearch/LICENSE.md)

Sample full-featured web application containing separate WebRole (Front-End Client) and WebAPI (Web API 2 Site using DocumentDB as data store).

Integrates all of the following technologies: AngularJS, Azure Search, Bing Maps, Web API 2,  Azure DocumentDB.

####LIVE CLIENT DEMO: https://angularazuresearch.azurewebsites.net/
#####LOGIN: demo@github.com
#####PASSWORD: $Ecret123

####LIVE API DEMO: https://githubapi.azurewebsites.net/

######NOTICE: YOU MUST UPDATE ENDPOINT URIs PRIOR TO PRODUCTION DEPLOYMENTS. DEMO SERVICES WILL THROTTLE PUBLIC USERS.

####Current Version: Build 16, 11/27/2015
#####Status: 
  - WebRole works for User login/signup. Confirm Email not tested. dlFramework still in development.
  - WebAPI is fully working for Trails data. (0 Errors, 0 Warnings) Currently in transition to add hash partitioning sample. User Accounts work 100% with dynamic CORS.
  - DataIndexer is set to Trails data schema. Must configure via app settings config file.

######Current To Do List:
        Mapping Module Additions ::
        1. Fixing touch events and layout for mobile users (ie: drawPolygon). (Touch events will be resolved in next update)
        2. Adding info boxes, mapType toggle, save (grab existing url, save to scope, export to User factory) / share search function (grab existing url, save to scope, display textbox with value, and select social button with baseUrl - Twitter, FB, Whatsapp, Email, etc), and add (toggleable) custom zoom controls. Also show # of pins if they are stacked close together when zoomed out (port PinClusterer - http://rtsinani.github.io/PinClusterer/).
        3. Adding other standard shapes for searching by polygon (ie: square, circle).
        4. Modifying CSS to create alternative theme(s). (Some prep work done in dlFramework)

        View Modifications ::
        5. Creating a UI similar to Apartments.com with additional sample for all types of locations (not just homes). Example being to make an alternative that used people or businesses and their phone / address instead of homes.
        6. Integrating it with a sample DocumentDB/Web API project for management of a DocumentDB "Locations" collection that is indexed by the search service.

        Boilerplate ::
        7. Updating to latest versions of angularjs, bootstrap, etc. (Angular 2? Bootstrap 4? Fonts and Icons to be continuously updated in future commits.)
        8. Creating sample with AngularUI Router (ui-router) in place of ngRoute. (Low Priority)
        9. Adding additional commenting. (Continuous)
       10. Re-adding file merging / compilation (ie: generating a new site.js with full comments). (Will be added by Build 20)

######Known Issues/Warnings:
  - WebRole css issues with Firefox only impact Homes page currently.
  - Search page scrolls down slightly on load, but subsequent loads when scroll position is unaltered are not affected.
  - dlMenu animations do not render properly in all instances. Delayed in some cases.
  - Url still contains filters and orderby parameters after leaving Homes page.
  - Confirm Email not tested. Manage user account view will be resolved in next update.
  - Existing template for geosearches are not configured for mobile.
  - Gulp file to be added in next update.
  - Handling long usernames is partially fixed. Improvements will be made.
  - External login providers (Facebook / Twitter / Google / Microsoft) are not implemented yet. Will be added in the coming updates.
  - Limitation for Cors is that it must have the correct URI syntax. Do not add "www." if it is not necessary. Future updates will address this.

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

##Helpful Links

######http://blogs.msdn.com/b/documentdb/archive/2014/12/03/scaling-a-multi-tenant-application-with-azure-documentdb.aspx
######DocumentDB Documentation: https://msdn.microsoft.com/en-us/library/azure/dn781482.aspx
######Azure Search Documentation: https://msdn.microsoft.com/en-us/library/azure/dn798933.aspx

##Related Microsoft Virtual Academy Courses

####Adding Microsoft Azure Search to Your Websites and Apps:
######https://mva.microsoft.com/en-us/training-courses/adding-microsoft-azure-search-to-your-websites-and-apps-10540

####Developing Solutions with Azure DocumentDB:
######https://mva.microsoft.com/en-us/training-courses/developing-solutions-with-azure-documentdb-10554

