var express = require('express');
var router = express.Router();
const userData = require("../data/user");
const xss = require('xss');

/* GET users listing. */
let loginMessage = undefined;
let registerMessage = undefined;
let adminMessage = undefined;
let users = {};

// router.get('/', function(req, res, next) {
//   res.render('reg/index', { title: 'Express' });
// });

router.get('/', async function (req, res, next) {
  console.log(req.session.user);
  res.locals.user = req.session.user || "";
  res.locals.message = loginMessage || "";
  req.session.firstNum = res.locals.firstNum = Math.round(Math.random() * 10);
  req.session.secondNum = res.locals.secondNum = Math.round(Math.random() * 10);
  res.render('reg/users');
});

router.get('/logout', function (req, res) {
  req.session.user = undefined;/// the fault
  loginMessage = undefined;
  res.redirect('/');
})


router.get('/login', function (req, res) {
  loginMessage = "";
  res.redirect('/');
})
router.post('/login', async function (req, res) {
  const username = xss(req.body.username);
  const password = xss(req.body.password);
  const vSum = xss(req.body.vSum);

  if (+vSum !== req.session.firstNum + req.session.secondNum) {
    loginMessage = "Verfication Failed, Check your math";
    res.redirect('/');
    return;
  }
  let result;
  let admin;// new
  //let user = await User.find().where("username").eq(username);  返回的是一个数组中对象
  try {
    result = await userData.getUser(username, password);
    if (result) {
      req.session.user = { username };
      if (result.last_time_login) {
        loginMessage = "signup_time: " + result.signup_time + "\n" + " last_time_login: " + result.last_time_login;
      } else {
        loginMessage = "signup_time: " + result.signup_time;
      }
      //new added feature. admin jump. not complete
      if (!result.admin) {
        res.redirect('/see_menu');
      } else {
        res.redirect('/private');
      }
      //
      return;
    }
  } catch (e) {
    loginMessage = e;
    res.redirect('/');
    return;
  }
})
router.get('/register', function (req, res) {
  res.locals.message = registerMessage || "";
  res.render('reg/regis');
})

router.post('/register', async function (req, res) {
  const username = xss(req.body.username);
  const password = xss(req.body.password);
  const confirm = xss(req.body.confirm);
  const email = xss(req.body.email);
  const firstname = xss(req.body.firstname);
  const lastname = xss(req.body.lastname);
  const question = xss(req.body.question);
  const answer = xss(req.body.answer);
  let result;
  if (/^admin\d+$/.test(username)) {
    registerMessage = "You are not allowed to sign up your username starting with'admin'";
    res.redirect('back');
    return;
  }
  try {
    result = await userData.checkUser(username, password, confirm, email, firstname, lastname,question, answer); //check and get the user
    loginMessage = `${username}` + " Successfully registered, please log in";
    res.redirect('/');
  } catch (e) {
    registerMessage = e;
    res.redirect('back');
  }
  
})
// function manager(req, res, next) {
//   if (req.session.user && req.session.user.username == "admin") {
//     next();
//   } else {
//     next(new Error("you dont have the authority to change the password"));
//   }
// }
router.get('/changepassword', function (req, res) {
  res.locals.user = req.session.user || "";
  res.render('reg/changepassword');
})
router.post('/changepassword', async function (req, res) {
  let message;
  const username = xss(req.body.username);
  const password = xss(req.body.password);
  const new_password = xss(req.body.new_password);
  const confirm = xss(req.body.confirm);
  const question = xss(req.body.question);
  const answer = xss(req.body.answer);
  try {
    const user = await userData.getUser(username, password);//get user data
    if (user) {
      if (new_password !== confirm) {
        message = {
          error: "Your confirm password is different from your password"
        }
        res.render('reg/changepassword', message);
        return;
      }
      if (user.question !== question || user.answer !== answer) {
        message = {
          error: "Please check your question or answer! Not Right"
        }
        res.render('reg/changepassword', message);
        return;
      }
      await userData.updateUser(username, new_password);
      req.session.user = "";
      loginMessage = "You changed the password successfully";
      res.redirect('/');
    }  
  }
  catch (e) {
    message = {
      message: e
    }
    res.render("changepassword", message)
  }
})
router.get('/private', function(req, res) {
  let user = req.session.user;

  if (!req.session.user){
    res.redirect('/');
  }
  else if(!user || !(/^admin\d*$/.test(user.username))){
    res.redirect("/see_menu");
    return;
} else {
  console.log(user);
  res.render('reg/admin', {
    user: req.session.user
  });}
})
router.get('/adminRegister', function(req, res) {
  let user = req.session.user.username;

  if(!user || !(/^admin\d*$/.test(user))){
      res.redirect("/see_menu");
      return;
  }
  res.locals.message = adminMessage || "";
  res.locals.user = req.session.user || "";
  res.render('reg/adminRegister');
})

router.post('/adminRegister', async function(req, res) {
  console.log("000");
  const username = xss(req.body.username);
  const password = xss(req.body.password);
  const confirm = xss(req.body.confirm);
  const question = xss(req.body.question);
  const answer = xss(req.body.answer);
  console.log(username, password, confirm, question, answer);
  let result;
  try {
    console.log('111');
    result = await userData.checkAdmin(username, password, confirm, question, answer); //check and get the user
    loginMessage = `${username}` + " Successfully registered, please log in";
    res.redirect('/');
  } catch (e) {
    console.log("999");
    adminMessage = e;
    res.redirect('back');
  }
})

module.exports = router;
