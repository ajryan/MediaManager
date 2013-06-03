var MediaManager;
(function (MediaManager) {
    'use strict';
    MediaManager.STORAGE_KEY = 'MediaManagerIdentity';
    var AuthService = (function () {
        function AuthService($log, $http, $q) {
            this._log = $log;
            this._http = $http;
            this._q = $q;
            var storedCredentialJSON = window.localStorage.getItem(MediaManager.STORAGE_KEY);
            if(storedCredentialJSON !== null) {
                var storedCredential = JSON.parse(storedCredentialJSON);
                if(storedCredential.hasOwnProperty('userId') && storedCredential.hasOwnProperty('mobileServiceAuthenticationToken')) {
                    this._storedCredential = storedCredential;
                    AuthService._client.currentUser = storedCredential;
                }
            }
        }
        AuthService.$inject = [
            '$log', 
            '$http', 
            '$q'
        ];
        AuthService._client = new WindowsAzure.MobileServiceClient('https://mediamanager.azure-mobile.net/', 'mEDaBeZpQeNRwXMrsQqnceotDgseEE15');
        AuthService.prototype.login = function () {
            var self = this;
            return AuthService._client.login('twitter').then(function (result) {
                var resultJSON = JSON.stringify(result);
                self._storedCredential = result;
                window.localStorage.setItem(MediaManager.STORAGE_KEY, resultJSON);
            });
        };
        AuthService.prototype.logout = function () {
            this._storedCredential = null;
            this._user = null;
            window.localStorage.removeItem(MediaManager.STORAGE_KEY);
            AuthService._client.logout();
        };
        AuthService.prototype.getIsLoggedIn = function () {
            return (AuthService._client.currentUser !== null);
        };
        AuthService.prototype.getUser = function () {
            var deferred = this._q.defer();
            if(this._user != null) {
                deferred.resolve(this._user);
            } else {
                var userId = this._storedCredential.userId;
                var twitterId = userId.substring(userId.indexOf(':') + 1);
                var self = this;
                self._http.jsonp('https://api.twitter.com/1/users/show.json?user_id=' + twitterId + '&callback=JSON_CALLBACK').then(function (result) {
                    self._user = new MediaManager.User(userId, result.data.name);
                    deferred.resolve(self._user);
                }, function (error) {
                    self._log.error(error);
                    deferred.reject('Error retrieving user');
                });
            }
            return deferred.promise;
        };
        AuthService.prototype.getToken = function () {
            return (this._storedCredential == null) ? null : this._storedCredential.mobileServiceAuthenticationToken;
        };
        return AuthService;
    })();
    MediaManager.AuthService = AuthService;    
    MediaManager.App.service('authService', AuthService);
})(MediaManager || (MediaManager = {}));
