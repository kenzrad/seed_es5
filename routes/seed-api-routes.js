var db = require('../models');

module.exports = function(app) {
    
    //getting all products data from "seed"
    app.get("/api/products", function(req, res) {
        db.Seed.findAll().then(function(dbSeed) {
            console.log(JSON.stringify(dbSeed));
            res.json(dbSeed);
        });
    });

    //getting all products from a given category from "seed"
    app.get("/api/products/:category", function(req, res) {
        var query = {};
        if (req.query.category) {
          query.category = req.query.category;
        }
        db.findAll({
          where: query
        }).then(function(dbSeed) {
          res.json(dbSeed);
        });
    });
};