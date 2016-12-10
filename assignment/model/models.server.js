/**
 * Created by dhanush on 12/9/16.
 */
module.exports = function () {
    var mongoose = require('mongoose');
    mongoose.connect('mongodb://d92:123@ds127998.mlab.com:27998/db92webdev');

    var userModel = require("./user/user.model.server")();
    var websiteModel = require("./website/website.model.server")();
    var pageModel = require("./page/page.model.server")();
    var widgetModel = require("./widget/widget.model.server")();

    var model = {
        userModel: userModel,
        websiteModel: websiteModel,
        pageModel: pageModel,
        widgetModel: widgetModel
    };

    websiteModel.setModel(model);
    userModel.setModel(model);
    pageModel.setModel(model);
    widgetModel.setModel(model);

    return model;
};