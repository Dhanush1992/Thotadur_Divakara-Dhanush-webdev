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

        function findUserById(id) {

            console.log(id);
            var url = "/api/user/"+id;
            return $http.get(url);


        }

        function findUserByUsername(username){
            var url = "/api/user?username="+username;
            return $http.get(url);
        }

        function deleteUser(userId) {
            users.forEach(function (result,index){
               if(result["_id"]===userId){
                   users.splice(index,i);
               }
            });

        }

        function updateUser(userId, user) {
            var url = "/api/user/"+userId;
            return $http.put(url,user);
        }
        return api;
    }
})();




