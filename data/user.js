const User = require('./model');

async function getUser(username, password) {
    if (!username || !password) {
        throw ("invalid username or password");
        return;
    }
    let user = await User.findOne({username: username});
    if (user && user.username == username && user.password == password) {
        return username;
    } 
    throw ("invalid username or password");
}

async function checkUser(username, password, confirm) {
    // let message = undefined;
    if (!username || !password) {
        throw ("invalid username or password");
        return;
    } 
    // 是否需要判断username的长度，需要考虑考admin
    let user = await User.findOne({username: username});
    if (user && user.username == username) {
       // message = "This user name already exists";
        throw ("This user name already exists");
        return;
    }
    if (password !== confirm) {
        throw ("Your confirm is different from your password");
        return;
    }
    let newUser = new User({
        username: username,
        password: password
    });
    await newUser.save();
    return username;
}

module.exports = {
    checkUser,
    getUser
}