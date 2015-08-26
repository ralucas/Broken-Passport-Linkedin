/*
127.0.0.1:3000/auth/linkedin/callback
source of strategy: https://github.com/auth0/passport-linkedin-oauth2
*/

var express = require('express');
var app = express();
var passport = require('passport');
var LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;

/*  Passport docs say we need to configure our middleware. When I add the code it suggests the program throws an error.

*** Passport's configure code:
app.configure(function() {
  app.use(express.static('public'));
  app.use(express.cookieParser());
  app.use(express.bodyParser());
  app.use(express.session({ secret: 'keyboard cat' }));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(app.router);
});

*** Error message:
app.configure(function() {
    ^
TypeError: Object function (req, res, next) {
    app.handle(req, res, next);
  } has no method 'configure'
    at Object.<anonymous> (C:\Users\Mike\passport\app2.js:13:5)

*/


app.get('/', function (req, res) {
	res.send('Hello World!');
});

passport.use(new LinkedInStrategy({
  clientID: "78rp7ap88t1gpa",  
  clientSecret: "...",  //insert "client secret" here
  callbackURL: "http://127.0.0.1:3000/auth/linkedin/callback",
  scope: ['r_basicprofile']
}, function(accessToken, refreshToken, profile, done) {
  // asynchronous verification, for effect... 
  console.log("test0");  // Mike's note:  this never gets logged.  Is the function being run?
  process.nextTick(function () {
    // To keep the example simple, the user's LinkedIn profile is returned to 
    // represent the logged-in user. In a typical application, you would want 
    // to associate the LinkedIn account with a user record in your database, 
    // and return that user instead. 
    console.log("test1");  // Mike's note:  this never gets logged.  Is the function being run?
    return done(null, profile);
  });
}));



app.get('/auth/linkedin',
passport.authenticate('linkedin', { state: 'asdfqwertlkjhz91xcv' }),
function(req, res){
  // The request will be redirected to LinkedIn for authentication, so this 
  // function will not be called. 
});



app.get("/auth/linkedin/callback",function (req,res) {
	console.log("res---> ",res);  // Mike's note:  unfortunately this doesn't show the user's profile info
  res.redirect("/");
});

/*
//  Mike's note: This is the original code from the creator's of the strategy.
app.get('/auth/linkedin/callback', passport.authenticate('linkedin', {
  successRedirect: '/',
  failureRedirect: '/login',
}));
*/

var server = app.listen(3000,"127.0.0.1", function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});



