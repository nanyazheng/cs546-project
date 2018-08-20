//register js

const User = require('./model');
const bcrypt = require('bcrypt');
let saltRounds = 16;

async function getUser(username, password) {
    if (!username || !password) {
        throw ("invalid username or password");
        return;
    }
    let user = await User.findOne({ username: username });
    if (user && user.username == username && await bcrypt.compare(password, user.password)) {
        user.last_time_login = user.login_time;
        //let last_time_logout = user.logout_time;
        user.login_time = Date.now();
        await user.save();
        return user;
    }
    throw ("invalid username or password");
}
//async function checkUser(username, password)

async function checkUser(username, password, confirm, email, firstname, lastname, question, answer) {
    // let message = undefined;
    let admin = false;
    if (!username || !password) {
        throw ("invalid username or password");
        return;
    }
    // 是否需要判断username的长度，需要考虑考admin
    let user = await User.findOne({ username: username });
    if (user && user.username == username) {
        // message = "This user name already exists";
        throw ("This user name already exists");
        return;
    }
    if (password !== confirm) {
        throw ("Your confirm is different from your password");
        return;
    }
    if (!(/^[a-z]\w+@stevens.edu$/.test(email))) {
        throw ("Your need to enter your stevens.edu email")
        return;
    }
    //security issue ---------------
    if ((/^admin/).test(username)) {
        admin = true;
    } 
    // -----------------------
    //add user
    
    let hashPassword = await bcrypt.hash(password, saltRounds);
    let newUser = new User({
        username: username,
        password: hashPassword,
        email: email,
        firstname: firstname,
        lastname: lastname,
        question: question,
        answer: answer,
        signup_time: Date.now(),
        admin: admin
    });
    await newUser.save();
    return username;
}

async function updateUser(username, new_password) {
    if (!username || !new_password) {
        throw ("Invalid username or password");
        return;
    }
    //update
    let hashPassword = await bcrypt.hash(new_password, saltRounds);
    await User.findOneAndUpdate({ username: username }, { password: hashPassword });
    let u = await User.findOne({username: username});
    console.log(u);
    return;
}

async function checkAdmin(username, password, confirm, question, answer) {
    let admin = true;
    console.log("222");
    if (!username || !password) {
        throw ("invalid admin or password");
        return;
    }
    // 是否需要判断username的长度，需要考虑考admin
    let user = await User.findOne({ username: username });
    if (user && user.username == username) {
    console.log("333");        
        // message = "This user name already exists";
        throw ("This admin already exists");
        return;
    }
    if (password !== confirm) {
        throw ("Your confirm is different from your password");
        return;
    }
    let hashPassword = await bcrypt.hash(password, saltRounds);
    let newUser = new User({
        username: username,
        password: hashPassword,
        question: question,
        answer: answer,
        admin: admin
    });
    await newUser.save();
    console.log(newUser);
    return username;
}

module.exports = {
    checkUser,
    getUser,
    updateUser,
    checkAdmin
}