// ==============================================================================
// DEPENDENCIES
// Series of npm packages that we will use to give our server useful functionality
// ==============================================================================

var express = require("express");

// ==============================================================================
// EXPRESS CONFIGURATION
// This sets up the basic properties for our express server
// ==============================================================================

// Tells node that we are creating an "express" server
var app = express();

// Sets an initial port.
var PORT = process.env.PORT || 8083;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//setup public folder for images, js, css
app.use(express.static("public"));

//ROUTES

//API
// require("./routes/apiRoutes")(app);

// HTML
require("./routes/htmlRoutes")(app);

// =============================================================================
// LISTENER
// The below code effectively "starts" our server
// =============================================================================

app.listen(PORT, function () {
  console.log("App listening on PORT: " + PORT);
});
