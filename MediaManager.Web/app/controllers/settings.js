var MediaManager;
(function (MediaManager) {
    'use strict';
    MediaManager.SettingsCtrlDef = [
        '$scope', 
        function ($scope) {
            return new SettingsCtrl($scope);
        }    ];
    var SettingsCtrl = (function () {
        function SettingsCtrl($scope) {
            this.$scope = $scope;
        }
        SettingsCtrl.prototype.injection = function () {
            return [
                '$scope', 
                SettingsCtrl
            ];
        };
        return SettingsCtrl;
    })();
    MediaManager.SettingsCtrl = SettingsCtrl;    
})(MediaManager || (MediaManager = {}));
