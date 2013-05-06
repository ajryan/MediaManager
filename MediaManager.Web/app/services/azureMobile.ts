/// <reference path="..\_refs.ts" />

module MediaManager {
    'use strict';

    export var STORAGE_KEY: string = 'MediaManagerIdentity';

    export class AzureMobileService {
        static $inject = ['$log'];

        private static _client: Microsoft.WindowsAzure.MobileServiceClient = new WindowsAzure.MobileServiceClient(
            'https://mediamanager.azure-mobile.net/', 'zXiNSblOtaOabAuuuuBrFgsqAugjWP23');

        private _log: ng.ILogService;

        constructor($log) {
            this._log = $log;

            var storedCredentialJSON = window.localStorage.getItem(STORAGE_KEY);
            if (storedCredentialJSON !== null) {
                var storedCredential = JSON.parse(storedCredentialJSON);
                if (storedCredential.hasOwnProperty('userId') && storedCredential.hasOwnProperty('mobileServiceAuthenticationToken')) {
                    AzureMobileService._client.currentUser = storedCredential;
                }
            }
        }

        login(): Microsoft.WindowsAzure.asyncPromise {
            return AzureMobileService._client
                .login('twitter')
                .then((result: any) => {
                    var resultJSON = JSON.stringify(result);
                    window.localStorage.setItem(STORAGE_KEY, resultJSON);
                });
        }

        logout(): void {
            window.localStorage.removeItem(STORAGE_KEY);
            AzureMobileService._client.logout();
        }

        getIsLoggedIn(): bool {
            return (AzureMobileService._client.currentUser !== null);
        }

        getUserName(): string {
            return AzureMobileService._client.currentUser.userId;
        }
    }
    App.service('azureMobileService', AzureMobileService);
}