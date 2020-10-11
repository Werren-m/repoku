"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class reviews extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			reviews.belongsTo(models.user);
			reviews.belongsTo(models.Movies);
		}
	}
	reviews.init(
		{
			userId: DataTypes.INTEGER,
			MovieId: DataTypes.INTEGER,
			content: DataTypes.STRING,
			rating: {
				type:  DataTypes.DOUBLE,
				validate: {
					max: 10
				}
			},
			isVisible: DataTypes.STRING
		},
		{
			hooks: {
				beforeCreate(reviews){
					reviews.isVisible = false;
				}				
			},
			sequelize,
			modelName: "reviews",
		}
	);
	return reviews;
};
