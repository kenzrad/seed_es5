var db = require('../models');

module.exports = function(app) {
    app.post("/api/Seed", function(req, res) {
        db.Seed.create(req.body).then(function(dbSeed) {
            res.json(dbSeed);
        });
    });

    app.get("/api/Seed", function(req, res) {
        db.Seed.findAll({ 
            include: [db.Group]
        }).then(function(dbSeed) {
          console.log(dbSeed);
          res.json(dbSeed);
        });
    });

    app.get("/api/Seed/:seedGroup", function(req, res) {
        db.Seed.findAll({
            attributes: [seedGroup]
        }).then(function(dbSeed) {
          console.log(dbSeed);
          res.json(dbSeed);
        });
    });

    app.delete("/api/Seed/:id", function(req, res) {
        db.Seed.destroy({ where: { id: req.params.id } }).then(function(dbSeed) {
            res.json(dbSeed);
        });
    });
};