/// <reference path="_refs.ts" />
module MediaManager {
    'use strict';

    export var App: ng.IModule = angular.module('MediaManagerApp', []);

    App.config(['$routeProvider', ($routeProvider: ng.IRouteProvider) => {
        $routeProvider
            .when('/login',
                {
                    controller: MediaManager.LoginCtrlDef,
                    templateUrl: '/app/partials/login.html'
                })
            .when('/settings',
                {
                    controller: MediaManager.SettingsCtrlDef,
                    templateUrl: '/app/partials/settings.html'
                })
            .otherwise({ redirectTo: '/login' });
    }]);
}