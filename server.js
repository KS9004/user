const express = require('express');
const bodyParser = require('body-parser');

// create express app
const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())
// Configuring the database
const dbConfig = require('./config/development.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Connecting to the database
const  options = {
useNewUrlParser:  true,
useUnifiedTopology:  true
};

// Connect MongoDB Atlas using mongoose connect method
mongoose.connect(dbConfig.uri, options).then(() => {
console.log("Database connection established!");
},
err  => {
{
console.log("Error connecting Database instance due to:", err);
}
});

// define a simple route
app.get('/', (req, res) => {
   res.json({"message": "Welcome to iamsaurabh application. Created by IT Saurabh"});
});
require('./app/routes/book.routes.js')(app);
require('./app/routes/user.routes.js')(app);
// listen for requests
app.listen(3000, () => {
   console.log("Server is listening on port 3000");
});