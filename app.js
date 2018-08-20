const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const static = express.static(__dirname + "/public");
//register
var createError = require('http-errors');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');
//
const configRoutes = require("./routes");
const exphbs = require("express-handlebars");

//Register
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//app.use(sessionMiddleware);
//
app.use("/public", static);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

//sessionmiddleware
const sessionMiddleware = session({
  // store: new fileStore(),
  secret: "cs546",
  cookie: {maxAge: 6000000}
})
app.use(sessionMiddleware);

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

configRoutes(app);


app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log("Your routes will be running on http://localhost:3000");
});
