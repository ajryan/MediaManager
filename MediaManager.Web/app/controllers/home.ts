/// <reference path="../_refs.ts" />

module MediaManager {
    'use strict';

    export class HomeCtrl {
        static $inject = ['$scope'];

        constructor(private $scope: any) { // TODO: interface IHomeScope
            $scope.message = "Welcome to MediaManager";
        }
    }
}
