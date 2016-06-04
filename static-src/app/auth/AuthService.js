app.factory("AuthService", ['$http',
    function ($http) {
        var AuthService = {
            authenticated: false,
            local: {
                username: null,
                email: null
            },
            facebook: {
                name: null,
                email: null
            }
        };

        AuthService.setDefault = function () {

            AuthService.authenticated = false;

            AuthService.local = {
                username: null,
                email: null
            };

            AuthService.facebook = {
                name: null,
                email: null
            };
        };

        AuthService.logIn = function (email, password, callback) {
            console.log("aq var");
            $http.post("/local/login", {email: email, password: password}).then(function (res) {
                if (res.data._id) {
                    // console.log(res.data);
                    var userData = res.data;
                    if (userData.local) AuthService.local = userData.local;
                    if (userData.facebook) AuthService.facebook = userData.facebook;
                    AuthService.authenticated = true;
                    //console.log("aqac var");
                    callback(true);
                }
            });
        };
        AuthService.register = function (params, callback) {
            var email = params.email, password = params.password, username = params.username;
            console.log("aq var");
            $http.post("/local/register", {email: email, password: password, username: username}).then(function (res) {
                if (res.data._id) {
                    // console.log(res.data);
                    var userData = res.data;
                    if (userData.local) AuthService.local = userData.local;
                    if (userData.facebook) AuthService.facebook = userData.facebook;
                    AuthService.authenticated = true;
                    //console.log("aqac var");
                    callback(true);
                }
            });
        };

        AuthService.logOut = function (callback) {
            $http.get("/local/logout").then(function (res) {
                if (res.data.status === "ok") {
                    AuthService.setDefault();
                    return callback(true);
                }
            });
        };

        AuthService.startUp = function () {
            if (typeof startUpUserData === 'undefined') startUpUserData = false;
            var userData = startUpUserData;
            console.log("eh");
            if (userData) {
                userData = JSON.parse(userData);
                // console.log(userData.facebook);
                console.log(userData);
                console.log("wtf");
                if (userData.local) this.local = userData.local;
                if (userData.facebook) this.facebook = userData.facebook;
                AuthService.authenticated = true;
            }
        };

        return AuthService;
    }
]);