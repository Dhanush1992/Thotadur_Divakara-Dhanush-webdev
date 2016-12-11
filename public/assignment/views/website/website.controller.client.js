(function() {
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", WebsiteListController)
        .controller("NewWebsiteController", NewWebsiteController)
        .controller("EditWebsiteController", EditWebsiteController);
    function WebsiteListController($routeParams, WebsiteService) {
        var vm = this;

        function init() {
            vm.userId = $routeParams.uid;
            WebsiteService
                .findWebsitesForUser(vm.userId)
                .success(function(user) {
                    vm.websites = user.websites;
                    console.log("hello");
                    console.log(vm.websites);
                })
                .error(function(err) {

                });
        }
        init();
    }
    function NewWebsiteController($location,$routeParams,WebsiteService) {
        var vm = this;
        vm.userId = $routeParams["uid"];
        vm.createNewWebsite = createNewWebsite;
        function init(){

            WebsiteService
                .findWebsitesForUser(vm.userId)
                .success(function (websites) {
                    console.log(websites);
                    vm.websites = websites;
                })
                .error(function () {

                });
        }
        init();

        function createNewWebsite(){
            //id = id.toString();
            var newWebsite = {};
            //newWebsite._id = id;
            // newWebsite.name = name;
            //newWebsite.developerId = vm.userId;
            // newWebsite.description = description;
            WebsiteService
                .createWebsite(vm.userId,vm.website)
                //.success(function (website){
                .success(function (){
                    $location.url("/user/"+vm.userId+"/website");
                })
                .error(function () {
                    //handle this
                });

        }

    }
    function EditWebsiteController($routeParams,WebsiteService, $location) {
        var vm = this;
        vm.websiteId = $routeParams["wid"];
        vm.userId = $routeParams["uid"];

        function init() {

            WebsiteService
                .findWebsiteById(vm.websiteId)
                .success(function (website) {
                    vm.website = website;
                })
                .error(function () {

                })

            WebsiteService
                .findWebsitesForUser(vm.userId)
                .success(function (websites) {
                    vm.websites = websites;

                })
                .error(function () {

                })
        }
        init();
        vm.updateWebsite = updateWebsite;
        vm.deleteWebsite = deleteWebsite;


        function updateWebsite() {
            WebsiteService
                .updateWebsite(vm.websiteId, vm.website)
                .success(function(website) {
                    if(website)
                        $location.url("/user/"+vm.userId+"/website");

                })
                .error(function(err) {

                });
        }

        function deleteWebsite() {

            WebsiteService
                .deleteWebsite(vm.websiteId)
                .success(function () {
                    $location.url("/user/"+vm.userId+"/website");        
                })
                .error(function (error) {

                    console.log(error);
                })
            
        }


    }
})();



