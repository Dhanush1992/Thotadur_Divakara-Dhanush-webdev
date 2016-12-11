(function () {
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController)
        .controller("RegisterController", RegisterController)
        .controller("ProfileController", ProfileController);

    function LoginController($location, UserService) {
        var vm = this;
        vm.login = login;

        function login() {
            UserService
                .findUserByCredentials(vm.username,vm.password)
                .success(function (user) {
                    if(user == '0')
                    {
                        alert("user not found");
                    }
                    else
                    {
                        $location.url("/user/" + user._id); // username password not found,match
                    }

                })
                .error(function () {
                    alert("Username/Password not found");
                });
        }
    }

    function RegisterController($location,UserService) {
        var vm = this;
        vm.register  = register;
        function register(username, password){
            if(!vm.username){
                alert("Please enter the username you want to create");
            }
            if(!vm.password){
                alert("Please enter a password field");
            }
            if(!vm.verifyPassword){
                alert("Passwords do not match");

            }
            else{
                if(vm.verifyPassword == vm.password){
                    console.log("Passwords match");
                    var newUser = {};
                    //newUser._id = id;
                    newUser.username = vm.username;
                    newUser.firstName = "";
                    newUser.lastName = "";
                    newUser.password = vm.password;
                    //vm.userId = newUser._id;
                    //vm.user = newUser;
                    UserService
                        .createUser(newUser)
                        .success(function (userObj) {

                            vm.user = userObj;
                            vm.userId = userObj._id;
                            $location.url("/user/" + userObj._id);
                        })
                        .error(function () {
                            //handle this
                        });

                }
            }

        }
    }


    function ProfileController($routeParams, UserService) {
        var vm = this;
        var userId = $routeParams.uid;
        vm.updateUser = updateUser;
        function init() {
            UserService
                .findUserById(userId)
                .success(function(user){
                    console.log(user);
                    if(user != '0') {
                        vm.user = user;
                        console.log(user);
                    }
                })
                .error(function(){

                });
        }
        init();

        function updateUser() {
            UserService.updateUser(vm.user);
        }
    }
})();
