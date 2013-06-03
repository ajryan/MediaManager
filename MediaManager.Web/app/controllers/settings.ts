/// <reference path="../_refs.ts" />

declare var Globals: any;

module MediaManager {
    'use strict';

    export class SettingsCtrl {
        static $inject = ['$scope', '$http', 'authService'];

        constructor(private $scope: any, private $http: ng.IHttpService, private authService: AuthService) { // TODO: interface ISettingsScope
            $scope.message = "Settings";
            $scope.result = "";

            $scope.getSomething = () => {
                $http.get(Globals.apiUrl + '/api/settings', {
                    headers: { 'Authorization': 'Bearer ' + authService.getToken()}
                }).success((data) => {
                    $scope.result = JSON.stringify(data);
                }).error((data,status,h,c) => {
                    $scope.result = status;
                });
            }
        }
    }
}
