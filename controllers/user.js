const { user,reviews } = require("../models");
const { decryptPwd, encryptPwd } = require("../helpers/bcrpyt");
const { tokenGenerator } = require("../helpers/jwt");

class UserController {
	static async getAllUser(req, res) {
		user
			.findAll()
			.then((users) => res.status(200).json(users))
			.catch((err) => res.status(500).json({msg: err.errors[0].message}));
	}

	static async login(req, res) {
		const { email, password } = req.body;
		if(email == null){
			res.status(400).json({msg: "Email must be provided"});
		}
		if(password == null){
			res.status(400).json({msg: "Password must be provided"});
		}
		const found = await user.findOne({
			where: {
				email,
			},
		});
		try{
			if (found) {
				if (decryptPwd(password, found.password)) {
					const token = tokenGenerator(found);
					res.status(200).json({ token });
				} else {		
					res.status(400).json({msg: 'Invalid password'})
				}
			} else {
				res.status(404).json({msg: 'Email not found'})
			}
		}catch(err){
			res.status(500).json({msg: err.errors[0].message})
		}
		
	}

	static async getUser(req, res) {
		const { id } = req.userData;
		try{
			const review = await reviews.findAll({where: {userId: id,isVisible: "true"}})
			const users = await user.findOne({where: {id}})
			res.status(200).json({users,review})
		}catch (err) {
			res.status(500).json({msg: err.errors[0].message})
		}
	}

	static async getUserDetails(req,res){
		const {id} = req.userData;
		try{
			const users = await user.findOne({where: {id}})
			res.status(200).json({users})
		}catch(err){
			res.status(500).json({msg: err.errors[0].message})
		}
	}

	static async updateUser(req, res) {
		const { id } = req.userData;
		try {
			const done = await user.update(
				(req.body),
				{	
					where: { id }
				}
			)
			const dones = await user.findOne({where: {id}})
			const token = tokenGenerator(dones);
			res.status(200).json({done,token,msg: "Update successful"});
		} catch (err) {
			res.status(500).json({err});
		}
	}

	static async updateUserImage(req,res){
		const {id} = req.userData;
		const image = req.file.path;
		try{
			const updateImg = await user.update({image},
				{where: {id}}
				);
			const done = await user.findOne({where: {id}})
			res.status(200).json({updateImg,done,token,msg: "Update successful"})
		}catch(err){
			res.status(500).json({msg: err.errors[0].message});
		}
	}

	static async register(req, res) {
		const { email, password, name, role } = req.body;
		const image = "";
		if(email == null){
			res.status(400).json({msg: "Email must be provided"});
		}
		if(password == null){
			res.status(400).json({msg: "Password must be provided"});
		}
		if(name == null){
			res.status(400).json({msg: "Name must be provided"});
		}

		const found = await user.findOne({
			where: { email },
		});
		if (found) {
			res.status(400).json({ msg: "Email address is already in use" });
		} else {
			user
				.create({
					name: name,
					password: password,
					email: email,
					image: image,
					role: role || "user",
				})
				.then((result) => {
					const token = tokenGenerator(result);
					res.status(201).json({ token });
				})
				.catch((err) => res.status(500).json({msg: err.errors[0].message}));
		}
	}

	static async deleteUser(req, res) {
		const { id } = req.userData;
		try {
			const result = user.destroy({
				where: {
					id,
				},
			});
			res.status(200).json({
				result,
				msg: "User deleted",
			});
		} catch (err) {
			res.status(500).json({msg: err.errors[0].message});
		}
	}
}

module.exports = UserController;
