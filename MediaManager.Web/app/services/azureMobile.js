var MediaManager;
(function (MediaManager) {
    'use strict';
    MediaManager.STORAGE_KEY = 'MediaManagerIdentity';
    var AzureMobileService = (function () {
        function AzureMobileService($log) {
            this._log = $log;
            var storedCredentialJSON = window.localStorage.getItem(MediaManager.STORAGE_KEY);
            if(storedCredentialJSON !== null) {
                var storedCredential = JSON.parse(storedCredentialJSON);
                if(storedCredential.hasOwnProperty('userId') && storedCredential.hasOwnProperty('mobileServiceAuthenticationToken')) {
                    this._storedCredential = storedCredential;
                    AzureMobileService._client.currentUser = storedCredential;
                }
            }
        }
        AzureMobileService.$inject = [
            '$log'
        ];
        AzureMobileService._client = new WindowsAzure.MobileServiceClient('https://mediamanager.azure-mobile.net/', 'zXiNSblOtaOabAuuuuBrFgsqAugjWP23');
        AzureMobileService.prototype.login = function () {
            var self = this;
            return AzureMobileService._client.login('twitter').then(function (result) {
                var resultJSON = JSON.stringify(result);
                self._storedCredential = resultJSON;
                window.localStorage.setItem(MediaManager.STORAGE_KEY, resultJSON);
            });
        };
        AzureMobileService.prototype.logout = function () {
            this._storedCredential = null;
            window.localStorage.removeItem(MediaManager.STORAGE_KEY);
            AzureMobileService._client.logout();
        };
        AzureMobileService.prototype.getIsLoggedIn = function () {
            return (AzureMobileService._client.currentUser !== null);
        };
        AzureMobileService.prototype.getUserName = function () {
            return AzureMobileService._client.currentUser.userId;
        };
        AzureMobileService.prototype.getToken = function () {
            return (this._storedCredential == null) ? null : this._storedCredential.mobileServiceAuthenticationToken;
        };
        return AzureMobileService;
    })();
    MediaManager.AzureMobileService = AzureMobileService;    
    MediaManager.App.service('azureMobileService', AzureMobileService);
})(MediaManager || (MediaManager = {}));
