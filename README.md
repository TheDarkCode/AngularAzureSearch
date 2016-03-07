<p align="center">
<img src="https://raw.githubusercontent.com/TheDarkCode/AngularAzureSearch/master/res/Photoshop/AngularAzureSearch-Logo.png" alt="AngularAzureSearch" height="auto" width="75%">
</p>

[![Packagist](https://img.shields.io/packagist/l/doctrine/orm.svg)](https://github.com/TheDarkCode/AngularAzureSearch/blob/master/LICENSE)

Sample full-featured web application containing separate WebRole (Front-End Client), WebAPI (Web API 2 Site using DocumentDB as data store), and Apache Cordova MobileApp using AngularJS / Ionic.

This project's goal is to integrate best practices across multiple projects utilizing the following frameworks and feature sets: AngularJS v1.4.3+, Azure Search, Bing Maps, ASP.NET MVC 5 / Web API 2,  Azure DocumentDB, Apache Cordova, Ionic Framework v1.2, Real Time Updates (SignalR), ASP.NET Identity / OWIN, Dynamic Cross Origin Resource Sharing (CORS), Dependency Injection (Ninject), Dynamic Multi-Tenant Data Partitioning (Hash/Managed Hash/Range/Lookup/Spillover), Azure Blob Storage, and Two-Factor Authentication (SendGrid, Twilio).

####LIVE CLIENT DEMO: https://angularazuresearch.azurewebsites.net/
#####LOGIN: demo@github.com
#####PASSWORD: $Ecret123

####LIVE API DEMO: https://githubapi.azurewebsites.net/

######NOTICE: YOU MUST UPDATE ENDPOINT URIs PRIOR TO PRODUCTION DEPLOYMENTS. DEMO SERVICES WILL THROTTLE PUBLIC USERS.

####Current Live Demo Version: Build 21, 12/18/2015
####Current Development Version: Build 23, 1/15/2016
#####Status: 
  - Progress is currently on hold. Extended work is being converted into a new project.
  - WebRole works for User login/signup and Trails data CRUD operations. Confirm Email not tested. dlFramework still in development.
  - WebAPI is fully working for Trails data and User accounts. (0 Errors, 0 Warnings) Support for dynamic partitioning is in-progress.
  - DataIndexer is set to Trails data schema. Must configure via app settings config file. Will support bulk import in next update.
  - MobileApp to be changed to Ionic framework with Build 22. Cors policy in WebAPI will be updated to reflect changes. Will support Android, iOS, and Win Phone builds.

##E-Mail Support: support@dryverless.com

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

####Generating Mobile App Splash Screen and Icons for iOS/Android

While connected to the internet, you should use the following instructions from the Ionic Framework site to auto-generate the appropriately cropped and resized splash and app icons for all the platforms you are deploying to: http://ionicframework.com/docs/cli/icon-splashscreen.html

The TL;DR version is to add the icon and splash screens (renamed to icon.png and splash.png [or psd]) to the "resources" folder at the root of the MobileApp project. Then set your command line or terminal window to the Mobile App project's directory. From there, enter the following commands: "ionic resources --icon" and "ionic resources --splash". The commands will automatically generate the icons and splash screens for all platforms currently added to the project. If it doesn't work, delete the existing icons and splash screens and run the commands again. You must have the Ionic Framework installed via NPM (with the appropriate path set) in order to execute "ionic" prefixed commands.

#####How User Data Appears on DocDB Server:
```json
{
  "id": "463b5add-3abb-482c-8f72-9f199203e22b",
  "UserName": "demo@github.com",
  "Email": "demo@github.com",
  "EmailConfirmed": true,
  "PasswordHash": "AMZO39oQGu9eUtMcy8gho6oPxETXQ8OPmeju7JEVMeHW7LgQi/hcnEATX7294xfBKg==",
  "SecurityStamp": "31a3e067-7508-41c4-acd5-d4311da67b2c",
  "PhoneNumber": null,
  "PhoneNumberConfirmed": false,
  "TwoFactorEnabled": false,
  "LockoutEnd": "0001-01-01T00:00:00+00:00",
  "LockoutEnabled": false,
  "AccessFailedCount": 0,
  "Logins": [],
  "Claims": [],
  "Roles": []
}
```

#####Note Regarding Cordova / Ionic and Windows 10 Universal App

If you going to deploy to Windows 10, be aware that the Ionic generator does not support Windows. Thus, you must use an alternative media generator or export the icon/splash via your usual photo editor. One issue that does come up on Windows 10 desktops is that the app may crash during the transition phase between the splash screen being shown and the starter page. You must comment out this line in app.js to prevent this crash, but only when deploying/building for Windows:

       if (window.cordova && window.cordova.plugins.Keyboard) {
         if (ionic.Platform.platform() != 'windows'){
                  cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
         }
       }

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
