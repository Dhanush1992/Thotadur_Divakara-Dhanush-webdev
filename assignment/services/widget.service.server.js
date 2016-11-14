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

    function findWidgetById(req,res){
        var widgetId = req.params.widgetId;
        for(var w in widgets) {
            if(widgets[w]._id == widgetId) {

                res.send(widgets[w]);
                return;
            }
        }
        res.send('0');

    }

    function findWidgetsByPageId(req,res){
        var pageId = req.params.pageId;
        var x = [];
        for(var w in widgets){
            if(widgets[w].pageId === pageId){
                x.push(widgets[w]);
            }
        }

        res.json(x);

    }

    function createWidget(req,res){
        var widget = req.body;
        var pageId = req.params.pageId;
        widget.pageId = pageId;
        widgets.push(widget);
        res.send(widgets);
    }

    function updateWidget(req,res){
        var widget = req.body;
        var widgetId = widget._id;
        for(var w in widgets) {
            if (widgets[w]._id === widgetId) {
                widgets[w] = widget;
                res.send('200');
                return;
            }
        }
        res.send('0');

    }

    function deleteWidget(req,res){
        var widgetId = req.params.widgetId;
        for(var i in widgets)
        {
            if(widgets[i]._id === widgetId)
            {
                widgets.splice(i,1);
                res.send('200');
                return;
            }
        }

        res.send('0');
    }

}