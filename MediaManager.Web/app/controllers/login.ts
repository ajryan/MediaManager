/// <reference path="../_refs.ts" />

module MediaManager {
    'use strict';

    export interface ILoginScope extends ng.IScope {
        login(): void;
        logout() : void;
        statusMessage: string;
        loggedIn: bool;
    }

    export class LoginCtrl {
        static $inject = ['$scope', 'authService'];

        constructor(private $scope: ILoginScope, private authService: AuthService) { // TODO: interface ILoginScope
            var self = this;

            self.updateLogin($scope, authService);

            $scope.login = function() {
                $scope.statusMessage = "Login in progress...";
                authService.login().then(
                    result => $scope.$apply(() => self.updateLogin($scope, authService)),
                    error => alert(error)
                );
            };

            $scope.logout = function() {
                authService.logout();
                self.updateLogin($scope, authService);
            };
        }

        private updateLogin($scope: ILoginScope, authService: AuthService) {
            $scope.statusMessage = "Checking login...";
            var loggedIn = authService.getIsLoggedIn();
            $scope.loggedIn = loggedIn;
            if (loggedIn) {
                authService.getUser().then(
                    (user: MediaManager.User) => $scope.statusMessage = "You are logged in as " + user.name,
                    (error: string) => $scope.statusMessage = error
                )
            } else {
                $scope.statusMessage = "Please log in.";
            }
        }
    }
    MediaManager.App.controller(MediaManager.LoginCtrl);
}
