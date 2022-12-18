import User from '../model/Client';
import jwt, { JwtPayload } from 'jsonwebtoken';
import CryptoJS from 'crypto-js';
import { Request, Response } from 'express';
import Rating from '../model/Rating';
import IJwtPayload from '../model/JWTPayload';

const register = async (req: Request, res: Response) => {
	const name = req.body.name;
	const email = req.body.email;
	const birthday = req.body.birthday;
	let password = req.body.password;
	const admin = req.body.admin;
	password = CryptoJS.AES.encrypt(password, 'secret key 123').toString();

	const newUser = new User({ name, email, password, birthday, admin });
	await newUser.save().then((data) => {
		res.status(200).json(data);
	}).catch((error) => {
		res.status(404).json("duplicat user");
	});
};

const login = async (req: Request, res: Response) => {
	const user = await User.findOne({ email: req.body.email }).populate({
		path:'route',
		populate: {
			path : 'creator'
			}
		}).populate({
			path:'vehicle',
			populate: {
				path : 'owner'
				}
			}).populate({
				path:'ratings',
				populate: {
					path : 'author'
					}
				}).populate({
					path:'booking',
					populate: {
						path : 'user'
						}
					});
	if (!user) {
		return res.status(404).json({ message: 'User not found' });
	}
	const validPassword = CryptoJS.AES.decrypt(user.password!, 'secret key 123').toString(CryptoJS.enc.Utf8);
	if (validPassword !== req.body.password) {
		return res.status(404).json({ message: 'User not found' });
	}

	const secretToken = "password";
	const payload = {
		id: user._id.toString(),
		isAdmin: user.admin
	};
	// let iv = CryptoJS.enc.Hex.parse("FgLFXEr1MZl2mEnk");
	// secretToken = CryptoJS.AES.encrypt(secretToken,iv).toString();
	const token = jwt.sign(
		{ id: user._id, isAdmin: user.admin }, secretToken, { expiresIn: 3600 })
	res.status(200).json({ user, token });
};



const newRating = async (req: Request, res: Response) => {
	const author = req.body.author;
	const comment = req.body.comment;
	const dest = req.body.dest;
	const rate = req.body.rate;
	const userA = await User.findOne({ name: author });
	const userD = await User.findOne({ name: dest });
	if (!userA || !userD) {
		return res.status(400).json({ message: 'User not found' });
	}

	const ratingNew = new Rating({ author: userA.id, comment, dest: userD.id, rate });
	await ratingNew.save();

	res.status(200);
};

const deleteOne = async (req: Request, res: Response) => {
	const user = await User.findByIdAndDelete(req.params.id);
	if (!user) {
		return res.status(404).send('No user found')
	}
	return res.status(200).json(user);
}

const getProfile = async (req: Request, res: Response) => {
	const user = await User.findById(req.params.userId, { password: 0 });
	if (!user) {
		return res.status(404).send('No user found.');
	}
	const name = user.name;
	const email = user.email;
	const birthday = user.birthday;
	const route = user.route;
	const vehicle = user.vehicle;
	const userinfo = new User({ name, email, birthday, route, vehicle });
	res.json(userinfo);
};

const getall = async (req: Request, res: Response) => {
	// if(req.body.admin === true){
	const users = await User.find();
	res.json(users);
	// }

};

const getone = async (req: Request, res: Response) => {
	const user = await User.findById(req.params.id);
	res.json(user);// no hem de passar tot el user
};

const getUserRoutes = async (req: Request, res: Response) => {
	const user = await User.findById(req.params.id);
	if (!user) {
		return res.status(404).send('No user found.');
	}
	const route = user.route;
	res.json(route);
};

const getRatings = async (req: Request, res: Response) => {
	const ratings = await Rating.find({ dest: req.params.id }).populate('user');
	res.json(ratings);
};
const updateUser = async (req: Request, res: Response) => {
	const user = await User.findById(req.params.id);
	if (!user) {
		return res.status(404).send('No user found.');
	}
	else {
		const password = CryptoJS.AES.encrypt(req.body.password, 'secret key 123').toString();
		const update = { name: req.body.name, password, email: req.body.email, birthday: req.body.birthday }
		const user1 = await User.findOneAndUpdate({ id: req.params.id }, update);
		res.json({ status: 'User updated', user1 })
	}
}
const changePass = async (req: Request, res: Response) => {
	const user = await User.findById(req.params.id);
	if (!user) {
		return res.status(404).send('No user found.');
	}
	if (req.body.password === CryptoJS.AES.decrypt(user.password!, 'secret key 123').toString(CryptoJS.enc.Utf8)) {
		let newpassword = req.body.newpassword;
		newpassword = CryptoJS.AES.encrypt(newpassword, 'secret key 123').toString();
		user.password = newpassword;
		await user.save();
		res.json({ status: 'User Updated' });
	}
	else {
		res.json({ status: 'Wrong password' });
	}
};


// const {id,user,name,completed} = req.body;
export default {
	register,
	login,
	getall,
	getone,
	updateUser,
	changePass,
	getRatings,
	newRating,
	deleteOne,
	getProfile,
	getUserRoutes
};