// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkID=397704
// To debug code on page load in Ripple or on Android devices/emulators: launch your app, set breakpoints, 
// and then run "window.location.reload()" in the JavaScript Console.
(function () {
    "use strict";

    document.addEventListener( 'deviceready', onDeviceReady.bind( this ), false );

    //Loads Scripts Dynamically
    function loadScript(filename) {
        var fileref = document.createElement('script');
        fileref.setAttribute("type", "text/javascript");
        fileref.setAttribute("src", filename);
    }

    //function loadMap() {
    //    var map = new Microsoft.Maps.Map(document.getElementById("map"), {
    //        credentials: "AhbdrWF_V91fRpekZhb1kgBWAB-hoUDfCPgrhxnQjGFECd2oJXHBxu2dqt7PFKAc"
    //    });
    //}

    function onDeviceReady() {
        // Handle the Cordova pause and resume events
        document.addEventListener( 'pause', onPause.bind( this ), false );
        document.addEventListener( 'resume', onResume.bind( this ), false );
        
        // Bing Maps
        // Load Local Scripts if Windows
        if (device.platform == "windows") {
            MSApp.execUnsafeLocalFunction(
            function () {
                loadScript("scripts/Bing.Maps.JavaScript/js/veapicore.js");  //Bing Maps SDK
                loadScript("scripts/Bing.Maps.JavaScript/js/veapiModules.js"); //Bing Maps SDK
                loadScript("scripts/remote-bingmaps-mapcontrol.js"); //downloaded from http://ecn.dev.virtualearth.net/mapcontrol/mapcontrol.ashx?v=7.0

                //Microsoft.Maps.loadModule("Microsoft.Maps.Map", {
                //    callback: loadMap
                //});
            });
        }
        else {
            loadScript("scripts/remote-bingmaps-mapcontrol.js"); //downloaded from http://ecn.dev.virtualearth.net/mapcontrol/mapcontrol.ashx?v=7.0
            //loadMap();
        }

        // TODO: Cordova has been loaded. Perform any initialization that requires Cordova here.
    };

    function onPause() {
        // TODO: This application has been suspended. Save application state here.
    };

    function onResume() {
        // TODO: This application has been reactivated. Restore application state here.
    };
} )();