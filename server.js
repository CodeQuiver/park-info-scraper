//Require modules
var express = require("express");
var exphbs = require("express-handlebars");
var bodyParser = require("body-parser");

//Port setup- either Heroku port/whatever designated port by the process.env file
//or port 3000 for local setups with no .env file
var PORT = process.env.PORT || 3000;

//EXPRESS SETUP
var app = express(); //instantiate app
var router = express.Router(); //set up router

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static(__dirname + "public"));

// Connect Handlebars and express
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//BODY-PARSER STANDARD SETUP WITH EXPRESS
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//Send requests through Router middleware
app.use(router);


// START LISTENER - begin listening to client requests
app.listen(PORT, function() {
    // Log (server-side) when our server has started
    console.log("Server listening on: http://localhost:" + PORT);
  });