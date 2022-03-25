// const express = require('express')

// const app = express()
// require('./database')
// // app.use(require('./routes/index.routes'))
// app.listen(3000);
// console.log('server on port', 3000)

const express = require("express");

const routes = require("./routes");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://mongo/restapi", {
  useNewUrlParser: true,
});
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", routes());
app.listen(3000);