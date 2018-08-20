const profileRoutes = require('./profile');
const formRoutes = require("./forms");
const path = require("path");
const dishRoute = require('./dish');
const checkOutRoutes = require("./check-out");
//register
var usersRouter = require('./users'); //user route js not yet
//
//back end not yet 

const constructorMethod = app => {
  //app.use("/result", resultRoutes);
  //register
  app.use("/", usersRouter); 
  //
  app.use("/see_menu", formRoutes);
  app.use("/profile", profileRoutes);
  app.use("/dish", dishRoute);
  app.use("/check-out", checkOutRoutes);

  app.use("*", (req, res) => {
    res.status(404).json({ error: "Page Not Found" });
  });
};

module.exports = constructorMethod;
