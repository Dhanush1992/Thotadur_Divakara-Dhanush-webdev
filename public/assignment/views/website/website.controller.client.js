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
            vm.websites = WebsiteService.findWebsitesForUser(vm.userId);
        }
        init();
    }
    function NewWebsiteController($location,$routeParams,WebsiteService) {
        var vm = this;
        vm.userId = parseInt($routeParams["uid"]);
        vm.createWebsite = createWebsite;
        function init(){
            vm.websites = WebsiteService.findWebsitesForUser(vm.userId+"");
        }
        init();
        function createWebsite(name,description){
            if((name == null)||(description == null)){
                alert("Cannot create a website with an empty name/description");
            }else{

                var id = Math.floor(Math.random() * 999);
                var x = UserService.findWebsiteById(id+"");
                while(true) {
                    if(x == false) {
                        break;
                    }
                    else{
                        id = Math.floor(Math.random() * 999);
                        x = UserService.findWebsiteById(id+"");
                    }
                }

                id = id.toString();
                var newWebsite = {
                    "name":name,
                    "description":description;
                    "websiteId":id
                };
                WebsiteService.createWebsite(vm.userId+"",);
                $location.url("/user/"+vm.userId+"/website");
            }

        }

    }
    function EditWebsiteController($routeParams,WebsiteService) {
        var vm = this;
        vm.websiteId = $routeParams["websiteID"];
        vm.userId = $routeParams["uid"];

        function init() {
            vm.website = WebsiteService.findWebsiteById(vm.websiteId+"");
            vm.websites = WebsiteService.findWebsitesForUser(vm.userId);
        }
        init();
        vm.updateWebsite = updateWebsite;
        vm.deleteWebsite = deleteWebsite;

        function updateWebsite() {
            WebsiteService.updateWebsite(vm.websiteId, vm.website);
            $location.url("/user/"+vm.userId+"/website");
        }

        function deleteWebsite() {
            WebsiteService.deleteWebsite(vm.websiteId);
            $location.url("/user/"+vm.userId+"/website");
        }


    }
})();



