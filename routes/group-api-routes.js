var db = require("../models");

module.exports = function(app) {
  app.get("/api/Group", function(req, res) {
    db.Group.findAll({
      include: [db.Seed]
    }).then(function(dbGroup) {
      console.log(dbGroup);
      res.json(dbGroup);
    });
  });
};


