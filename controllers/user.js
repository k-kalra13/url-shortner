const {v4: uuidv4} = require("uuid")
const User = require('../models/user');
const {setUser} = require('../service/auth');
const { set } = require("mongoose");


async function handleUserSignup(req, res) {

    const {name, email, password} = req.body;
    await User.create({
        name,
        email, 
        password
    });
    return res.render("/");
}

async function handleUserLogin(req, res) {

    const { email, password} = req.body;
    const user = await User.findOne({
        email, 
        password
    });
    if(!user) return res.render("login",{
        error: "Invalid credentials"
    });

    const sessionID = uuidv4();
    setUser(sessionID, user);
    res.cookie("uid", sessionID);      // uid is the name of cookie and name can be anything
    return res.redirect("/");
}

module.exports = {
    handleUserSignup,
    handleUserLogin
};