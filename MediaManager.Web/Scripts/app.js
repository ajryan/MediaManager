var MediaManager;
(function (MediaManager) {
    var App = (function () {
        function App(serviceUrl, serviceKey) {
            this.serviceUrl = serviceUrl;
            this.serviceKey = serviceKey;
            this.client = new WindowsAzure.MobileServiceClient(serviceUrl, serviceKey);
        }
        App.prototype.currentUser = function () {
            return this.client.currentUser;
        };
        App.prototype.isLoggedIn = function () {
            return (this.client.currentUser !== null);
        };
        App.prototype.logIn = function () {
            return this.client.login("twitter");
        };
        App.prototype.logOut = function () {
            this.client.logout();
        };
        App.prototype.readPolls = function () {
            return this.client.getTable('MVPoll').read();
        };
        return App;
    })();
    MediaManager.App = App;    
})(MediaManager || (MediaManager = {}));
