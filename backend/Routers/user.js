const express = require("express");
const { getUserById, getUser, updateUser } = require("../Controllers/user");
const { isLoggedIn, isAuthenticated } = require("../Controllers/auth");
const router = express.Router();

router.param("userId",getUserById);
router.get("/user/:userId",getUser);
router.put("/user/:userId/update",isLoggedIn,isAuthenticated,updateUser);

module.exports = router;