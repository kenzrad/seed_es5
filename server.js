var express = require("express");
var app = express();
var PORT = process.env.PORT || 8080;
var db = require("./models");

// data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// static directory (public)
app.use(express.static("public"));

// routes
require("./routes/html-routes.js")(app);
require("./routes/seed-api-routes.js")(app);

// sync models and start express
//edit to "sync( { force: true} )..." to drop the tables upon initiliazation
db.sequelize.sync().then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});