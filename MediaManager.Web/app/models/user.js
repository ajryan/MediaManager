var MediaManager;
(function (MediaManager) {
    var User = (function () {
        function User(userId, name) {
            this.userId = userId;
            this.name = name;
        }
        return User;
    })();
    MediaManager.User = User;    
})(MediaManager || (MediaManager = {}));
