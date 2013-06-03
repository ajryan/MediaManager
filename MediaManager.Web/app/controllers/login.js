var MediaManager;
(function (MediaManager) {
    'use strict';
    var LoginCtrl = (function () {
        function LoginCtrl($scope, authService) {
            this.$scope = $scope;
            this.authService = authService;
            var self = this;
            self.updateLogin($scope, authService);
            $scope.login = function () {
                $scope.statusMessage = "Login in progress...";
                authService.login().then(function (result) {
                    return $scope.$apply(function () {
                        return self.updateLogin($scope, authService);
                    });
                }, function (error) {
                    return alert(error);
                });
            };
            $scope.logout = function () {
                authService.logout();
                self.updateLogin($scope, authService);
            };
        }
        LoginCtrl.$inject = [
            '$scope', 
            'authService'
        ];
        LoginCtrl.prototype.updateLogin = function ($scope, authService) {
            $scope.statusMessage = "Checking login...";
            var loggedIn = authService.getIsLoggedIn();
            $scope.loggedIn = loggedIn;
            if(loggedIn) {
                authService.getUser().then(function (user) {
                    return $scope.statusMessage = "You are logged in as " + user.name;
                }, function (error) {
                    return $scope.statusMessage = error;
                });
            } else {
                $scope.statusMessage = "Please log in.";
            }
        };
        return LoginCtrl;
    })();
    MediaManager.LoginCtrl = LoginCtrl;    
    MediaManager.App.controller(MediaManager.LoginCtrl);
})(MediaManager || (MediaManager = {}));
