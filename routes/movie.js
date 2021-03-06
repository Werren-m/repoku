const { Router } = require("express");
const router = Router();
const { uploadMovie } = require("../middlewares/multer");
const auth = require("../middlewares/auth");
const { paginatedResults } = require("../middlewares/pagination");
const { Movies } = require("../models");

const MoviesController = require("../controllers/movie");

router.get("/", paginatedResults(Movies), MoviesController.getMoviesPaging);
router.post(
	"/addMovie",
	auth.authentication,
	uploadMovie.fields([{ name: "poster" }, { name: "backdrop" }]),
	MoviesController.addMovie
);

router.get("/getSingleMovie",  MoviesController.getSingleMovie);
router.put("/editMovie", auth.authentication, MoviesController.editMovie);
router.get("/editMovie", auth.authentication, MoviesController.editFormMovie);
router.put("/editMovie/image", auth.authentication,uploadMovie.fields([{ name: "poster" }, { name: "backdrop" }]), MoviesController.editMovieImage);
router.delete("/", auth.authentication, MoviesController.deleteMovie);

module.exports = router;
