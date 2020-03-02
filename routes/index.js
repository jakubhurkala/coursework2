const express = require('express');
const router = express.Router();
const path = require('path');
const mongoose = require('mongoose');
const expressValidator = require('express-validator');
const flash = require('connect-flash');
const session = require('express-session');
const config = require('../config/database');
const passport = require('passport');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

//mongoose.connect(config.database);
//let db = mongoose.connection;

// Check for DB errors
/*db.on('error', function(err){
  console.log(err);
});*/

// Making sure db working
/*db.once('open', function() {
  console.log('Connected to MongoDB');
});*/

// Express Session Middleware
router.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
}));

// Express Messages Middleware
router.use(require('connect-flash')());
router.use(function(req, res, next) {
  res.locals.messages = require("express-message")(req, res);
  next();
});

// Express Validator Middleware
router.use(expressValidator({
  errorFormatter: function(param, msg, value) {
    var namespace = param.split('.')
    , root = namespace.shift()
    , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg : msg,
      value : value
    };
  }
}));

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'E-commerce' });
});

router.post('/search', function(req, res, next) {
  res.redirect('/search-result?p=' + req.body.productname);
});

router.get('/search-result', function(req, res, next) {
  res.render('search-result', {
    title: 'E-commerce',
    product: req.query.p
  });
});

router.post('/send', function(req, res) {
  const output = `
  You have a new message From

  Name: ${req.body.Name}
  Email: ${req.body.Email}
  Subject: ${req.body.Subject}

  Message: ${req.body.Message}
  `;

  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'grouprojectpen@gmail.com',
      pass: 'Pentesting1'
    }
  });

  let mailOptions = {
    from: 'grouprojectpen@gmail.com',
    to: 'grouprojectpen@gmail.com',
    subject: 'Issue',
    text: output
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });

  res.render('index', {
    title: 'E-commerce' });
});

module.exports = router;
