const express = require("express");
const router = express.Router();
const data = require("../data/");
const userPData = data.user_profile;


router.get("/", async (req, res) => {
	try {
		
		const sUname = req.session.user.username;//session Username
		console.log(sUname);
		let userInfo = await userPData.getUserInfo(sUname);
		
		// console.log(user.username);
		res.render("forms/profile", {
			title: "Food Order",
			data: userInfo,
			user: req.session.user
		});
	} catch (e) {
		res.status(404).json({ error: "No users in DB"});
	}
});

module.exports = router;