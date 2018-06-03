    var express = require('express');

    var app = express();
    var handlebars = require('express-handlebars').create({defaultLayout:'main'});
    app.engine('handlebars', handlebars.engine);
    app.set('view engine', 'handlebars');
    app.set('port', 10001);

    var session = require('express-session');

    app.use(session({
        secret: 'dummypassword',

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


    app.post('/',function(req,res){
        var context = {};

        if(req.body['New List']){
            req.session.name = req.body.name;
            req.session.toDo = [];
            req.session.curId = 0;
        }

        //If there is no session, go to the main page.
        if(!req.session.name){
            res.render('newUser', context);
            return;
        }

        if(req.body['Add Item']){
            req.session.toDo.push({"name":req.body.name, "id":req.session.curId});
            req.session.curId++;
        }

        if(req.body['Done']){
            req.session.toDo = req.session.toDo.filter(function(e){
                return e.id != req.body.id;
            })
        }

        context.name = req.session.name;
        context.toDoCount = req.session.toDo.length;
        context.toDo = req.session.toDo;
        console.log(context.toDo);
        res.render('returningUser',context);
    });