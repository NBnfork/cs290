var express = require('express');

var app = express();

//app.engine('handlebars', handlebars.engine);
//app.set('view engine', 'handlebars');
app.set('port', 6556);

var session = require('express-session');

app.use (session({secret:'dummypassword'}));

app.get('/newUser', function(req, res, next){
    var context = {};
    //no session go to newUser
    if(!req.session.name){
        res.render('newUser', context);
        return;
    }
    context.name = req.session.name;
    context.toDoCount = req.session.toDo.length || 0;
    context.toDo = req.session.toDo || [];
    console.log(context.toDO);
    res.render('/returningUser', context);
});