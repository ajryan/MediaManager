var MediaManager;
(function (MediaManager) {
    'use strict';
    MediaManager.App = angular.module('MediaManagerApp', []);
    MediaManager.App.config([
        '$routeProvider', 
        function ($routeProvider) {
            $routeProvider.when('/login', {
                controller: MediaManager.LoginCtrlDef,
                templateUrl: '/app/partials/login.html'
            }).when('/settings', {
                controller: MediaManager.SettingsCtrlDef,
                templateUrl: '/app/partials/settings.html'
            }).otherwise({
                redirectTo: '/login'
            });
        }    ]);
})(MediaManager || (MediaManager = {}));
