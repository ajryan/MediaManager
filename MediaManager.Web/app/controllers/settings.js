var MediaManager;
(function (MediaManager) {
    'use strict';
    var SettingsCtrl = (function () {
        function SettingsCtrl($scope) {
            this.$scope = $scope;
            $scope.message = "Settings";
        }
        SettingsCtrl.$inject = [
            '$scope'
        ];
        return SettingsCtrl;
    })();
    MediaManager.SettingsCtrl = SettingsCtrl;    
})(MediaManager || (MediaManager = {}));
