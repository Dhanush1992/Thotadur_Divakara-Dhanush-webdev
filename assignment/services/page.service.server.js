/**
 * Created by dhanush on 11/6/16.
 */
module.exports = function (app) {

    var pages = [ { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
        { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
        { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }];

    app.post("/api/website/:websiteId/page",createPage);
    app.get("/api/page/:pageId",findPageById);
    app.delete("/api/page/:pageId",deletePage);
    app.get("/api/website/:websiteId/page",findPageByWebsiteId);
    app.put("/api/page/:pageId",updatePage);










}