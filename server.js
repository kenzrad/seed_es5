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
require("./routes/group-api-routes.js")(app);
require("./routes/seed-api-routes.js")(app);

// sync models and start express
db.sequelize.sync({ force: true }).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});