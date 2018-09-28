//Require modules
var express = require("express");
var mongoose = require("mongoose");
var expressHandlebars = require("express-handlebars");
var bodyParser = require("body-parser");


//Port setup- either Heroku port/whatever designated port by the process.env file
//or port 3000 for local setups with no .env file
var PORT = process.env.PORT || 3000;

//EXPRESS SETUP

//instantiate express app
var app = express();

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static(__dirname + "/public"));
// app.use(express.static("public")); // experiment
// app.set('views', __dirname + '\\public\\views'); // experiment

//set up express router
var router = express.Router();

// Require our routes file and pass it the router object as an argument
require("./config/routes")(router);


//Connect Handlebars to express app
app.engine("handlebars", expressHandlebars({
  defaultLayout: "main"
}));
app.set("view engine", "handlebars");

//BODY-PARSER STANDARD SETUP WITH EXPRESS
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

//Send requests through Router middleware
app.use(router);

// If deployed, use the deployed database, otherwise use the local mongoHeadlines database
var db = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

//Connect mongoose to database defined above
mongoose.connect(db, function(error) {
  //if there are any errors connecting, log them
  if (error) {
    console.log(error);
  } 
  //else log success connecting message
  else {
    console.log("mongoose successfully connected to database");  
  }
});

// START LISTENER - begin listening to client requests
app.listen(PORT, function() {
    // Log (server-side) when our server has started
    console.log("Server listening on port: " + PORT);
  });




