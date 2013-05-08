/// <reference path="../_refs.ts" />

module MediaManager {
    'use strict';

    export class SettingsCtrl {
        static $inject = ['$scope', '$http', 'azureMobileService'];

        constructor(private $scope: any, private $http: ng.IHttpService, private azureMobileService: AzureMobileService) { // TODO: interface ISettingsScope
            $scope.message = "Settings";
            $scope.result = "";

            $scope.getSomething = () => {
                $http.get('http://localhost:81/api/settings', {
                    headers: { 'Authorization': 'Bearer ' + azureMobileService.getToken()}
                }).success((d,s,h,c) => {
                    $scope.result = JSON.stringify(d);
                }).error((d,s,h,c) => {
                    $scope.result = JSON.stringify(d);
                });
            }
        }
    }
}
