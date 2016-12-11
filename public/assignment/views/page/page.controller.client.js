(function() {
    angular
        .module("WebAppMaker")
        .controller("PageListController", PageListController)
        .controller("NewPageController", NewPageController)
        .controller("EditPageController", EditPageController);
    function PageListController($routeParams, PageService) {
        var vm = this;
        vm.websiteId = $routeParams['wid'];
        vm.userId = $routeParams['uid'];
        function init(){
            PageService
                .findPageByWebsiteId(vm.websiteId)
                .success(function(website){
                    vm.pages = website.pages;
                    console.log("Hello from pages");
                    console.log(website.pages);
                })
                .error(function(){

                })
        }
        init();

    }


    function NewPageController($routeParams,$location,PageService) {
        var vm = this;
        vm.userId = $routeParams['uid'];
        vm.websiteId = $routeParams['wid'];
        vm.createNewPage = createNewPage;

        function init(){
            PageService
                .findPageByWebsiteId(vm.websiteId)
                .success(function(){

                })
                .error(function(){

                });

        }
        init();

        function createNewPage(name,description){
            // var id = Math.floor(Math.random() * 999);
            //
            // var x = PageService.findPageById(id+"");
            // while(true) {
            //     if(x == false) {
            //         break;
            //     }
            //     else{
            //         id = Math.floor(Math.random() * 999);
            //         x = PageService.findPageById(id+"");
            //     }
            // }
            //
            // id = id.toString();

            var newPage = {};
            newPage.name = name;
            //newPage._id = id;
            newPage.description = description;
            PageService
                .createPage(vm.websiteId,newPage)
                .success(function(pages){
                    vm.pages = pages;
                    $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page");
                })
                .error(function(){

                })


        }
    }
    function EditPageController($location,$routeParams, PageService) {
        var vm = this;
        vm.pageId = $routeParams["pid"];
        vm.userId = $routeParams['uid'];
        vm.websiteId = $routeParams['wid'];
        function init() {
            PageService
                .findPageById(vm.pageId)
                .success(function(page){
                    vm.page = page;
                })
                .error(function(){

                });
            PageService
                .findPageByWebsiteId(vm.websiteId)
                .success(function(pages){
                    vm.pages = pages;
                })
                .error(function(){

                })
        }
        init();

        vm.updatePage = updatePage;
        vm.deletePage = deletePage;

        function updatePage(){
            PageService
                .updatePage(vm.pageId,vm.page)
                .success(function(page){
                    vm.page = page;
                    $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page");
                })
                .error(function(){

                });
        }

        function deletePage(){
            PageService
                .deletePage(vm.pageId)
                .success(function(res){
                    $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page");
                })
                .error(function(){

                });



        }
    }
})();



