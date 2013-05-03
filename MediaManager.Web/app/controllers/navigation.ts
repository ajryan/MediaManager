﻿/// <reference path="..\_refs.ts" />
module MediaManager {
    MediaManager.App.controller(
        'NavCtrl', 
        ['$scope', '$location', function($scope, $location) {
            $scope.getClass = function (path) {
                if ($location.path().substr(0, path.length) == path) {
                    return true
                } else {
                    return false;
                }
            }
        }]);
}