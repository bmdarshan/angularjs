// server.js

// set up ========================
var express  = require('express');
var app      = express();                               // create our app w/ express
var mongoose = require('mongoose');                     // mongoose for mongodb
var morgan = require('morgan');             // log requests to the console (express4)
var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)

// configuration =================

mongoose.connect('mongodb://bmdarshan:369hmbdarshanppg@ds043062.mongolab.com:43062/angularjsbmdarshan');     // connect to mongoDB database on mongolab cloud

app.use(express.static(__dirname + '/app'));                    // set the static files location /public/img will be /img for users
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
app.listen(9000);
console.log("App listening on port 9000");

var ExpenseSchema = new mongoose.Schema({
  date: String,
  description: String,
  category: String,
  amount: Number
});

var Expense = mongoose.model('Expense', ExpenseSchema);

app.get('/', function(req, res) {
  res.sendfile('app/index.html'); // load the single view file (angular will handle the page changes on the front-end)
});

app.get('/api/expenses', function (req, res, next) {
  Expense.find(function(err, name){
    if(err) res.send(err);
    res.json(name);
  });
});

app.post('/api/expense', function (req, res, next) {
  Expense.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});
