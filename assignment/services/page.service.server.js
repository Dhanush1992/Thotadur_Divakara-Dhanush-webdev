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


    function findPageByWebsiteId(req,res){
        var websiteId = req.params.websiteId;
        var pageList = [];
        for (var p in pages) {
            if (pages[p].websiteId === websiteId) {
                pageList.push(pages[p]);
            }
        }
        if (pageList.length <= 0){
            res.send('0');
            return;
        }
        res.send(pageList);

    }

    function findPageById(req,res){
        var pageId = req.params.pageId;
        for (var p in pages) {
            if (pages[p]._id === pageId) {
                res.send(pages[p]);
                return;
            }
        }
        res.send('0');
    }

    function createPage(req,res){
        var page = req.body;
        var newPageName = page.name;
        var id = (new Date().getTime()).toString();

        for(var pg in pages)
        {
            if(pg.name === newPageName)
            {
                res.send('0');
                return;
            }
        }
        page._id = id;
        pages.push(page);
        res.send(pages);
    }

    function updatePage(req,res){
        var page = req.body;
        var pageId = page._id;
        for (var p in pages) {
            if (pages[p]._id === pageId) {
                pages[p] = page;
                res.send(pages[p]);
                return;
            }
        }
        res.send('0');
    }

    function deletePage(req,res){
        console.log("here in delete page");
        var pageId = req.params.pageId;
        for(var i in pages)
        {
            if(pages[i]._id === pageId)
            {
                pages.splice(index,1);

            }
        }
        res.send('200');
    }








}