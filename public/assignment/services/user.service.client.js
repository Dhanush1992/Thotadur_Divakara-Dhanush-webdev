(function() {
    angular
        .module("WebAppMaker")
        .factory("UserService", UserService);
    function UserService($http) {


        var api = {
            createUser   : createUser,
            findUserById : findUserById,
            findCurrentUser:findCurrentUser,
            findUserByUsername : findUserByUsername,
            findUserByCredentials : findUserByCredentials,
            updateUser : updateUser,
            login : login,
            register : register,
            deleteUser : deleteUser
        };
        function findUserByCredentials(username, password) {

            var url = "/api/user?username="+username+"&password="+password;
            return $http.get(url);

        }

        function findCurrentUser() {
            return $http.get("/api/user");
        }

         function createUser(user) {
             var url = "/api/user";
             return $http.post(url,user);
         }
        function loggedin() {
            return $http.post("/api/loggedin");
        }

        function findUserById(id) {

            console.log(id);
            var url = "/api/user/"+id;
            return $http.get(url);


        }
        function register(user) {
            var user = {
                username: user.username,
                password: user.password
            };
            return $http.post("/api/register",user);
        }

        function findUserByUsername(username){
            var url = "/api/user?username="+username;
            return $http.get(url);
        }

        function login(username, password) {
            var user = {
                username: username,
                password: password
            };
            return $http.post("/api/login",user);
        }

        function deleteUser(userId) {
            users.forEach(function (result,index){
               if(result["_id"]===userId){
                   users.splice(index,i);
               }
            });

        }

        function updateUser(user) {
            var url = "/api/user/"+user._id;
            return $http.put(url,user);
        }
        return api;
    }
})();




