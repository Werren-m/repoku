const jwt = require("jsonwebtoken");
const secretKey = process.env.SECRET_KEY;

const tokenGenerator = (user) => {
	return jwt.sign(
		{
			id: user.id,
			email: user.email,
			password: user.password,
			name: user.name,
			image: user.image,
			role: user.role,
		},
		secretKey
	);
};

const tokenVerifier = (token) => {
	return jwt.verify(token, secretKey);
};

module.exports = {
	tokenGenerator,
	tokenVerifier,
};
