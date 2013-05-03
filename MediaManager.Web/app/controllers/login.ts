/// <reference path="../_refs.ts" />

module MediaManager {
    'use strict';

    export var LoginCtrlDef: any[] = [
        '$scope', 'azureMobileService',
        ($scope, azureMobileService) => { return new LoginCtrl($scope, azureMobileService); }];

    export class LoginCtrl {
        constructor(private $scope: any, private azureMobileService: any) { // TODO: interface ILoginScope, interface IAzureMobileService
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
            $scope.statusMessage = loggedIn ? "You are logged in." : "Please log in.";
            $scope.loggedIn = loggedIn;
        }
    }
}
