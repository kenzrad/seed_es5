var db = require('../models');

module.exports = function(app) {

  //GET route for getting all the cart info
  app.get("/api/cart", function(req, res) {
    db.Cart.findAll({
      include: [db.Seed]
    }).then(function(dbCart) {
      console.log(JSON.stringify(dbCart));
      res.json(dbCart);
    });
  });

  //GET route for getting all the cart info
  app.get("/api/cart/:category/:id", function(req, res) {
    db.Cart.findAll({
      where: {
        category: req.params.category,
        id: {$not: req.params.id }
      },
      include: [db.Seed]
    }).then(function(dbCart) {
      console.log(JSON.stringify(dbCart));
      res.json(dbCart);
    });
  });

  // POST route for saving a new item to shopping cart
  app.post("/api/cart", function(req, res) {
    db.Cart.create(req.body).then(function(dbCart) {
      res.json(dbCart);
    });
  });

  // DELETE route for deleting item from shopping cart
  app.delete("/api/cart/:id", function(req, res) {
    db.Cart.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbCart) {
      res.json(dbCart);
    });
  });

  // PUT route for updating item in shopping cart
  app.put("/api/cart", function(req, res) {
    db.Cart.update(
      req.body,
      {
        where: {
          id: req.body.id
        }
      }).then(function(dbCart) {
      res.json(dbCart);
    });
  });

    
};