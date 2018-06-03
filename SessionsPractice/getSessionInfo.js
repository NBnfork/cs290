    var express = require('express');

    var app = express();
    var handlebars = require('express-handlebars').create({defaultLayout:'main'});
    app.engine('handlebars', handlebars.engine);
    app.set('view engine', 'handlebars');
    app.set('port', 10001);

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
    app.listen(app.get('port'), function(){
        console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
    });