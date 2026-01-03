const { getUser } = require("../service/auth");


async function restrictToLoggedinUserOnly(req, res, next) {
    // console.log(req);
    const userUid = req.cookies?.uid;  // uid is the name of cookie we set during login, we used ? to avoid error if cookie is undefined 

    if(!userUid) return res.redirect("/login");
    const user = getUser(userUid);  // get user details from in-memory store using uid from cookie

    if(!user) return res.redirect("/login");

    req.user = user;  // attach user details to request object for further use
    next();
}

async function checkAuth(req, res, next) {
    const userUid = req.cookies?.uid;  // uid is the name of cookie we set during login, we used ? to avoid error if cookie is undefined 

    const user = getUser(userUid);  // get user details from in-memory store using uid from cookie


    req.user = user;  // attach user details to request object for further use
    next();
}

module.exports = { restrictToLoggedinUserOnly, checkAuth };