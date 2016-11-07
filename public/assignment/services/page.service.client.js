(function() {
    angular
        .module("WebAppMaker")
        .factory("PageService", PageService);
    function PageService() {

        var api = {
            createPage : createPage,
            findPageByWebsiteId : findPageByWebsiteId,
            findPageById : findPageById,
            updatePage : updatePage,
            deletePage : deletePage

        };
        return api;

        function findPageByWebsiteId(websiteId){
            var pageList = [];

            for (var p in pages) {
                if (pages[p].websiteId === websiteId) {
                    pageList.push(pages[p]);
                }
            }
            return pageList;
        }

        function deletePage(pageId) {
            pages.forEach(function(result,index){
                if(result["_id"] === pageId){
                    pages.splice(index,1);
                }
            });
        }

        function updatePage(pageId,page) {
            for (var p in pages) {
                if (pages[p]._id === pageId) {
                    pages[p] = page;
                }
            }
        }

        function createPage(websiteId,page) {
            page.websiteId = websiteId;
            pages.push(page);
        }

        function findPageById(pageId) {
            for (var p in pages) {
                if (pages[p]._id === pageId) {
                    return pages[p];
                }
            }
            return false;
        }



    }
})();