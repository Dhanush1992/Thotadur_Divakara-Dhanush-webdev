(function() {
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", WebsiteListController)
        .controller("NewWebsiteController", NewWebsiteController)
        .controller("EditWebsiteController", EditWebsiteController);
    function WebsiteListController($routeParams, WebsiteService) {
        var vm = this;
        var vm.userId = $routeParams["userId"];
        function init() {
            vm.websites = WebsiteService.findWebsitesByUser(userId);
        }
        init();
    }
    function NewWebsiteController() {
        var vm = this;
    }
    function EditWebsiteController($routeParams,WebsiteService) {
        var vm = this;
        vm.websiteID = $routeParams["websiteID"];
        function init() {
            vm.user = UserService.findWebsiteById(vm.websiteID);
        }

        init();
    }
})();



