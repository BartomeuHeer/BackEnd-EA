import Point from '../model/Point';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';

// CREATE POINT
const createPoint = async (req: Request, res: Response) => {
	const name = req.body.name;
	const latitude = req.body.latitude;
	const length = req.body.length;
	const newPoint = new Point({ name,latitude,length });
	await newPoint.save();
	const token = jwt.sign({ id: newPoint._id }, 'syt#KInN7Q9X3m&$ydtbZ7Z4fJiEtA6uHIFzvc@347SGHAjV4E', {
		expiresIn: 60 * 60 * 24
	});
	res.status(200).json({ auth: true, token });
};
// UPDATE POINT
const updatePoint = async (req: Request, res: Response) => {
	const updatedPoint = await Point.findById(req.params.id);
	if (!updatedPoint) {
		return res.status(404).send('No point found.');
	}
	else{
		updatedPoint.name = req.body.name;
		updatedPoint.latitude = req.body.latitude;
		updatedPoint.length = req.body.length;
		await updatedPoint.save();
		res.json({ status: 'Point Updated' });
	}
};

// GET ALL POINTS
const getAllPoints = async (req: Request, res: Response) => {
	const points = await Point.find();
	res.json(points);
};

// GET POINT BY ID

const getPoint = async (req: Request, res: Response) => {
	const point = await Point.findById(req.params.id);
	res.json(point);
};

// DELETE STOP POINT

const deletePoint = async (req: Request, res: Response) => {
	const name = req.body.name;
	const findStopPoint= await Point.findOne(name);
	if (!findStopPoint) {
		return res.status(400).json({ message: 'Point not found' });
	}
	await Point.findByIdAndDelete(findStopPoint._id);
	res.status(200).json({ auth: true });
};
export default {
	createPoint,
	updatePoint,
	getAllPoints,
	getPoint,
	deletePoint
};
