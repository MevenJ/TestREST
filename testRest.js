var express = require('express');
var app     = express();
var http = require('http').Server(app);


var messages =[];
//var notes ={};

var users =[];


var checkToken = function(token){
  if(!token || token == 'undefined'){
    return false;
  }
  return true;
}



var bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 




app.use(express.static('./html/docapi'));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, token");
      // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
      res.send(200);
    }
    else {
      next();
    }
});


/** Tchat part **/

/**
 * add a message
 */

app.post('/notes', function(req, res){
    var id = req.body.msg;
    messages.push(id);
    res.status(201);
    res.send(messages);
});

app.post('/del', function(req, res){
    var id = req.body.msg;
    for (i=0; i<messages.length; i++){
      while (messages[i] == id){ //avec if ne supprime pas tout si 2 a suivre
	messages.splice(i,1);
      }
    }
    res.send(messages);
});


app.post('/clear', function(req, res){
    messages=[];
    res.send(messages);
});


app.get('/notes', function(req, res){
  res.send(messages);
});
    


app.use(function(req, res, next){
    res.setHeader('Content-Type', 'text/plain');
    res.send(404, 'Page introuvable !');
});

http.listen(8080, function(){
  console.log('listening on *:8080');
});