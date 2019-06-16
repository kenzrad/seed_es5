//Some ES6 syntax in here on the back-end to take in the csv data set, parse it to an object, and then bulk-create the product table
var db = require("../models");
var fs = require("fs");
var csv = require("csv-parser");

var seedData = [];

db.sequelize.sync({ force: true }).then(function() {
  fs.createReadStream(__dirname + "/data/seeds.csv")  
  .pipe(csv())
  .on('data', (row) => {
    seedData.push(row);
  })
  .on('end', () => {
    db.Seed.bulkCreate(seedData).then(seedData => {
    console.log(seedData)
    });
  });
});