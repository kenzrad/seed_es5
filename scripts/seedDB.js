//Some ES6 syntax in here
var db = require("../models");
var fs = require("fs");
var csv = require("csv-parser");

var groupData = [];
var seedData = [];

db.sequelize.sync({ force: true }).then(function() {
  fs.createReadStream(__dirname + "/data/groups.csv")  
  .pipe(csv())
  .on('data', (row) => {
    groupData.push(row);
  })
  .on('end', () => {
    db.Group.bulkCreate(groupData).then(createSeeds);
});
})

function createSeeds() {
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
}
