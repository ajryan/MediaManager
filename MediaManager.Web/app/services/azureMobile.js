var MediaManager;
(function (MediaManager) {
    var _this = this;
    'use strict';
    MediaManager.App.service('azureMobileService', function () {
        var _this = this;
        _this._client = new WindowsAzure.MobileServiceClient('https://mediamanager.azure-mobile.net/', 'zXiNSblOtaOabAuuuuBrFgsqAugjWP23');
        _this.login = function () {
            return _this._client.login("twitter");
        };
        _this.logout = function () {
            _this._client.logout();
        };
        _this.getIsLoggedIn = function () {
            return (_this._client.currentUser !== null);
        };
    });
})(MediaManager || (MediaManager = {}));
