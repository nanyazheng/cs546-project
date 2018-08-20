const express = require("express");
const router = express.Router();
const data = require("../data/");
const dishData = data.dish_lists;


router.get("/", async (req, res) => {
	try {
		const dishes = await dishData.getAllDishes();
		

		res.render("forms/index", {
			title: "Food Order",
			data: dishes,
			user: req.session.user
		});
	} catch (e) {
		res.status(404).json({ error: "No dishes in DB"});
	}
});

module.exports = router;