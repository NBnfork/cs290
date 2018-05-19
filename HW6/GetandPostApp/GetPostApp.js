var express = require('express');

var app = express();

var handlebars = require('express-handlebars').create({defaultLayout:'main'});

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 6556);


app.get('/',function(req,res){
    //make a array for query line data
    var queryData = [];
    //push each pair into array
    for(var p in req.query){
        queryData.push({'name':p,'value':req.query[p]});
        console.log(req.query[p]);
    }
    //set the context and callback
    var context= {};
    context.dataArray = queryData;
    res.render('getOutput', context);
});

//set-up bodyParser for POST requests
var bodyParser = require('body-parser');
//can handle both URL and JSON data
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());


app.post('/',function(req,res){
    //make a array for query line data
    var queryData = [];
    //push each pair into array
    for(var r in req.query){
        queryData.push({'name':r, 'value':req.query[r]});
    }
    //set the context and callback
    var context= {};
    context.dataArray = queryData;
    res.render('postOutput', context);

    //use same process but access 'body' instead of query
    var postData = [];
    for(var q in req.body){
        postData.push({'name':q,'value':req.body[q]});
    }
    //set the context and callback
    var contextPost= {};
    contextPost.dataList = postData;
    res.render('postOutput', contextPost);

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
