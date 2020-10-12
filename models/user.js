"use strict";
const { encryptPwd } = require("../helpers/bcrpyt");
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class user extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			user.belongsToMany(models.Movies, { through: "models.review" });
		}
	}
	user.init(
		{
			name: {
				type: DataTypes.STRING,
				validate: {
					notEmpty: {
						msg: "Name must be provided"
					}
				},
			},
			password: {
				type: DataTypes.STRING,
				validate: {
					is: {
						args: /^(?=[a-zA-Z0-9]*[a-zA-Z])(?=[a-zA-Z0-9]*\d)[a-zA-Z0-9]*$/i,
						msg: "Please enter alphanumeric password",
					},
				},
			},
			email: DataTypes.STRING,
			image: DataTypes.STRING,
			role: DataTypes.STRING,
		},
		{
			hooks: {
				beforeCreate(user) {
					user.password = encryptPwd(user.password);
					user.image = "https://cdn.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png";
				},
				beforeBulkUpdate(user) {
					if(user.attributes.password == null){

					}else{
						user.attributes.password = encryptPwd(user.attributes.password);
					}
				},
			},
			sequelize,
			modelName: "user",
		}
	);
	return user;
};
