var MediaManager;
(function (MediaManager) {
    'use strict';
    var LoginCtrl = (function () {
        function LoginCtrl($scope, authService) {
            this.$scope = $scope;
            this.authService = authService;
            LoginCtrl.updateLogin($scope, authService);
            $scope.login = function () {
                $scope.statusMessage = "Login in progress...";
                authService.login().then(function (result) {
                    return $scope.$apply(function () {
                        return LoginCtrl.updateLogin($scope, authService);
                    });
                }, function (error) {
                    return $scope.$apply(function () {
                        return $scope.statusMessage = error;
                    });
                });
            };
            $scope.logout = function () {
                authService.logout();
                LoginCtrl.updateLogin($scope, authService);
            };
        }
        LoginCtrl.$inject = [
            '$scope', 
            'authService'
        ];
        LoginCtrl.updateLogin = function updateLogin($scope, authService) {
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
        }
        return LoginCtrl;
    })();
    MediaManager.LoginCtrl = LoginCtrl;    
    MediaManager.App.controller(MediaManager.LoginCtrl);
})(MediaManager || (MediaManager = {}));
