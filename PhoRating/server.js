const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session');
const MongoClient = require('mongodb').MongoClient

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));



app.use(express.static(__dirname + '/views'));

var db;

MongoClient.connect('mongodb://127.0.0.1:27017', (err, client) => {
	if (err) return err;
	db = client.db("admin")
	app.listen(7554, () => {
  		console.log('Server running on http://localhost:7554')
	})
})

app.use(session({
  key: 'user_sid',
  secret: 'code4food',
  resave: false,
  saveUninitialized: false,
  cookie: {
    expires: 600000 
  }
}));

app.use(function(req, res, next){
  if (!req.session.user){
    res.clearCookie('user_sid');
  }
  next();
})


app.get('/', function(req,res){
  res.render('index');
})

app.get('/ratings', function (req, res){
	var a = db.collection('restaurants').find();
  console.log(a);
})

app.post('/saveRatings', function(req,res){
	db.collection('restaurants').save(req.body, (err,result), =>{
		if (err) throw err;

	})
})

