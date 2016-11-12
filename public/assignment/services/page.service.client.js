(function() {
    angular
        .module("WebAppMaker")
        .factory("PageService", PageService);
    function PageService($http) {
        // var pages = [ { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
        //     { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
        //     { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }];

        var api = {
            createPage : createPage,
            findPageByWebsiteId : findPageByWebsiteId,
            findPageById : findPageById,
            updatePage : updatePage,
            deletePage : deletePage

        };
        return api;

        function findPageByWebsiteId(websiteId){

            var url = "/api/website/"+websiteId+"/page";
            return $http.get(url);
            // var pageList = [];
            // for (var p in pages) {
            //     if (pages[p].websiteId === websiteId) {
            //         pageList.push(pages[p]);
            //     }
            // }
            // return pageList;
        }

        function deletePage(pageId) {
            console.log("Hello from client");
            var url = "/api/page/"+pageId;
            return $http.delete(url);

            // pages.forEach(function(result,index){
            //     if(result["_id"] === pageId){
            //         pages.splice(index,1);
            //     }
            // });
        }

        function updatePage(pageId,page) {
            var url = "/api/page/"+pageId;
            return $http.put(url,page);
            // for (var p in pages) {
            //     if (pages[p]._id === pageId) {
            //         pages[p] = page;
            //     }
            // }
        }

        function createPage(websiteId,page) {
            page.websiteId = websiteId;
            var url = "/api/website/"+websiteId+"/page";
            return $http.post(url,page);
            //pages.push(page);
        }

        function findPageById(pageId) {
            var url = "/api/page/"+pageId;
            return $http.get(url);

            // for (var p in pages) {
            //     if (pages[p]._id === pageId) {
            //         return pages[p];
            //     }
            // }
            // return false;
        }



    }
})();