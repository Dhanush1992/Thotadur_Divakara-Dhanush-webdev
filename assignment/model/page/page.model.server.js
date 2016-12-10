/**
 * Created by dhanush on 12/9/16.
 */
module.exports = function () {
    var mongoose = require('mongoose');
    var model = {};
    var PageSchema = require('./page.schema.server')();
    var PageModel = mongoose.model("PageModel", PageSchema);


    var api = {

        createPage: createPage,
        findAllPagesForWebsite: findAllPagesForWebsite,
        findPageById: findPageById,
        updatePage: updatePage,
        deletePage: deletePage,
        findAllWidgetsForPage: findAllWidgetsForPage,
        removeWidgetFromPage: removeWidgetFromPage,
        setModel: setModel

    };
    return api;
};