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
                vm.error = "No username or password"
            }
            else{
                UserService
                    .login(username,password)
                    .success(function (user) {
                        if(user == '0')
                        {
                            //alert("user not found");
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
                        alert(vm.error);
                    });
            }

        }
    }

    function RegisterController($location,$rootScope,UserService) {
        var vm = this;
        vm.register  = register;
        function register(user){
            if(!user){
                vm.error = "No user";
            }
            else if(!user.username){
                alert("Please enter the username you want to create");
                vm.error = "no username";
            }
            else if(!user.password){
                alert("Please enter a password field");
                vm.error = "no password";
            }
            else if(!user.verifyPassword){
                alert("Passwords do not match");
                vm.error = "passwords do not match";

            }
            else if(user.verifyPassword !== user.password){

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
