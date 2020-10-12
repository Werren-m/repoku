const { reviews, user, Movies } = require("../models/");
const Sequelize = require("sequelize");

class ReviewController {

	static async setVisibles(req,res){
		const userId = req.userData.id;
		const { MovieId } = req.query;
		const {isVisible} = req.body;
		reviews
			.update(
				{
					isVisible
				},
				{
					where: {
						userId,
						MovieId,
					},
				}
			)
		.then((results) => res.status(200).json(results))
		.catch((err) => res.status(500).json({msg: err.errors[0].message}))
	}

	static async getReviews(req, res) {
		reviews
			.findAll({include: [user, Movies]})
			.then((reviews) => res.status(200).json(reviews))
			.catch((err) => res.status(500).json({msg: err.errors[0].message}));
	}


	static async getReview(req, res) {
		const userId = req.userData.id;
		try {
			const found = await reviews.findAll({
				where: { userId },
				include: [user, Movies],
			});
			if (found) {
				res.status(200).json(found);
			} else {
				res.status(404).json({ msg: "review not found" });
			}
		} catch {
			res.status(500).json({ msg: "Internal Server Error" });
		}
	}
	
	static async getUserReview(req, res) {
		const userId = req.userData.id;
		try {
			const found = await reviews.findOne({
				where: { userId },
				include: [user, Movies],
			});
			if (found) {
				res.status(200).json(found);
			} else {
				res.status(404).json({ msg: "review not found" });
			}
		} catch {
			res.status(500).json({ msg: "Internal Server Error" });
		}
	}

	static async addReview(req, res) {
		const userId = req.userData.id;
		const { MovieId } = req.query;
		const { content, rating } = req.body;
		const found = await reviews.findOne({
			where: { userId, MovieId },
		});
		if (found) {
			res
				.status(400)
				.json({ msg: "User already submitted a review for this movie" });
		} else {
			reviews
				.create({
					userId,
					MovieId,
					content,
					rating,
				})
				.then(() =>
					res.status(200).json({ msg: "Review submitted successfully" })
				)
				.catch((err) => res.status(500).json({msg: err.errors[0].message}));
		}
	}

	static async updateReview(req, res) {
		const userId = req.userData.id;
		const MovieId = req.query.MovieId;
		const { content, rating } = req.body;
		reviews
			.update(
				{
					content,
					rating,
				},
				{
					where: {
						userId,
						MovieId,
					},
				}
			)
			.then(() => {
				res.status(200).send({ msg: "Movie updated successfully" });
			})
			.catch((err) => res.status(500).json({msg: err.errors[0].message}));
	}

	static async deleteReview(req, res) {
		const userId = req.userData.id;
		const {id} = req.query;
		reviews
			.destroy({
				where: { userId, id },
			})
			.then(() => res.status(200).json({ msg: "Review deleted successfully" }))
			.catch((err) => res.status(500).json({msg: err.errors[0].message}));
	}

	static async updateRating(req,res){
		const MovieId = req.query.MovieId;
		try{
			const review = await reviews.findAll({where: {MovieId}})
			// const movie = await Movies.findOne({where: {id: MovieId}})
			// let rating = movie.rating;
			review.forEach(review => rating+= review.rating);
			rating = rating/review.length;
			const updated = await Movies.update({rating},{where: {id:MovieId}})
			res.status(200).json({updated},{msg: "Update successful"})
		}catch (err){
			res.status(500).json({msg: err.errors[0].message})
		}		
	}
}
module.exports = ReviewController;
