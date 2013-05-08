var MediaManager;
(function (MediaManager) {
    'use strict';
    var SettingsCtrl = (function () {
        function SettingsCtrl($scope, $http, azureMobileService) {
            this.$scope = $scope;
            this.$http = $http;
            this.azureMobileService = azureMobileService;
            $scope.message = "Settings";
            $scope.result = "";
            $scope.getSomething = function () {
                $http.get('http://localhost:81/api/settings', {
                    headers: {
                        'Authorization': 'Bearer ' + azureMobileService.getToken()
                    }
                }).success(function (d, s, h, c) {
                    $scope.result = JSON.stringify(d);
                }).error(function (d, s, h, c) {
                    $scope.result = JSON.stringify(d);
                });
            };
        }
        SettingsCtrl.$inject = [
            '$scope', 
            '$http', 
            'azureMobileService'
        ];
        return SettingsCtrl;
    })();
    MediaManager.SettingsCtrl = SettingsCtrl;    
})(MediaManager || (MediaManager = {}));
