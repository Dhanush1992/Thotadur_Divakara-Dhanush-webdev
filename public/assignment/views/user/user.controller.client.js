(function () {
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController)
        .controller("RegisterController", RegisterController)
        .controller("ProfileController", ProfileController);

    function LoginController($location, UserService) {
        var vm = this;
        vm.login = login;

        function login(username,password) {
            if((!username)||(!password)){
                vm.condition = true;
                if((!username) && (!password))vm.error = "username and password"
                else if(!username) vm.error = "username"
                else if(!password) vm.error = "password"

            }
            else{
                UserService
                    .login(username,password)
                    .success(function (user) {
                        if(user == '0')
                        {
                            vm.condition = true;
                            vm.error = "username/password does not exist/match"
                        }
                        else
                        {
                            //$location.url("/user/" + user._id); // username password not found,match
                            $location.url("/user/");
                        }

                    })
                    .error(function (error) {
                        //alert("Username/Password not found");
                        vm.condition = true;
                        vm.error = "username/password does not exist/match"
                    });
            }

        }
    }

    function RegisterController($location,$rootScope,UserService) {
        var vm = this;
        vm.register  = register;
        function register(user){
            if(!user){
                vm.condition = true;
                vm.error = "user";
            }
            else if(!user.username){
                vm.condition = true;
                vm.error = "username";
            }
            else if(!user.password){
                vm.condition = true;
                vm.error = "password";
            }
            else if(!user.verifyPassword){
                vm.condition = true;
                vm.error = "confirm password";

            }
            else if(user.verifyPassword !== user.password){
                vm.condition = true;
                vm.error = "Passwords do not match";
            }else {
                UserService
                    .register(user)
                    .success(function(user) {
                        if(user) {
                            $rootScope.currentUser = user;
                            $location.url("/user/");
                        }
                    })
                    .error(function(err) {
                        vm.condition = true;
                        vm.error = "Cannot create user, please use a different username/password"
                    });
            }

        }
    }


    function ProfileController($routeParams, UserService) {
        var vm = this;
        var userId = $routeParams.uid;
        vm.updateUser = updateUser;
        vm.logout = logout;

        function init() {
            UserService
                .findCurrentUser()
                .success(function(user){
                    console.log(user);
                    if(user) {
                        vm.user = user;
                    }
                })
                .error(function(){

                });
        }
        init();

        function updateUser() {
            UserService.updateUser(vm.user);
        }

        function logout(){
            UserService
                .logout()
                .success(function(){
                    $location.url("/login");
                })
        }
    }
})();
