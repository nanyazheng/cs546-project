const dishData = require("./dish_lists");
const userPData = require("./user_profile");

//model.js - register not in 
//index.js - register not in
module.exports = {
  users: require("./users"),
  dishes: require("./dishes"),
  orders: require("./orders"),
  
  dish_lists: dishData,
  user_profile: userPData
};
