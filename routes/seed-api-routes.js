var db = require('../models');

module.exports = function(app) {
    
    //getting all products data from "seed"

    app.get("/api/products", function(req, res) {
      var query = {};
      if (req.params.category) {
        query.category = req.params.category;
      }
      console.log(query);
        db.Seed.findAll({
          where: query,
          include: [db.Cart]
        }).then(function(dbSeed) {
            console.log("we in here");
            res.json(dbSeed);
        });
    });

    //getting all products from a given category from "seed"
    app.get("/api/products/:category", function(req, res) {
      db.findAll({
        where: {
          category: req.params.category
        }
      }).then(function(dbSeed) {
        console.log("we out here");
        res.json(dbSeed);
      });
    });
};