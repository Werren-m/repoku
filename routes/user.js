const { Router } = require("express");
const router = Router();
const auth = require("../middlewares/auth");
const { uploadUser } = require("../middlewares/multer");

const UserController = require("../controllers/user");

router.get("/alluser",UserController.getAllUser);
router.get("/", auth.authentication, UserController.getUser);
router.delete("/", auth.authentication, UserController.deleteUser);
router.get("/edit/", auth.authentication, UserController.getUserDetails);
router.put(
	"/edit/",
	uploadUser.single("image"),
	auth.authentication,
	UserController.updateUser
);

module.exports = router;
