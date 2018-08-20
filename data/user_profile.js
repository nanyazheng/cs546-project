const mongoCollections = require("../config/mongoCollections");
const user_profiles = mongoCollections.user_profile;
//const uuid = require("node-uuid");

const exportedMethods = {

  async getUserInfo(username) {
    const profileCollection = await user_profiles();
    const user_profile = await profileCollection.findOne({ username: username });

    if (!username) throw "username not found!";
    return user_profile;
  }

};

module.exports = exportedMethods;
