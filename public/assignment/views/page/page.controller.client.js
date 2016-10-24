(function() {
    angular
        .module("WebAppMaker")
        .controller("PageListController", PageListController)
        .controller("NewPageController", NewPageController)
        .controller("EditPageController", EditPageController);
    function PageListController($routeParams, PageService) {
        var vm = this;
        vm.websiteId = parseInt($routeParams['wid']);
        vm.userId = parseInt($routeParams['uid']);
        function init(){
            vm.pages = PageService.findPageByWebsiteId(vm.websiteId+"");
        }
        init();

    }
    function NewPageController($routeParams,$location,PageService) {
        var vm = this;
        vm.userId = parseInt($routeParams['uid']);
        vm.websiteId = parseInt($routeParams['wid']);
        vm.createNewPage = createNewPage;

        function init(){
            vm.pages = PageService.findPageByWebsiteId(vm.websiteId+"");
        }
        init();

        function createNewPage(name,description){
            var id = Math.floor(Math.random() * 999);

            var x = PageService.findPageById(id+"");
            while(true) {
                if(x == false) {
                    break;
                }
                else{
                    id = Math.floor(Math.random() * 999);
                    x = PageService.findPageById(id+"");
                }
            }

            id = id.toString();

            var newPage = {};
            newPage.name = name;
            newPage._id = id;
            newPage.description = description;
            PageService.createPage(vm.websiteId+"",newPage);
            $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page");

        }
    }
    function EditPageController($location,$routeParams, PageService) {
        var vm = this;
        vm.pageId = parseInt($routeParams["pid"]);
        vm.userId = parseInt($routeParams['uid']);
        vm.websiteId = parseInt($routeParams['wid']);
        function init() {
            vm.page = PageService.findPageById(vm.pageId+"");
            vm.pages = PageService.findPageByWebsiteId(vm.websiteId+"");
        }
        init();

        vm.updatePage = updatePage;
        vm.deletePage = deletePage;

        function updatePage(){
            PageService.updatePage(vm.pageId+"", vm.page);
            $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page");
        }

        function deletePage(){
            PageService.deletePage(vm.pageId);
            $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page");
        }
    }
})();



