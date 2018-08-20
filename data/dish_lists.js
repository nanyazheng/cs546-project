const mongoCollections = require("../config/mongoCollections");
const dish_lists = mongoCollections.dish_menu;
//const uuid = require("node-uuid");

const exportedMethods = {
  async getAllDishes() {
    const dishCollection = await dish_lists();
    return await dishCollection.find({}).toArray();
  }  /*remember to add ,*/


};

module.exports = exportedMethods;
