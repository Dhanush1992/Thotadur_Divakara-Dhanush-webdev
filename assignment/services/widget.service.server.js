/**
 * Created by dhanush on 11/6/16.
 */
module.exports = function (app) {


    var widgets = [ { "_id": "123", "widgetType": "HEADER", "pageId": "321", "size": 2, "text": "GIZMODO"},
        { "_id": "234", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
            "url": "http://lorempixel.com/400/200/"},
        { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
        { "_id": "567", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
            "url": "https://youtu.be/AM2Ivdi9c4E" },
        { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}];

    app.post("/api/page/:pageId/widget",createWidget);
    app.get("/api/page/:pageId/widget",findWidgetsByPageId);
    app.get("/api/widget/:widgetId",findWidgetById);
    app.put("/api/widget/:widgetId",updateWidget);
    app.delete("/api/widget/:widgetId",deleteWidget);
    app.put("/page/:pageId/widget",widgetSwap);

    function widgetSwap(req,res){
        var pageId = req.params.pageId;
        var start = req.query.initial;
        var end = req.query.final;
        console.log("Start and end" + start + " " + end);

        var currentStart = getIndexForPageId(pageId, start);
        var currentEnd = getIndexForPageId(pageId, end);
        widgets.splice(currentEnd, 0, widgets.splice(currentStart, 1)[0]);
        res.send(200);

    }
    function getIndexForPageId(pageId, index) {
        var x = [];
        for(var i = 0; i < widgets.length;i++)
        {
            if(widgets[i].pageId === pageId)
            {
                x.push(i);
            }
        }
        return x[index];
    }


    function findWidgetById(req, res) {
        var widgetId = req.params.widgetId;
        model
            .widgetModel
            .findWidgetById(widgetId)
            .then(
                function (widget) {
                    if(widget) {
                        res.send(widget);
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

    function findWidgetsByPageId(req,res){
        var pageId = req.params.pageId;
        model
            .pageModel
            .findAllWidgetsForPage(pageId)
            .then(
                function (widgets) {
                    if(widgets) {
                        res.send(widgets);
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

    function createWidget(req, res) {
        var pageId = req.params.pageId;
        var widget = req.body;
        model
            .widgetModel
            .createWidget(pageId, widget)
            .then(
                function (widget) {
                    if(widget) {
                        res.send(widget);
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

    function updateWidget(req, res) {
        var widgetId = req.params.widgetId;
        var widget = req.body;
        model
            .widgetModel
            .updateWidget(widgetId, widget)
            .then(
                function (status) {
                    if(status) {
                        res.send(200);
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

    function deleteWidget(req, res) {
        var widgetId = req.params.widgetId;
        model
            .widgetModel
            .deleteWidget(widgetId)
            .then(
                function (status) {
                    if(status) {
                        res.send(200);
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