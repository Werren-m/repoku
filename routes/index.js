const { Router } = require("express");
const UserController = require("../controllers/user");
const MovieController = require("../controllers/movie");
const userRoutes = require("./user");
const movieRoutes = require("./movie");
const reviewRoutes = require("./review");
const { uploadUser } = require("../middlewares/multer");

const router = Router();

router.get("/", MovieController.getMovies);
router.post("/register", uploadUser.single("image"), UserController.register);
router.post("/login", UserController.login);
router.get("/titlesearch", MovieController.searchByTitle);
router.get("/categorysearch", MovieController.searchByCategory);

router.use("/user", userRoutes);
router.use("/movie", movieRoutes);
router.use("/review", reviewRoutes);

module.exports = router;
