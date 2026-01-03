const express = require("express");
const URL = require("../models/url");

const router = express.Router();

router.get("/", async (req, res) => {
    if(!req.user) return res.redirect("/login");  // if user is not logged in, redirect to login page

    const allurls = await URL.find({ createdBy: req.user._id });  // fetch all urls created by the logged-in user
    res.render("home", { urls: allurls });
});

router.get('/signup', (req,res)=>{
    res.render("signup");
})

router.get('/login', (req,res)=>{
    res.render("login");
})

module.exports = router;
