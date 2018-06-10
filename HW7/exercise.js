//database connection
var mysql = require('mysql');
var pool = mysql.createPool({
    connectionLimit : 10,
    host  : 'classmysql.engr.oregonstate.edu',
    user  : 'cs290_buchenn',
    password: '6556',
    database: 'cs290_buchenn'
});

module.exports.pool = pool;

var express = require('express');

var app = express();

var handlebars = require('express-handlebars').create({defaultLayout:'main'});

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 10001);

app.use(express.static('public'));

app.get('/',function(req,res){
    res.render('home.handlebars')
});

app.use(function(req,res){
    res.type('text/plain');
    res.status(404);
    res.send('404 - Not Found');
});

app.use(function(err, req, res, next){
    console.error(err.stack);
    res.type('plain/text');
    res.status(500);
    res.send('500 - Server Error');
});

app.listen(app.get('port'), function(){
    console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});

//database set-up
var mysql = require('mysql');
var pool = mysql.createPool();

app.get('/',function(req,res,next){
    var context = {};
        pool.query("DROP TABLE IF EXISTS workouts", function(err){
        var createString = "CREATE TABLE workouts("+
            "id INT PRIMARY KEY AUTO_INCREMENT,"+
            "" +
            "ame VARCHAR(255) NOT NULL,"+
            "reps INT,"+
            "weight INT,"+
            "lbs BOOLEAN,"+
            "date DATE)";
        pool.query(createString, function(err){
            context.results = "Table reset";
            res.render('home',context);
        })
    });
});

app.get('/',function(req,res,next){
    var context = {};
    mysql.pool.query("INSERT INTO workouts (`name`) VALUES (?)", [req.query.c], function(err, result){
        if(err){
            next(err);
            return;
        }
        context.results = "Inserted id " + result.insertId;
        res.render('home',context);
    });
});