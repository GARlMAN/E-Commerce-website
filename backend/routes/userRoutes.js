const express = require("express");
const { registerUser, loginUser, logoutUser, getallUsers, forgotPassword, resetPassword, getUser, updatePassword, updateProfile,
    adminGetUserID, updateRole, deleteUser} = require("../controllers/userController");
const {isAuthenticatedUser, authorizeRoles} = require("../middlewear/authentication");
const router = express.Router();

//user routes
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logoutUser);
router.route("/forgot").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);
router.route("/me").get(isAuthenticatedUser, getUser);
router.route("/password/update").put(isAuthenticatedUser, updatePassword);
router.route("/me/update").put(isAuthenticatedUser, updateProfile);

//admin routes
router.route("/admin/users").get(isAuthenticatedUser, authorizeRoles("admin"), getallUsers);
router.route("/admin/user/:id").get(isAuthenticatedUser, authorizeRoles("admin"), adminGetUserID)
                                .put(isAuthenticatedUser, authorizeRoles("admin"), updateRole)
                                .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteUser);


module.exports = router;
