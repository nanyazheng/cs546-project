//back end dishes js

const mongoCollections = require("../config/mongoCollections");
const dishes = mongoCollections.dishes;
const uuid = require("node-uuid");
const ObjectId = require('mongodb').ObjectId; 

const exportedMethods = {
    async addNewDish(name, category, price, description) {
        try {
            const dishCollection = await dishes();
            const newDish = {
                name: name,
                category: category,
                price: price,
                description: description
            };
            const newInsertInformation = await dishCollection.insertOne(newDish);
            return true;
        } catch (error) {
            throw `${error}`;
        }
    },

    async getDishByName(name) {
        try {
            const dishCollection = await dishes();
            const dish = await dishCollection.findOne({ name : name });
            if (!dish) {
                return undefined;
            }
            return dish;
        } catch (error) {
            throw `${error}`;
        }
    },

     async getAllDishes() {
        try {
            const dishCollection = await dishes();
            const dish = await dishCollection.find({}).toArray();
            return dish;
        } catch (error) {
            throw `${error}`;
        }
     },
  
     async getDishById(id) {
         try {
            const dishCollection = await dishes();
            const _id = ObjectId(id);
            const dish = await dishCollection.findOne({ _id : _id });
            if (!dish) {
                return null;
            }
            return dish;
         } catch (error) {
            throw `${error}`;
         }
     },

     async deleteDishById(id) {
         try {
            const dishCollection = await dishes();
            const _id = ObjectId(id);
            await dishCollection.removeOne({ _id : _id});
            return true;
         } catch (error) {
            throw `${error}`;
         }
     },

     async updateDish(updateDish) {
         try {
            const dishCollection = await dishes();
            const _id = ObjectId(updateDish.id);
           
            const updatedDishData = {};
            updatedDishData.name = updateDish.name;
            updatedDishData.category = updateDish.category;
            updatedDishData.price = updateDish.price;
            updatedDishData.description = updateDish.description;

            const query = {
                _id: _id
            };
            const updateCommand = {
                $set: updatedDishData
            };

            const updateInfo = await dishCollection.update(query, updateCommand);
            if (updateInfo.modifiedCount === 0) {
                throw `Could not update dish successfully`;
            }
            return true;
         } catch (error) {
            throw `${error}`;
         }
     }
}

module.exports = exportedMethods;