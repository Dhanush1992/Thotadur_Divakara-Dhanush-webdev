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
            var url = "/api/website/"+websiteId;
            return $http.delete(url);

        }

        function updateWebsite(website) {
            var url = "/api/website/"+website._id;
            return $http.put(url,website);
        }

        function createWebsite(userId,website) {
            website.developerId = userId;
            var url = "/api/user/"+userId+"/website";
            return $http.post(url,website);
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