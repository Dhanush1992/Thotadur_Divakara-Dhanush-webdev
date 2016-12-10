/**
 * Created by dhanush on 12/9/16.
 */
module.exports = function () {
    var mongoose = require("mongoose");
    var WebsiteSchema = require("./website.schema.server")();
    var WebsiteModel = mongoose.model("WebsiteModel", WebsiteSchema);
    var model = {};

    var api = {
        createWebsite: createWebsite,
        findAllWebsitesForUser: findAllWebsitesForUser,
        setModel: setModel,
        findWebsiteById: findWebsiteById,
        updateWebsite: updateWebsite,
        deleteWebsite: deleteWebsite,
        findAllPagesForWebsite: findAllPagesForWebsite,
        removePageFromWebsite: removePageFromWebsite
    };
    return api;
};