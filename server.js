'use strict';
const Routes = require('./routes.js');
var express = require('express');
var mongo = require('mongodb');
var MongoClient = require('mongodb').MongoClient;
let bodyParser = require('body-parser');
var cors = require('cors');
var db = require('./db');
const dns = require('dns');
var app = express();
const dbname = 'urlShortener';
// Basic Configuration 
var port = process.env.PORT || 3000; 
app.use(bodyParser.urlencoded({extended: true}));
/** this project needs a db !! **/ 
 MongoClient.connect(db.url, (err, database) => {
   if (err){   
     console.log(err);
   }else{ 
   
require('./routes')(app, database); 
     app.listen(port, function () {
  console.log('Node.js listening ...');
}); 
                  console.log('db is connected!')};
                  });
   

/** this project needs to parse POST bodies **/
// you should mount the body-parser here

app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function(req, res){
  res.sendFile(process.cwd() + '/views/index.html');
});

  

// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

