(function() {
    angular
        .module("WebAppMaker")
        .factory("UserService", UserService);
    function UserService() {
        var users = [ {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
            {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
            {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
            {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" } ];
        var api = {
            "createUser"   : createUser,
            "findUserById" : findUserById,
            "findUserByUsername" : findUserByUsername,
            "findUserByCredentials" : findUserByCredentials,
            "updateUser" : updateUser,
            "deleteUser" : deleteUser
        };
        function findUserByCredentials(username, password) {
            for (var i =0;i<users.length;i++){
                if(users[i].username===username && users[i].password===password){
                    return users[i];
                }
            }
            return false;
        }

        function createUser(user) {
            users.push(user);
        }
        // function notempty(val)
        // {
        //     return !(val == null|| val == undefined|| val == "");
        // }
        function findUserById(id) {
            for (var i =0;i<users.length;i++){
                if(users[i]._id===id){
                    return users[i];
                }
            }
            return false;

        }

        function findUserByUsername(username){
            for (var i =0;i<users.length;i++){
                if(users[i].username===username){
                    return users[i];
                }
            }
            return false;
        }

        function deleteUser(userId) {
            users.forEach(function (result,index){
               if(result["_id"]===userId){
                   users.splice(index,i);
               }
            });

        }

        function updateUser(userId, user) {
            for (var usr in users){
                User = users[usr];
                if(User._id === userId){
                    User.firstName = user.firstName;
                    User.lastName = user.lastName;
                    User.username = user.username;

                }

            }

        }
        return api;
    }
})();




