/**
 * Created by dhanush on 11/6/16.
 */

module.exports = function (app,model) {

    var websites = [
        { _id: "123", name: "Facebook",    developerId: "456", description: "Lorem" },
        { _id: "234", name: "Tweeter",     developerId: "456", description: "Lorem" },
        { _id: "456", name: "Gizmodo",     developerId: "456", description: "Lorem" },
        { _id: "567", name: "Tic Tac Toe", developerId: "123", description: "Lorem" },
        { _id: "678", name: "Checkers",    developerId: "123", description: "Lorem" },
        { _id: "789", name: "Chess",       developerId: "234", description: "Lorem" } ];

    app.post("/api/user/:userId/website",createWebsite);
    app.get("/api/website/:websiteId",findWebsiteById);
    app.get("/api/user/:userId/website",findWebsitesForUser);
    app.put("/api/website/:websiteId",updateWebsite);
    app.delete("/api/website/:websiteId",deleteWebsite);


    function updateWebsite(req, res) {
        var websiteId = req.params.websiteId;
        var website = req.body;
        model
            .websiteModel
            .updateWebsite(websiteId, website)
            .then(function (status) {
                    if(status) {
                        res.send(200);
                    }
                    else {
                        res.send('0');
                    }
                },
                function (error) {
                    res.sendStatus(400).send(error);
                });
    }

    function deleteWebsite(req, res){
        var websiteId = req.params.websiteId;
        model
            .websiteModel
            .deleteWebsite(websiteId)
            .then(function (status) {
                    if(status){
                        res.send(200);
                    }
                    else {
                        res.send('0');
                    }

                },
                function (error) {
                    res.sendStatus(400).send(error);
                });
    }

    function createWebsite(req, res) {
        var uid = req.params.userId;
        var website = req.body;
        model
            .websiteModel
            .createWebsite(uid, website)
            .then(function (website) {
                    if(website){
                        res.json(website);
                    }
                    else {
                        res.send('0');
                    }
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );
    }

    function findWebsiteById(req, res) {
        var websiteId = req.params.websiteId;
        model
            .websiteModel
            .findWebsiteById(websiteId)
            .then(function (website) {
                    if(website) {
                        res.send(website);
                    }
                    else {
                        res.send('0');
                    }
                },
                function (error) {
                    res.sendStatus(400).send(error);
                });
    }

    function findWebsitesForUser(req, res) {
        var uid = req.params.userId;
        console.log(uid);
        model
            .websiteModel
            .findWebsitesForUser(uid)
            .then(
                function (websites) {
                    if(websites) {
                        res.json(websites);
                    }
                    else {
                        res.send('0');
                    }
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );

    }





}