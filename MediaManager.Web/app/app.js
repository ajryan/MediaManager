var MediaManager;
(function (MediaManager) {
    'use strict';
    MediaManager.App = angular.module('MediaManagerApp', []);
    MediaManager.App.config([
        '$routeProvider', 
        function ($routeProvider) {
            $routeProvider.when('/home', {
                controller: MediaManager.HomeCtrl,
                templateUrl: '/app/partials/home.html'
            }).when('/settings', {
                controller: MediaManager.SettingsCtrl,
                templateUrl: '/app/partials/settings.html'
            }).otherwise({
                redirectTo: '/home'
            });
        }    ]);
})(MediaManager || (MediaManager = {}));
