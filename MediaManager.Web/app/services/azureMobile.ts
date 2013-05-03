/// <reference path="..\_refs.ts" />

module MediaManager {
    'use strict';

    App.service('azureMobileService', () => {
        this._client = new WindowsAzure.MobileServiceClient(
            'https://mediamanager.azure-mobile.net/', 'zXiNSblOtaOabAuuuuBrFgsqAugjWP23');

        this.login = () => {
            return this._client.login("twitter");
        }

        this.logout = () => {
            this._client.logout();
        }

        this.getIsLoggedIn = () => {
            return (this._client.currentUser !== null);
        }
    });
}