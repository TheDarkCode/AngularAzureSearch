##ROADMAP

Builds 25+ will include Azure ML integration to demonstrate matching users to Azure Search scoring profiles.

Once it is ready to declare release worthy, create nuget and Visual Studio 2015 template options to allow you to pull in only what pieces you need for your specific implementation.

The WebRole / MobileApp projects will be rewritten with Angular 2 as part of a planned rewrite to occur once .NET 5 becomes generally available in Q1 2016.
 
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
