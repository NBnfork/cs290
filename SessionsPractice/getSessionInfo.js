    var express = require('express');

    var app = express();
    var handlebars = require('express-handlebars').create({defaultLayout:'main'});
    app.engine('handlebars', handlebars.engine);
    app.set('view engine', 'handlebars');
    app.set('port', 8080);

    var session = require('express-session');

    app.use(session({
        secret: 'dummypassword',
        resave: true,
        saveUninitialized: true
    }));

    app.get('/', function (req, res) {
        var context = {};
        //no session go to newUser
        if (!req.session.name) {
            res.render('newUser', context);
            return;
        }
        context.name = req.session.name;
        context.toDoCount = req.session.toDo.length || 0;
        context.toDo = req.session.toDo || [];
        console.log(context.toDO);
        res.render('returningUser', context);
    });
