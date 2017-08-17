const express = require('express');
const mongoose = require('mongoose');
const bluebird = require ('bluebird');
const handlebars = require ('express-handlebars');
const bodyParser = require ('body-parser');
const fs = require('fs');
const session = require('express-session');
const validator = require('express-validator');
const flash = require('express-flash-messages');
const passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy;
//const loginRouter = require('./routes/login');
//const snippetsRouter = require('./routes/snippets');
//const searchRouter = require('./routes/search');

mongoose.Promise = require('bluebird');

const Users = require('./models/user');
const Snippets = require('./models/snippets');
const app = express();

app.engine('handlebars', handlebars());
app.set('views', './views');
app.set('view engine', 'handlebars');

const url = 'mongodb://localhost:27017/codesnippets';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//app.use('/', routes);
app.use(session({
  secret: 'sonnyboy',
  resave: false,
  saveUninitialized: true
}))

app.use(express.static('public'))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(validator());

app.use(passport.initialize());

app.use(passport.session());

app.use(flash());


app.get('/', (req, res) => {
  res.render('home');

  //if statement for if logged in, continue to homepage('/')
  //else if not logged in go to /login
});

app.get('/register', (req, res) => {
  res.render('register')
})

app.get('/login', (req, res) => {
  res.render('login')
})

app.post('/registerUser', (req, res) => {
  let user = new User(req.body);
  user.provider = 'local';
  user.setPassword(req.body.password);

  user
  .save()
  .then(() => res.redirect('/'))
  .catch(err => console.log(err));

})

app.post('/userLogin', (req, res) => {

})

mongoose
  // connect to mongo via mongoose
  .connect('mongodb://localhost:27017/newdb', { useMongoClient: true })
  // now we can do whatever we want with mongoose.
  // configure session support middleware with express-session
  .then(() => app.listen(3001, () => console.log('ready to roll!!')));
