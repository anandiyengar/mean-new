const express = require("express");
const { check,validationResult } = require("express-validator");
const { getUserById } = require("../Controllers/user");
const { getPostById, getAllPosts, getPost, createPost, updatePost, delPost,photo, getMyPosts, csv } = require("../Controllers/posts");
const { isLoggedIn, isAuthenticated } = require("../Controllers/auth");
const router = express.Router();

router.param("userId",getUserById);
router.param("postId",getPostById);
router.get("/posts",getAllPosts);
router.get("/post/:postId",getPost);
router.get("/post/my/:userId",isLoggedIn,isAuthenticated,getMyPosts);
router.post("/post/create/:userId",isLoggedIn,isAuthenticated,createPost);
router.put("/post/update/:postId/:userId",isLoggedIn,isAuthenticated,updatePost);
router.delete("/post/delete/:postId/:userId",isLoggedIn,isAuthenticated,delPost);
router.get("/post/photo/:postId", photo);
router.post("/csv/",csv);


module.exports = router;