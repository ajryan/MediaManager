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
                $http.get(Globals.apiUrl + '/api/settings', {
                    headers: {
                        'Authorization': 'Bearer ' + azureMobileService.getToken()
                    }
                }).success(function (data) {
                    $scope.result = JSON.stringify(data);
                }).error(function (data, status, h, c) {
                    $scope.result = status;
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
