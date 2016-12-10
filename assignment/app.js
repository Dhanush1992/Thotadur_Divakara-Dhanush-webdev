/**
 * Created by dhanush on 11/6/16.
 */

module.exports = function(app) {
    var model = require("./model/models.server.js")();
    require("./services/user.service.server")(app,model);
    require("./services/website.service.server")(app,model);
    require("./services/page.service.server")(app,model);
    require("./services/widget.service.server")(app,model);
};