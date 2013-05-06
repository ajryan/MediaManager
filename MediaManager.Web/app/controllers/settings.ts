/// <reference path="../_refs.ts" />

module MediaManager {
    'use strict';

    export class SettingsCtrl {
        static $inject = ['$scope'];

        constructor(private $scope: any) { // TODO: interface ISettingsScope
            $scope.message = "Settings";
        }
    }
}
