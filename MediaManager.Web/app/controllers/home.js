var MediaManager;
(function (MediaManager) {
    'use strict';
    var HomeCtrl = (function () {
        function HomeCtrl($scope) {
            this.$scope = $scope;
            $scope.message = "Welcome to MediaManager";
        }
        HomeCtrl.$inject = [
            '$scope'
        ];
        return HomeCtrl;
    })();
    MediaManager.HomeCtrl = HomeCtrl;    
})(MediaManager || (MediaManager = {}));
