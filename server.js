// server.js

// set up ========================
var express  = require('express');
var app      = express();                               // create our app w/ express
var mongoose = require('mongoose');                     // mongoose for mongodb
var morgan = require('morgan');             // log requests to the console (express4)
var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)

// fixture for initial collection
// var fixture = [{_id:1, firstName: 'Darshan',lastName: 'Bilagunda Mukunda',age: 26},{_id:2, firstName: 'Mukunda',lastName: 'Bilagunda Hanumegowda',age: 55},{_id:3, firstName: 'Prathiba',lastName: 'Giriyappa',age: 45},{_id:4, firstName: 'Sahana',lastName: 'Bilagunda Mukunda',age: 25}];

// configuration =================

mongoose.connect('mongodb://username:password@ds043062.mongolab.com:43062/dbName');     // connect to mongoDB database on mongolab cloud

app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users
app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('db connection succesful');
});

// listen (start app with node server.js) ======================================
app.listen(8080);
console.log("App listening on port 8080");

var NameSchema = new mongoose.Schema({
  _id: Number,
  firstName: String,
  lastName: String,
  age: Number,
});

var Name = mongoose.model('Name', NameSchema);

// Name.collection.insert(fixture, function (err, docs) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.info('Collection inserted succesfully');
//   }
// });


app.get('/api/names', function (req, res, next) {
  Name.find(function(err, name){
    if(err) res.send(err);
    res.json(name);
  });
});

app.get('/api/name/:id', function (req, res, next) {
  Name.findById(req.params.id, function (err, data) {
    if (err) return next(err);
    res.json(data);
  });
});
