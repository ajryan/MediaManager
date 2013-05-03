/// <reference path="../_refs.ts" />

module MediaManager {
    'use strict';

    export var SettingsCtrlDef: any[] = ['$scope', ($scope) => { return new SettingsCtrl($scope); }];

    export class SettingsCtrl {
        public injection(): any[] {
            return [
                '$scope',
                SettingsCtrl
            ];
        }

        constructor(private $scope: any) { // TODO: interface ISettingsScope
        }
    }
}
