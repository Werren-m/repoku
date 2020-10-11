const multer = require("multer");

const fileFormatLimit = (req, file, cb) => {
	if (file.mimetype === "image/png" || file.mimetype === "image/jpeg") {
		cb(null, true);
	} else {
		cb(null, false);
	}
};

const userStorage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, "./uploads/user");
	},
	filename: function (req, file, cb) {
		cb(null, Date.now()+"-"+file.originalname);
	},
});

const movieStorage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "./uploads/movie");
	},
	filename: (req, file, cb) => {
		cb(null, Date.now()+"-"+file.originalname);
	},
});

const uploadUser = multer({
	storage: userStorage,
	fileFilter: fileFormatLimit,
});

const uploadMovie = multer({
	storage: movieStorage,
	fileFilter: fileFormatLimit,
});

module.exports = {
	uploadUser,
	uploadMovie,
};
