const express = require("express");
const dishData = require("../data/dishes");
const router = express.Router();
var xss = require("xss");

router.get("/add", async (req, res) => {
    let user = req.session.user;

    if(!user || !(/^admin\d*$/.test(user.username))){
        res.redirect("/see_menu");
        return;
    }
	var data = { 
        title: "Add New Dish",
    user: req.session.user };
    res.render("adddish", data);
});

router.get("/all", async (req, res) => {
	try {
        let user = req.session.user;

        if(!user || !(/^admin\d*$/.test(user.username))){
            res.redirect("/see_menu");
            return;
        }
        dishes = await dishData.getAllDishes();
        var data = {
            title: "Dish List",
            dishes: dishes,
            user: req.session.user             
        }
    } catch (error) {
        throw `${error}`;
    }
	res.render("dishesList", data);
});

router.post("/", async (req, res) => {
    name = xss(req.body.name);
    category = xss(req.body.category);
    price = xss(req.body.price);
    description = xss(req.body.description);

    let success = false;
    try {
        success = await dishData.addNewDish(name, category, price, description);
    } catch (error) {
        throw `${error}`;
    }

    if (success) {
        let data = {
            title : "Add New Dish",
            info : "Successfully add a dish."
        };
        res.render("adddish", data);
    } else {
        let data = {
            title : "Add New Dish",
            info : "Failed to add a new dish."
        }
        res.render("adddish", data);
    }

});

router.get("/:id", async (req, res) => {
    let user = req.session.user;

    if(!user || !(/^admin\d*$/.test(user.username))){
        res.redirect("/see_menu");
        return;
    }

    let id = xss(req.params.id);

    try {

        const dish = await dishData.getDishById(id);
        var data = { 
            title : "Dish Detail",
            dish : dish,
            user: req.session.user
         };
    } catch (error) {
        throw `${error}`;
    }
    res.render("dishDetail", data);
});

router.post("/delete", async (req, res) => {
    let user = req.session.user;

    if(!user || !(/^admin\d*$/.test(user.username))){
        res.redirect("/see_menu");
        return;
    }


    let id = xss(req.body.dishid);
    let success = false;
    try {
        success = await  dishData.deleteDishById(id);
        res.redirect("/dish/all");
    } catch (error) {
        throw `${error}`;
    }
});

router.post("/modify", async (req, res) => {

    let user = req.session.user;

    if(!user || !(/^admin\d*$/.test(user.username))){
        res.redirect("/see_menu");
        return;
    }

    let id = xss(req.body.dishid);
    let name = xss(req.body.dishname);
    let category = xss(req.body.dishcategory);
    let price = xss(req.body.dishprice);
    let description = xss(req.body.dishdescription);

    var data = {
        title : "Dish Modify",
        id : id,
        name : name,
        category : category,
        price : price,
        description : description,
        user:req.session.user
    };
    res.render("dishModify", data);
});

router.post("/modify/:id", async (req, res) => {

    let user = req.session.user;

    if(!user || !(/^admin\d*$/.test(user.username))){
        res.redirect("/see_menu");
        return;
    }

    let id = xss(req.params.id);
    let name = xss(req.body.name);
    let category = xss(req.body.category);
    let price = xss(req.body.price);
    let description = xss(req.body.description);

    let success = false;
    const updateDish = {
        id : id,
        name : name,
        category : category,
        price : price,
        description : description
    }
    try {
        success = await dishData.updateDish(updateDish);
        let str = "/dish/" + id;
        res.redirect(str);
    } catch (error) {
        throw `${error}`;
    }
});

module.exports = router;