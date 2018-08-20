//back end order js

const mongoCollections = require("../config/mongoCollections");
const orders = mongoCollections.orders;

const exportedMethods = {
    async getAllOrders() {
        try {
            const orderCollection = await orders();
            const orders = orders.find({}).toArray();
            return orders;
        } catch (error) {
            throw `${error}`;
        }
    },

    async deleteDishById(id) {
        try {
           const orderCollection = await orders();
           const _id = ObjectId(id);
           await orderCollection.removeOne({ _id : _id});
           return true;
        } catch (error) {
           throw `${error}`;
        }
    }

}

module.exports = exportedMethods;