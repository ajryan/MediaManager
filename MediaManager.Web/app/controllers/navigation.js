var MediaManager;
(function (MediaManager) {
    var NavCtrl = (function () {
        function NavCtrl($scope, $location) {
            this.$scope = $scope;
            this.$location = $location;
            $scope.getClass = function (path) {
                if($location.path().substr(0, path.length) == path) {
                    return true;
                } else {
                    return false;
                }
            };
        }
        NavCtrl.$inject = [
            '$scope', 
            '$location'
        ];
        return NavCtrl;
    })();
    MediaManager.NavCtrl = NavCtrl;    
    MediaManager.App.controller(MediaManager.NavCtrl);
})(MediaManager || (MediaManager = {}));
