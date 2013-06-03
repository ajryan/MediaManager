var MediaManager;
(function (MediaManager) {
    'use strict';
    var SettingsCtrl = (function () {
        function SettingsCtrl($scope, $http, authService) {
            this.$scope = $scope;
            this.$http = $http;
            this.authService = authService;
            $scope.message = "Settings";
            $scope.result = "";
            $scope.getSomething = function () {
                $http.get(Globals.apiUrl + '/api/settings', {
                    headers: {
                        'Authorization': 'Bearer ' + authService.getToken()
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
            'authService'
        ];
        return SettingsCtrl;
    })();
    MediaManager.SettingsCtrl = SettingsCtrl;    
})(MediaManager || (MediaManager = {}));
