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
                    AzureMobileService._client.currentUser = storedCredential;
                }
            }
        }
        AzureMobileService.$inject = [
            '$log'
        ];
        AzureMobileService._client = new WindowsAzure.MobileServiceClient('https://mediamanager.azure-mobile.net/', 'zXiNSblOtaOabAuuuuBrFgsqAugjWP23');
        AzureMobileService.prototype.login = function () {
            return AzureMobileService._client.login('twitter').then(function (result) {
                var resultJSON = JSON.stringify(result);
                window.localStorage.setItem(MediaManager.STORAGE_KEY, resultJSON);
            });
        };
        AzureMobileService.prototype.logout = function () {
            window.localStorage.removeItem(MediaManager.STORAGE_KEY);
            AzureMobileService._client.logout();
        };
        AzureMobileService.prototype.getIsLoggedIn = function () {
            return (AzureMobileService._client.currentUser !== null);
        };
        AzureMobileService.prototype.getUserName = function () {
            return AzureMobileService._client.currentUser.userId;
        };
        return AzureMobileService;
    })();
    MediaManager.AzureMobileService = AzureMobileService;    
    MediaManager.App.service('azureMobileService', AzureMobileService);
})(MediaManager || (MediaManager = {}));
