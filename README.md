# seed_es5
SEED Storefront using ES5 Syntax

## Business requirements:

* Build a product detail page
* Must display product information and at least one image
* Must display an original price and sale price
* Must show current availability
* Must have an add to cart function with an indication that item is added to your cart
* Must have a recommendation for similar products


## Technical requirements:

* Must use jQuery or ES5 for all DOM manipulation
*  Must be responsive
* Must make at least one ajax request


# #How to Run This App (in the dev environment)

1. Set up a the MySQL Database as per schema.sql
2. Run `npm install` to install requirements (see package.json)
3. Check the `config.json` file to make sure your development database is set up to match your local database password/db name/etc.
4. Run `node server.js` to set up the tables in your database, and then kill the server
5. Run `npm run seed` to populate the tables with data
6. Run `node server.js` again to startup the server
7. Now the app is ready to run!! Open it up in your browser by typing in `Localhost:####`(replace the numbers with whatever port # your server is connected to, as indicated in your terminal)
