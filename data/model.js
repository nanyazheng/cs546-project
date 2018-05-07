const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/test");

const Schema = mongoose.Schema;

const User = mongoose.model("User", new Schema({
    username: {type: String, required: true},
    password: {type: String, required: true},
}));

module.exports = User;