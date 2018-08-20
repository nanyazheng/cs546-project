const express = require("express");
const router = express.Router();
const data = require("../data/");
const dishData = data.dish_lists;
const userPData = data.user_profile;
const cartData = data.cart_checkout;
const orderData = data.orders;

router.get("/", async (req, res) => {
	try {
		//const dishes = await dishData.getAllDishes(); should use sessionStorage

		res.render("shop/checkout", {
			title: "Check Out",
			user: req.session.user
		});
	} catch (e) {
		res.status(404).json({ error: "No orders in DB"});
	}
});

router.post("/", async (req, res) => {
	try {
		let username = req.session.user.username;
		//let username = "uup";
		let total_amount = req.body.total_price;
		let order = req.body.order;
		await orderData.placeNewOrder(username, order, total_amount);
		res.redirect("see_menu");
	} catch (error) {
		console.log(error);
	}
});
module.exports = router;