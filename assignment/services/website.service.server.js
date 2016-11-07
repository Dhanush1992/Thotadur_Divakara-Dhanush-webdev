/**
 * Created by dhanush on 11/6/16.
 */

module.exports = function (app) {

    var websites = [ { "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem" },
        { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem" },
        { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem" },
        { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem" },
        { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem" },
        { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem" } ];

    app.post("/api/user/:userId/website",createWebsite);
    app.get("/api/website/:websiteId",findWebsiteById);
    app.get("/api/user/:userId/website",findWebsitesForUser);
    app.put("/api/website/:websiteId",updateWebsite);
    app.delete("/api/website/:websiteId",deleteWebsite);


    function updateWebsite(req,res){
        var website = req.body;
        for (var w in websites) {
            if (websites[w]._id === website._id) {
                websites[w] = website;
                res.send('200');
            }
        }
        res.send('0');
    }

    function createWebsite(req,res){

        var website = req.body;
        var newWebsiteName = website.username;
        var id = (new Date().getTime()).toString();

        for(var wb in websites)
        {
            if(wb.name === newWebsiteName)
            {
                res.send('0');
                return;
            }
        }
        website._id = id;
        websites.push(website);
        res.send('200');
    }

    function findWebsiteById(req,res) {

        var wid = req.params.websiteId;
        for (var w in websites) {
                if (websites[w]._id === wid) {
                    res.send(websites[w]);
                    return;
                }
            }
            res.send('0');
    }

    function findWebsitesForUser(req,res){
        var uid = req.params.userId;
        var result = [];
        for(var w in websites) {
            if(websites[w].developerId === uid) {
                result.push(websites[w]);
            }
        }
        if(result.count > 0){
            res.send(result);
            return;
        }

        res.send('0');


    }





}