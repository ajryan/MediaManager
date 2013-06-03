/// <reference path="..\_refs.ts" />

module MediaManager {
    'use strict';

    export var STORAGE_KEY: string = 'MediaManagerIdentity';

    export class AuthService {
        static $inject = ['$log', '$http', '$q'];

        private static _client: Microsoft.WindowsAzure.MobileServiceClient = new WindowsAzure.MobileServiceClient(
            'https://mediamanager.azure-mobile.net/', 'mEDaBeZpQeNRwXMrsQqnceotDgseEE15');

        private _log: ng.ILogService;
        private _http: ng.IHttpService;
        private _q: ng.IQService;

        private _storedCredential: any;
        private _user: User;

        constructor($log, $http, $q) {
            this._log = $log;
            this._http = $http;
            this._q = $q;

            var storedCredentialJSON = window.localStorage.getItem(STORAGE_KEY);
            if (storedCredentialJSON !== null) {
                var storedCredential = JSON.parse(storedCredentialJSON);
                if (storedCredential.hasOwnProperty('userId') && storedCredential.hasOwnProperty('mobileServiceAuthenticationToken')) {
                    this._storedCredential = storedCredential;
                    AuthService._client.currentUser = storedCredential;
                }
            }
        }

        login(): Microsoft.WindowsAzure.asyncPromise {
            var self = this;
            return AuthService._client
                .login('twitter')
                .then((result: any) => {
                    var resultJSON = JSON.stringify(result);
                    self._storedCredential = result;
                    window.localStorage.setItem(STORAGE_KEY, resultJSON);
                });
        }

        logout(): void {
            this._storedCredential = null;
            this._user = null;
            window.localStorage.removeItem(STORAGE_KEY);
            AuthService._client.logout();
        }

        getIsLoggedIn(): bool {
            return (AuthService._client.currentUser !== null);
        }

        getUser(): ng.IPromise {
            var deferred = this._q.defer();

            if (this._user != null) {
                deferred.resolve(this._user);
            }
            else{
                
                var userId = this._storedCredential.userId;
                var twitterId = userId.substring(userId.indexOf(':') + 1);

                var self = this;
                self._http.jsonp('https://api.twitter.com/1/users/show.json?user_id=' + twitterId + '&callback=JSON_CALLBACK')
                    .then((result: any) => {
                        self._user = new User(userId, result.data.name);
                        deferred.resolve(self._user);
                    }, (error: any) => {
                        self._log.error(error);
                        deferred.reject('Error retrieving user');
                    });
            }
            
            return deferred.promise;
        }

        getToken(): string {
            return (this._storedCredential == null)
                ? null
                : this._storedCredential.mobileServiceAuthenticationToken;
        }
    }
    App.service('authService', AuthService);
}