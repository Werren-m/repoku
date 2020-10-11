const { Router } = require("express");
const router = Router();
const auth = require("../middlewares/auth");
const ReviewController = require("../controllers/review");

router.get("/", auth.authentication, ReviewController.getReview);
router.post("/", auth.authentication, ReviewController.addReview);
router.delete("/", auth.authentication, ReviewController.deleteReview);
router.put("/", auth.authentication, ReviewController.updateReview);
router.put("/visible", auth.authentication, ReviewController.setVisibles)
router.get("/rating",  ReviewController.updateRating)
router.get("/allreviews", ReviewController.getReviews)

module.exports = router;
