var MediaManager;
(function (MediaManager) {
    'use strict';
    var LoginCtrl = (function () {
        function LoginCtrl($scope, azureMobileService) {
            this.$scope = $scope;
            this.azureMobileService = azureMobileService;
            var self = this;
            self.updateLogin($scope, azureMobileService);
            $scope.login = function () {
                azureMobileService.login().then(function (result) {
                    $scope.$apply(function () {
                        self.updateLogin($scope, azureMobileService);
                    });
                }, function (error) {
                    alert(error);
                });
            };
            $scope.logout = function () {
                azureMobileService.logout();
                self.updateLogin($scope, azureMobileService);
            };
        }
        LoginCtrl.$inject = [
            '$scope', 
            'azureMobileService'
        ];
        LoginCtrl.prototype.updateLogin = function ($scope, azureMobileService) {
            var loggedIn = azureMobileService.getIsLoggedIn();
            $scope.statusMessage = loggedIn ? "You are logged in as " + azureMobileService.getUserName() : "Please log in.";
            $scope.loggedIn = loggedIn;
        };
        return LoginCtrl;
    })();
    MediaManager.LoginCtrl = LoginCtrl;    
    MediaManager.App.controller(MediaManager.LoginCtrl);
})(MediaManager || (MediaManager = {}));
