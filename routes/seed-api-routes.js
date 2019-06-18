var db = require('../models');

module.exports = function(app) {
    
  //getting all products data from "seed"
  app.get("/api/products", function(req, res) {
    db.Seed.findAll({
      include: [db.Cart]
    }).then(function(dbSeed) {
      res.json(dbSeed);
    });
  });

  //getting all products from a given category from "seed"
  app.get("/api/products/:category", function(req, res) {
    db.Seed.findAll({
      where: {
        category: req.params.category
      }
    }).then(function(dbSeed) {
      res.json(dbSeed);
    });
  });
};