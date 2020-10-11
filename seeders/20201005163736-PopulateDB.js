"use strict";

module.exports = {
	up: async (queryInterface, Sequelize) => {
		/**
		 * Add seed commands here.
		 *
		 * Example:
		 * await queryInterface.bulkInsert('People', [{
		 *   name: 'John Doe',
		 *   isBetaMember: false
		 * }], {});
		 */

		const fs = require("fs");
		const parseData = JSON.parse(fs.readFileSync("./seed.json", "utf8"));
		const movieData = [];
		parseData.forEach((el) => {
			const {
				title,
				synopsis,
				poster,
				trailer,
				rating,
				backdrop,
				category,
			} = el;
			movieData.push({
				title,
				synopsis,
				poster,
				trailer,
				rating,
				backdrop,
				category,
				createdAt: new Date(),
				updatedAt: new Date(),
			});
		});
		await queryInterface.bulkInsert("Movies", movieData, {});
	},

	down: async (queryInterface, Sequelize) => {
		/**
		 * Add commands to revert seed here.
		 *
		 * Example:
		 * await queryInterface.bulkDelete('People', null, {});
		 */
	},
};
