(function() {
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", WebsiteListController)
        .controller("NewWebsiteController", NewWebsiteController)
        .controller("EditWebsiteController", EditWebsiteController);
    function WebsiteListController($routeParams, WebsiteService) {
        var vm = this;
        vm.userId = $routeParams["uid"];
        function init() {
            WebsiteService
                .findWebsitesForUser(vm.userId)
                .success(function (websites) {
                    vm.websites = websites;

                })
                .error(function () {

                })

            //vm.websites = WebsiteService.findWebsitesForUser(vm.userId);
        }
        init();
    }
    function NewWebsiteController($location,$routeParams,WebsiteService) {
        var vm = this;
        vm.userId = parseInt($routeParams["uid"]);
        vm.createNewWebsite = createNewWebsite;
        function init(){

            WebsiteService
                .findWebsitesForUser(vm.userId+"")
                .success(function (websites) {
                    console.log(websites);
                    vm.websites = websites;
                })
                .error(function () {

                })
        }
        init();

        function createNewWebsite(name,description){
            if((name == null)||(description == null)){
                alert("Cannot create a website with an empty name/description");
            }else{

                //id = id.toString();
                var newWebsite = {};
                //newWebsite._id = id;
                newWebsite.name = name;
                newWebsite.developerId = vm.userId;
                newWebsite.description = description;
                WebsiteService
                    .createWebsite(vm.userId,newWebsite)
                    .success(function (website) {

                        vm.website = website;
                        vm.websiteId = website._id;
                        $location.url("/user/"+vm.userId+"/website");
                    })
                    .error(function () {
                        //handle this
                    });

            }

        }

    }
    function EditWebsiteController($routeParams,WebsiteService, $location) {
        var vm = this;
        vm.websiteId = $routeParams["wid"];
        vm.userId = $routeParams["uid"];

        function init() {

            WebsiteService
                .findWebsiteById(vm.websiteId+"")
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
                .updateWebsite(vm.website)
                .success(function () {
                    $location.url("/user/"+vm.userId+"/website");
                })
                .error(function () {

                })

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



