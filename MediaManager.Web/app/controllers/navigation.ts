/// <reference path="..\_refs.ts" />
module MediaManager {
    export class NavCtrl {
        static $inject = ['$scope', '$location'];
        constructor(private $scope: any, private $location: ng.ILocationService) {
            $scope.getClass = function (path) {
                if ($location.path().substr(0, path.length) == path) {
                    return true
                } else {
                    return false;
                }
            }
        }
    }
    MediaManager.App.controller(MediaManager.NavCtrl);
}