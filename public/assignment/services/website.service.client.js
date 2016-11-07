(function(){
    angular
        .module("WebAppMaker")
        .factory("WebsiteService", WebsiteService);

    function WebsiteService($http) {


        var api = {
            findWebsitesForUser: findWebsitesForUser,
            findWebsiteById: findWebsiteById,
            createWebsite: createWebsite,
            updateWebsite: updateWebsite,
            deleteWebsite: deleteWebsite
        };
        return api;

        function deleteWebsite(websiteId) {
            websites.forEach(function(result,index){
                if(result["_id"] === websiteId){
                    websites.splice(index,1);
                }
            });
        }

        function updateWebsite(website) {
            var url = "/api/website/"+website._id;
            return $http.put(url,website);
        }

        function createWebsite(userId,website) {
            websites.developerId = userId;
            var url = "/api/user/"+userId+"/website";
            return $http.put(url,website);

        }

        function findWebsiteById(wid) {
            var url = "/api/website/"+wid;
            return $http.get(url);
        }

        function findWebsitesForUser(uid) {
            var url = "/api/user/"+uid+"/website";
            return $http.get(url);

        }
    }
})();