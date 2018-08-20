//back end user data.js

const bcrypt = require("bcrypt");
const saltRounds = 16;

const mongoCollections = require("../config/mongoCollections");
const users = mongoCollections.users;
const sessionId = mongoCollections.sessionId;
const uuid = require("node-uuid");

const exportedMethods = {
    async checkPassword(username, password) {
        try {
            let user = await this.findUserByUsername(username);
            let hashedPassword = user.password;
            if (user && await bcrypt.compare(password, hashedPassword)) {
                return true;
            } else {
                return false;
            }
        } catch (error) {
            return false;
        }
    },

    async findUserByUsername(username) {
        try {
            const userCollection = await users();
            const user = await userCollection.findOne({username : username});

            if (!user) {
                return undefined;
            }
            return user;
        } catch (error) {
            throw `${error}`;
        }
    },

    async addNewUser(username, password) {
        try {
            const userCollection = await users();
            const user = await this.findUserByUsername(username);
            if (!user) {
                let hashedPassword = await bcrypt.hash(password, saltRounds);
                const newUser = {
                    username : username,
                    password : hashedPassword
                };
                const newInsertInformation = await userCollection.insertOne(newUser);
                return true;
            } else {
                return false;
            }
        } catch(error) {
            throw `${error}`;
        }
    },

    async addSessionId(username, ID) {
        try {
            const userCollection = await users();
            const user = await this.findUserByUsername(username);
            const sessionIdCollection = await sessionId();
            if (user !== undefined) {
                const newId = {
                    sessionId : ID,
                    username : username
                }
                const newInsertInformation = await sessionIdCollection.insertOne(newId);
                return true;
            } else {
                return false;
            }
        } catch (error) {
            return false;
        }
    },

    async removeSessionId(ID) {
        try {
            const sessionIdCollection = await sessionId();
            let session = await sessionIdCollection.findOne({sessionId : ID});
            const deleteInfo = await sessionIdCollection.remove({username : session.username});
            return true;
        } catch (error) {
            throw `${error}`;
        }
    },

    async getUserBySessionId(ID) {
        try {
            const sessionIdCollection = await sessionId();
            let session = await sessionIdCollection.findOne({sessionId : ID});
            let username = session.username;
            let user = await this.findUserByUsername(username);
            return user;
        } catch (error) {
            throw `${error}`;
        }
    }

}
module.exports = exportedMethods;