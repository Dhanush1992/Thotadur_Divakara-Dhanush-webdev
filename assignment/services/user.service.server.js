/**
 * Created by dhanush on 11/6/16.
 */
module.exports = function (app) {
    var users = [ {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
        {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
        {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
        {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" } ];

    app.post("/api/user",createUser);
    app.get("/api/user/:userId",findUserById);
    app.get("/api/user",findUserByCredentials);
    app.get("/api/user",findUserByUsername);
    app.put("/api/user/:userId",updateUser);

    function updateUser(req,res){
        var userObj = req.body;

        var currentUserId = userObj._id;

        for (var usr in users){

                if(users[usr]._id === currentUserId){
                    users[usr] = userObj;
                    res.send('200');
                    return;
                }

        }
        res.send('0');

    }

    function findUserByUsername(req,res){
        var username = req.query.username;

        for (var i =0;i<users.length;i++){
            if(users[i].username===username){
                res.send(users[i]);
                return;
            }
        }
        res.send('0');
    }

    function findUserByCredentials(req,res){
        var username = req.query.username;
        var password = req.query.password;
        console.log(username,password);

        for (var i =0;i<users.length;i++){
            if(users[i].username===username && users[i].password===password){
                res.send(users[i]);
                return;
            }
        }
        res.send('0');
    }

    function findUserById(req,res){

        var id = req.params.userId;
        console.log(id);

        for (var i =0;i<users.length;i++){
            if(users[i]._id===id){
                res.send(users[i]);
                return;
            }
        }
        res.send('0');
    }

    function createUser(req,res) {

        var user = req.body;
        var newUserName = user.username;
        var id = (new Date().getTime()).toString();

        for(var name in users)
        {
            if(name.username === newUserName)
            {
                res.send('0');
                return;
            }
        }
        user._id = id;
        users.push(user);
        res.send(user);

    }
}