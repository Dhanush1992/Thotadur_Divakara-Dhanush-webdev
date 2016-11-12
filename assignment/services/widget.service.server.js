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
        var pageId = req.params.widgetId;
        var x = [];
        for(var w in widgets){
            if(widgets[w].pageId === pageId){
                x.push(widgets[w]);
            }
        }
        if (x.length < 1){
            res.send('0');
            return;
        }
        res.send(x);

    }

    function createWidget(req,res){
        var widget = req.body;
        var pageId = widget.pageId;
        widget.pageId = pageId;
        widgets.push(widget);
        res.send('widgets');
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
        for(var i in websites)
        {
            if(widgets[i]._id === widgetId)
            {
                widgets.splice(index,1);
                res.send('200');
                return;
            }
        }

        res.send('0');
    }

}