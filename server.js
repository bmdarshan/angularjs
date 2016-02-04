// server.js

// set up ========================
var express  = require('express');
var app      = express();                               
var mongoose = require('mongoose');                     
var morgan = require('morgan');             
var bodyParser = require('body-parser');    
var methodOverride = require('method-override'); 


//Database connection. Connect to your mongodb. 

mongoose.connect('dbUrl');

// configuration =================


app.use(express.static(__dirname + '/app'));                    
app.use(morgan('dev'));                                         
app.use(bodyParser.urlencoded({'extended':'true'}));            
app.use(bodyParser.json());                                    
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(methodOverride());

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('db connection succesful');
});

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
  res.sendfile('app/index.html');
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
