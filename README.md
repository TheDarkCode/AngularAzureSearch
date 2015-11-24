# AngularAzureSearch
[![Packagist](https://img.shields.io/packagist/l/doctrine/orm.svg)](https://github.com/TheDarkCode/AngularAzureSearch/LICENSE.md)

Sample full-featured web application containing separate WebRole (Front-End Client) and WebAPI (Web API 2 Site using DocumentDB as data store).

Integrates all of the following technologies: AngularJS, Azure Search, Bing Maps, Web API 2,  Azure DocumentDB.

####Current Version: Build 12, 11/20/2015
#####Status: 
  - WebRole is in transition to full utilization of dlFramework.
  - WebAPI is fully working for Trails data. (0 Errors, 0 Warnings) Currently in transition to add hash partitioning sample.
  - DataIndexer is set to Trails data schema.

######Current To Do List:
        Mapping Module Additions ::
        1. Fixing touch events and layout for mobile users (ie: drawPolygon).
        2. Adding info boxes, mapType toggle, save (grab existing url, save to scope, export to User factory) / share search function (grab existing url, save to scope, display textbox with value, and select social button with baseUrl - Twitter, FB, Whatsapp, Email, etc), and add (toggleable) custom zoom controls. Also show # of pins if they are stacked close together when zoomed out (port PinClusterer - http://rtsinani.github.io/PinClusterer/).
        3. Adding other standard shapes for searching by polygon (ie: square, circle).
        4. Modifying CSS to create alternative theme(s).

        View Modifications ::
        5. Creating a UI similar to Apartments.com with additional sample for all types of locations (not just homes). Example being to make an alternative that used people or businesses and their phone / address instead of homes.
        6. Integrating it with a sample DocumentDB/Web API project for management of a DocumentDB "Locations" collection that is indexed by the search service.

        Boilerplate ::
        7. Updating to latest versions of angularjs, bootstrap, etc.
        8. Creating sample with AngularUI Router (ui-router) in place of ngRoute.
        9. Adding additional commenting.
       10. Re-adding file merging / compilation (ie: generating a new site.js with full comments).

######Known Issues/Warnings:
  - WebRole has multiple CSS-related display issues in Firefox.
  - WebRole will be resolved to work with WebAPI in next update.
  - "Homes" page requires resize to trigger render of results/map. Does not render properly in all window sizes. Limited to anchorBottom issue. However in current build, renders on first load of page fine.
  - "Trails" page is disabled.
  - dlMenu animations do not render properly in all instances. Delayed in some cases.
  - Login form is disabled but still displays upon first load.
  - UserProfile elements are hardcoded as part of dlFramework. Will be resolved to WebAPI auth in next update.
  - Url still contains filters and orderby parameters after leaving Homes page.
  - Signup, Manage, and other related membership views will be added in next update.
  - Existing template for geosearches are not configured for mobile.
  - Build-related components for minifying WebRole's JS files are not included yet.
  - Current file structure for root of WebRole will be changed in next update to reflect format going forward.

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

##Helpful Links

######http://blogs.msdn.com/b/documentdb/archive/2014/12/03/scaling-a-multi-tenant-application-with-azure-documentdb.aspx
######DocumentDB Documentation: https://msdn.microsoft.com/en-us/library/azure/dn781482.aspx
######Azure Search Documentation: https://msdn.microsoft.com/en-us/library/azure/dn798933.aspx

##Related Microsoft Virtual Academy Courses

####Adding Microsoft Azure Search to Your Websites and Apps:
######https://mva.microsoft.com/en-us/training-courses/adding-microsoft-azure-search-to-your-websites-and-apps-10540

####Developing Solutions with Azure DocumentDB:
######https://mva.microsoft.com/en-us/training-courses/developing-solutions-with-azure-documentdb-10554

