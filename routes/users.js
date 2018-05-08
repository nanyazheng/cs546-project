var express = require('express');
var router = express.Router();
const userData = require("../data/user");

/* GET users listing. */
let loginMessage = undefined;
let registerMessage = undefined;
let users = {};
router.get('/', function(req, res, next) {
  res.locals.user = req.session.user || "";
  res.locals.message = loginMessage || "";
  req.session.firstNum = res.locals.firstNum = Math.round(Math.random() * 10);
  req.session.secondNum = res.locals.secondNum = Math.round(Math.random() * 10); 
  res.render('users');
});

router.get('/logout', function(req, res) {
  req.session.user = undefined;/// the fault
  res.redirect("back");
})


router.get('/login', function(req, res) {
  loginMessage = "";
  res.redirect('/');
})
router.post('/login', async function(req, res) {
  const {username, password, vSum} = req.body;
  if (+vSum !== req.session.firstNum + req.session.secondNum) {
    loginMessage = "wrong calculating code";
    res.redirect('/');
    return;
  }
  let result;
  //let user = await User.find().where("username").eq(username);  返回的是一个数组中对象
  try {
    result = await userData.getUser(username, password);
    if (result) {
      req.session.user = {username};
      loginMessage = undefined;
      res.redirect('/');
      return;
    }
  } catch (e) {
    loginMessage = "Invalid username or password";
    res.redirect('/');
    return;
  }
})
router.get('/register', function(req, res) {
  res.locals.message = registerMessage || "";
  res.render('regis');
})
router.post('/register', async function(req, res) {
  const {username, password, confirm} = req.body;
  let result;
  try {
    result = await userData.checkUser(username, password, confirm); //check and get the user
    registerMessage = "You have successfully registered";
  } catch (e) {
    registerMessage = e;
  }
  res.redirect('back');
})
function manager(req, res, next) {
  if (req.session.user && req.session.user.username == "admin") {
    next();
  } else {
    next(new Error("you dont have the authority to change the password"));
  }
}
router.get('/changepassword', function(req, res) {
  res.locals.user = req.session.user || "";
  res.render('changepassword');
})
router.post('/changepassword', manager, function(req, res) {
  const {username, new_password} = req.body;
  //console.log(users[username])
  if (username == "admin") {
    users[username].password = new_password;
  }
  //console.log(users[username])
})
module.exports = router;
