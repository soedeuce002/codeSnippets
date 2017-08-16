const express = require('express');
const mongoose = require('mongoose');
const bluebird = require ('bluebird');
const handlebars = require ('express-handlebars');
const bodyParser = require ('body-parser');
const fs = require('fs');
const session = require('express-session');
const validator = require('express-validator');
const flash = require('express-flash-messages');
const passport = require('passport');
//const loginRouter = require('./routes/login');
//const snippetsRouter = require('./routes/snippets');
//const searchRouter = require('./routes/search');

mongoose.Promise = bluebird;

const Users = require('./models/users');
const Snippets = require('./models/snippets')
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
  res.send('hey there!');
});


mongoose
  // connect to mongo via mongoose
  .connect('mongodb://localhost:27017/newdb', { useMongoClient: true })
  // now we can do whatever we want with mongoose.
  // configure session support middleware with express-session
  .then(() => app.listen(3000, () => console.log('ready to roll!!')));
