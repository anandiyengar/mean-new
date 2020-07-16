const express = require("express");
const router = express.Router();
const { check,validationResult } = require("express-validator");
const { loginUser, registerUser, logoutUser } = require("../Controllers/auth");

router.post("/login",[
    check("email").isEmail().withMessage("Email is not formatted properly."),
    check("password").isLength({min:2}).withMessage("Password is required.")
],loginUser);
router.post("/register",[
    check("name").isLength({min:1}).withMessage("Name should be more than 1 letter."),
    check("email").isEmail().withMessage("Email should be properly formatted."),
    check("password").isLength({min:6}).withMessage("Password should be atleast 6 characters.")
],registerUser);
router.post("/logout",logoutUser);

module.exports = router;