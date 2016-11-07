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
        vm.createNewWebsite = createNewWebsite;
        function init(){
            vm.websites = WebsiteService.findWebsitesForUser(vm.userId+"");
        }
        init();

        function createNewWebsite(name,description){
            if((name == null)||(description == null)){
                alert("Cannot create a website with an empty name/description");
            }else{

                var id = Math.floor(Math.random() * 999);
                var x = WebsiteService.findWebsiteById(id+"");
                while(true) {
                    if(x == false) {
                        break;
                    }
                    else{
                        id = Math.floor(Math.random() * 999);
                        x = WebsiteService.findWebsiteById(id+"");
                    }
                }

                id = id.toString();
                var newWebsite = {};
                newWebsite._id = id;
                newWebsite.name = name;
                newWebsite.developerId = vm.userId;
                newWebsite.description = description;
                vm.websiteId = newWebsite._id;
                vm.website = newWebsite;

                WebsiteService.createWebsite(vm.userId+"",newWebsite);
                $location.url("/user/"+vm.userId+"/website");
            }

        }

    }
    function EditWebsiteController($routeParams,WebsiteService) {
        var vm = this;
        vm.websiteId = $routeParams["wid"];
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



