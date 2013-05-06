/// <reference path="_refs.ts" />
module MediaManager {
    'use strict';

    export var App: ng.IModule = angular.module('MediaManagerApp', []);
    
    App.config([
        '$routeProvider', 
        ($routeProvider: ng.IRouteProvider) => {
            $routeProvider
                .when('/home',
                    {
                        controller: MediaManager.HomeCtrl,
                        templateUrl: '/app/partials/home.html'
                    })
                .when('/settings',
                    {
                        controller: MediaManager.SettingsCtrl,
                        templateUrl: '/app/partials/settings.html'
                    })
                .otherwise({ 
                    redirectTo: '/home'
                });
        }
    ]);
}