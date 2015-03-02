// server.js

// modules =================================================
var express        = require('./app/node_modules/express');
var app            = express();
var bodyParser     = require('./app/node_modules/body-parser');
var methodOverride = require('./app/node_modules/method-override');
var cookieParser = require('./app/node_modules/cookie-parser');
var expressSession = require('./app/node_modules/express-session');
var mongoose = require('./app/node_modules/mongoose');
// var oauthServer = require('./app/node_modules/oauth2-server');

// configuration ===========================================
// config files
var db = require('./app/db.js');

// set our port
var port = process.env.PORT || 8080;

// connect to our mongoDB database
// (uncomment after you enter in your own credentials in config/db.js)
mongoose.connect(db.url);

// get all data/stuff of the body (POST) parameters
// parse application/json
app.use(bodyParser.json());
// parse application/vnd.api+json as json
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// app.oauth = oauthServer({
// 	model: {},
// 	grants: ['password'],
// 	debug: true
// });

// override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(methodOverride('X-HTTP-Method-Override'));
// set the static files location /public/img will be /img for users
// app.use(express.static(__dirname + '/public'));

app.use(cookieParser());
// setting up express-session
app.use(expressSession({secret: 'mySecretKey'}));

// routes ==================================================
require('./app/routes.js')(app); // configure our routes
// start app ===============================================
// startup our app at http://localhost:8080
app.listen(port);

// shoutout to the user
console.log('Magic happens on port ' + port);

// expose app
exports = module.exports = app;
