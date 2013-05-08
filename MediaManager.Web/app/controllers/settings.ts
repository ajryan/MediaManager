/// <reference path="../_refs.ts" />

declare var Globals: any;

module MediaManager {
    'use strict';

    export class SettingsCtrl {
        static $inject = ['$scope', '$http', 'azureMobileService'];

        constructor(private $scope: any, private $http: ng.IHttpService, private azureMobileService: AzureMobileService) { // TODO: interface ISettingsScope
            $scope.message = "Settings";
            $scope.result = "";

            $scope.getSomething = () => {
                $http.get(Globals.apiUrl + '/api/settings', {
                    headers: { 'Authorization': 'Bearer ' + azureMobileService.getToken()}
                }).success((data) => {
                    $scope.result = JSON.stringify(data);
                }).error((data,status,h,c) => {
                    $scope.result = status;
                });
            }
        }
    }
}
