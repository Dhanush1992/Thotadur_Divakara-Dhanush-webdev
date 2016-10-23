(function () {
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController)
        .controller("RegisterController", RegisterController)
        .controller("ProfileController", ProfileController)

    function LoginController($location, UserService) {
        var vm = this;
        vm.login = login;
        function login() {
            console.log(UserService);
            user = UserService.findUserByCredentials(vm.username,vm.password);
            if(user) {
                $location.url("/user/" + user._id);
            } else {
                alert("Username/Password not found")
            }
        }
    }

    function RegisterController() {
        var vm = this;
        vm.register  = register;
        function register(){
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

                    var id = Math.floor(Math.random() * 999);
                    x = UserService.findUserById(id);
                    while(x == false) {
                        id = Math.floor(Math.random() * 999);
                        x = UserService.findUserById(id);
                    }

                    id.toString();
                    var newUser = {};
                    newUser._id = id;
                    newUser.username = model.username;
                    newUser.firstName = "";
                    newUser.lastName = "";
                    UserService.createUser(newUser);

                }
            }

        }
    }

    function ProfileController($routeParams, UserService) {
        var vm = this;
        vm.userId= parseInt($routeParams.uid);
        function init() {
            vm.user = UserService.findUserById(vm.userId);
        }

        init();
    }
})();