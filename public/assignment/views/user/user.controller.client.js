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
            console.log(UserService);
            user = UserService.findUserByCredentials(vm.username,vm.password);
            if(user) {
                $location.url("/user/" + user._id);
            } else {
                alert("Username/Password not found")
            }
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

                    var id = Math.floor(Math.random() * 999);
                    var x = UserService.findUserById(id+"");
                    while(true) {
                        if(x == false) {
                           break;
                        }
                        else{
                            id = Math.floor(Math.random() * 999);
                            x = UserService.findUserById(id+"");
                        }
                    }

                    id = id.toString();
                    var newUser = {};
                    newUser._id = id;
                    newUser.username = vm.username;
                    newUser.firstName = "";
                    newUser.lastName = "";
                    vm.userId = newUser._id;
                    vm.user = newUser;
                    UserService.createUser(newUser);
                    $location.url("/user/" + newUser._id);

                }
            }

        }
    }

    function ProfileController($routeParams, UserService) {
        var vm = this;
        vm.okayPressed = okayPressed;
        vm.userId= parseInt($routeParams.uid);
        function init() {
            vm.user = UserService.findUserById(vm.userId);
        }
        init();
        function okayPressed() {
            UserService.update()
        }



    }
})();