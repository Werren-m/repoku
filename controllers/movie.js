const { Movies,user,reviews } = require("../models/");
const Sequelize = require("sequelize");

class MovieController {
	static async getMoviesPaging(req, res) {
		const result = await res.result;
		res.json(result);
	}

	static async getMovies(req, res) {
		Movies.findAll()
			.then((re) => {
				res.status(200).json(re);
			})
			.catch((err) => {
				res.status(500).json({msg: err.errors[0].message});
			});
	}

	static async addMovie(req, res) {
		const { role } = req.userData;
		const { title, synopsis, trailer, rating, category } = req.body;
		const { poster } = req.files;
		const { backdrop } = req.files;
		if(title == null){
			res.status(400).json({msg: "Title must be provided"});
		}
		if(synopsis == null){
			res.status(400).json({msg: "Synopsis must be provided"});
		}
		if(trailer == null){
			res.status(400).json({msg: "Trailer must be provided"});
		}
		if(rating == null){
			res.status(400).json({msg: "Rating must be provided"});
		}
		if(category == null){
			res.status(400).json({msg: "Category must be provided"});
		}
		if(poster == null){
			res.status(400).json({msg: "Poster must be provided"});
		}
		if(backdrop == null){
			res.status(400).json({msg: "Backdrop must be provided"});
		}
		const postPath = poster[0].path;
		const backPath = backdrop[0].path;
		if (role !== "user") {
			const found = await Movies.findOne({
				where: {
					title,
				},
			});
			if (found) {
				res.status(400).json({ msg: "Movie already exists" });
			} else {
				Movies.create({
					title,
					synopsis,
					trailer,
					rating,
					category,
					poster: postPath,
					backdrop: backPath,
				})
					.then((el) => {
						res.status(200).json({ msg: "Movie created successfully" });
					})
					.catch((err) => {
						res.status(500).json({msg: err.errors[0].message});
					});
			}
		} else {
			res.status(400).json({ msg: "Unauthorized access" });
		}
	}

	static async getSingleMovie(req, res) {
		const id = req.query.id;
		const review = await reviews.findAll({
			where: {MovieId: id},include: [user]
		})
		const movie = await Movies.findOne({
			where: { id }
		});
		if (movie) {
			res.status(200).json({movie,review});
		} else {
			res.status(404).json({ msg: "Movie not found" });
		}
	}
	


	static async editFormMovie(req, res) {
		const { role } = req.userData;
		const id = req.params.id;
		if (role !== "user") {
			const movie = await Movie.findOne({
				where: { id },
			});
			if (movie) {
				res.status(200).json(movie);
			} else {
				res.status(404).json({ msg: "Movie not found" });
			}
		} else {
			res.status(400).json({ msg: "Unauthorized access" });
		}
	}

	static async editMovie(req, res) {
		const { role } = req.userData;
		const  id  = req.query.id;
		const { title, synopsis, trailer, rating, category } = req.body;
		const { poster, backdrop } = req.files;
		const test = Number(rating)
		if(title == null){
			res.status(400).json({msg: "Title must be provided"});
		}
		if(synopsis == null){
			res.status(400).json({msg: "Synopsis must be provided"});
		}
		if(trailer == null){
			res.status(400).json({msg: "Trailer must be provided"});
		}
		if(rating == null){
			res.status(400).json({msg: "Rating must be provided"});
		}
		if(category == null){
			res.status(400).json({msg: "Category must be provided"});
		}
		if(poster == null){
			res.status(400).json({msg: "Poster must be provided"});
		}
		if(backdrop == null){
			res.status(400).json({msg: "Backdrop must be provided"});
		}
		const postPath = poster[0].path;
		const backPath = backdrop[0].path;

		try{
			if (role == "admin") {
				const update = await Movies.update(
					{
						title,
						synopsis,
						trailer,
						rating: test,
						category,
						poster: postPath,
						backdrop: backPath,
					},
					{ where: {id} }
				)
				if(update){
					res.status(200).json({ msg: "Movie updated successfully" });
				}else{
					res.status(200).json({ msg: "Failed" });
				}
			}else{
				res.status(400).json({ msg: "Unauthorized access"})
			}
		}catch(err){
			res.status(500).json({err})
		}
	}

	static async deleteMovie(req, res) {
		const { role } = req.userData;
		const { id } = req.params;

		if (role !== "user") {
			Movies.destroy({
				where: { id },
			})
				.then(() => res.status(200).json({ msg: "Movie deleted successfully" }))
				.catch((err) => res.status(400).json({msg: err.errors[0].message}));
		} else {
			res.status(400).json({ msg: "Unauthorized access" });
		}
	}

	static searchByTitle(req, res) {
		const op = Sequelize.Op;
		const { title } = req.query;
		if(title == null){
			res.status(400).json({msg: "Title must be provided"});
		}
		Movies.findAll({
			where: {
				title: {
					[op.iLike]: "%" + title + "%",
				},
			},
		})
			.then((el) => res.status(200).json(el))
			.catch((err) => res.status(500).json({msg: err.errors[0].message}));
	}

	static async searchByCategory(req, res) {
		const op = Sequelize.Op;
		const { category } = req.query;
		if(category == null){
			res.status(400).json({msg: "Category must be provided"});
		}
		Movies.findAll({
			where: {
				category: {
					[op.iLike]: "%" + category + "%",
				},
			},
		})
			.then((cat) => res.status(200).json(cat))
			.catch((err) => res.status(404).json({msg: err.errors[0].message}));
	}
}
module.exports = MovieController;
