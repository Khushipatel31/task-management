const express=require("express");
const userController = require('../controllers/userController.js');
const{authorizeRoles,isAuthenticatedUser,verify} =require ("../middleware/auth.js");
const router=express.Router();

router.route("/admin/verify").get(isAuthenticatedUser,authorizeRoles("admin"),verify);
router.route("/user/verify").get(isAuthenticatedUser,authorizeRoles("user"),verify);
router.route("/register").post(userController.registerUser);
router.route("/login").post(userController.loginUser);
router.route("/logout").get(isAuthenticatedUser,userController.logOut);

module.exports=router;