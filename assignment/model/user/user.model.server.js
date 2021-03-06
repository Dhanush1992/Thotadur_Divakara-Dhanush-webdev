/**
 * Created by dhanush on 12/9/16.
 */
module.exports = function () {
    var mongoose = require('mongoose');
    var model = {};
    var UserSchema = require('./user.schema.server')();
    var UserModel = mongoose.model("UserModel", UserSchema);

    var api = {
        createUser: createUser,
        findUserById: findUserById,
        updateUser: updateUser,
        findUserByCredentials: findUserByCredentials,
        findUserByUsername: findUserByUsername,
        findWebsitesForUser: findWebsitesForUser,
        removeUser: removeUser,
        setModel: setModel,
        findUserByFacebookId  : findUserByFacebookId
    };
    return api;


    function setModel(_model) {
        model = _model;
    }

    function findUserByFacebookId(facebookId) {
        return UserModel.findOne({'facebook.id': facebookId});
    }


    function findWebsitesForUser(userId) {
        return UserModel
            .findById(userId)
            .populate("websites", "name")
            .exec();
    }

    function removeUser(userId) {
        return UserModel
            .remove({_id: userId});
    }

    function findUserByCredentials(username, password) {
        return UserModel.findOne({
            username: username,
            password: password
        });
    }
    function findUserByUsername(username) {
        return UserModel.findOne({username: username})
    }

    function updateUser(userId, user) {
        return UserModel
            .update(
                {
                    _id: userId
                },
                {
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email:user.email

                }
            );
    }

    function findUserById(userId) {
        return UserModel.findById(userId);
    }

    function createUser(user) {
        return UserModel.create(user);
    }
};


