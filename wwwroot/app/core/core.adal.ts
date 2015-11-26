module SjkpSharepointAppTs.Core {
    'use strict';
    var core = angular.module('sjkpSharepointAppTs.adal', []);
	
	
    // using '!' as the hashPrefix but can be a character of your choosing
    core.config(['$locationProvider', function($locationProvider: ng.ILocationProvider) {
        $locationProvider.html5Mode(true).hashPrefix('!');
    }]);
      //ADAL
    core.constant('appId', '3bed0554-b1db-46be-9df9-23ec391016b6');
	core.constant('sharePointTenant', 'sjkpdevs');
    
    core.config(['$logProvider', function($logProvider: ng.ILogProvider) {
        // set debug logging to on
        if ($logProvider.debugEnabled) {
            $logProvider.debugEnabled(true); 
        }
    }]);


    core.config(['$httpProvider', 'adalAuthenticationServiceProvider', 'appId', 'sharePointTenant', adalConfigurator]);

    function adalConfigurator($httpProvider: ng.IHttpProvider, adalProvider: any, appId: string, sharePointTenant: string) {
        var sharePointUrl = 'https://' + sharePointTenant + '.sharepoint.com'
        var sharePointApi = sharePointUrl+'/_api/';
        var adalConfig = {
            instance: 'https://login.microsoftonline.com/',
            tenant: 'common',
            clientId: appId,
            extraQueryParameter: 'nux=1',
            endpoints: {   
                 'https://sjkpdevs.sharepoint.com/' : sharePointUrl          
            }
            // cacheLocation: 'localStorage', // enable this for IE, as sessionStorage does not work for localhost. 
        };
        
        //The url used to talk to the powerbi api
        adalProvider.init(adalConfig, $httpProvider);
    }
}