/// <reference path="../_refs.ts" />

module MediaManager {
    'use strict';

    export class LoginCtrl {
        static $inject = ['$scope', 'azureMobileService'];

        constructor(private $scope: any, private azureMobileService: AzureMobileService) { // TODO: interface ILoginScope
            var self = this;

            self.updateLogin($scope, azureMobileService);

            $scope.login = function() {
                azureMobileService.login().then(
                    result => {
                        $scope.$apply(() => {
                            self.updateLogin($scope, azureMobileService); });
                    },
                    error => { alert(error); });
            };

            $scope.logout = function() {
                azureMobileService.logout();
                self.updateLogin($scope, azureMobileService);
            };
        }

        private updateLogin($scope, azureMobileService) {
            var loggedIn = azureMobileService.getIsLoggedIn();
            $scope.statusMessage = loggedIn
                ? "You are logged in as " + azureMobileService.getUserName()
                : "Please log in.";
            $scope.loggedIn = loggedIn;
        }
    }
    MediaManager.App.controller(MediaManager.LoginCtrl);
}
