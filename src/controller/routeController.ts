
import Route from '../model/Route';
import Point from '../model/Point';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import User from '../model/Client';
import { exec } from 'child_process';

// CREATE NEW ROUTE

const create = async (req: Request, res: Response) => {
	try{
	await User.findOne({email: req.body.creator}).then(async (data) =>{
	const startPoint = req.body.startPoint;
	const endPoint = req.body.endPoint;
	const stopPoint = req.body.stopPoint;
	const dateOfBeggining = req.body.dateOfBeggining;
	const name : string= req.body.creator + startPoint + stopPoint;
	const creator = data;
	const newRoute = new Route({name, creator, startPoint, endPoint, stopPoint, dateOfBeggining});

	newRoute.save();

	data?.updateOne({"_id": data.id}, {$addToSet: {route: newRoute}});

	res.status(200).json(newRoute);

	}).catch( (error) => {
		res.status(400).json( {message: "Error"} );
	});
	// const participants = [req.body.participants];

	}catch(err){
		console.log(err);
		res.status(400).json( {message: err} );
	}
};

// PUT NEW POINT INTO A ROUTE

const newStopPoint = async (req: Request, res: Response) => {
	const route = await Route.findById(req.params.id);
	if (!route) {
		return res.status(404).send('No route found.');
	}
	else{
		Route.updateOne({"_id":req.body.id}, {$addToSet: {Point: req.body.Point}})
            .then((data) => {
        res.status(201).json(data);
    }).catch((err) => {
        res.status(500).json(err);
    })}
};

// PUT NEW PARTICIPANT INTO A ROUTE

const newParticipant = async (req: Request, res: Response) => {
	console.log("hello");
	console.log(req.body.id);
	// console.log(req.body.participant._id);
	const route = await Route.findById(req.body.id);
	if (!route) {
		console.log("holass");
		return res.status(401).send('Route not found.');
	}
	else{
		const user = await User.findById(req.body.participantId);

		Route.updateOne({"_id":req.body.id}, {$addToSet: {participants: user}})
            .then((data) => {
        res.status(201).json(data);
    }).catch((err) => {
        res.status(500).json(err);
    })}
};

// PUT NEW ROUTE INTO A USER

const newRouteInUser = async (req: Request, res: Response) => {
	const user = await User.findById(req.body.id);
	if (!user) {
		return res.status(404).send('No route found.');
	}
	else{
		User.updateOne({"_id":req.body.id}, {$addToSet: {routes: req.body.route}})
            .then((data) => {
        res.status(201).json(data);
    }).catch((err) => {
        res.status(500).json(err);
    })}
};

// GET ALL ROUTES

const getAllRoutes = async (req: Request, res: Response) => {
	const routes = await Route.find().populate('creator').populate('participants');
	res.json(routes);
};

const getFilteredRoutes = async (req: Request, res: Response) => {
	const startDate: Date = new Date(req.body.dateInit);
	const stopDate: Date = new Date(startDate);
	stopDate.setDate(startDate.getDate() + 1);
	console.log("start: " + startDate + " Stop: " + stopDate);
	/* const route = await Route.aggregate([
		 {
			$geoNear: {
				near:{
					type: "Point",
					coordinates: req.body.startPoint.coordinates

				},
				maxDistance: 10000,
				distanceField: "startPoint.location"
			}
		 },
		 {
			$geoNear: {
				near:{
					type: "Point",
					coordinates: req.body.startPoint.coordinates

				},
				maxDistance: 10000,
				distanceField: "stopPoint.location"
			}
		 }
	]) */
	const routes = await Route.find({
		$and: [
			{ startPoint: req.body.start},
			{ $or: [ {stopPoint: req.body.stop},{endPoint: req.body.stop}]},
			{ dateOfBeggining: { $gt: startDate, $lt: stopDate }}
		]
	}).populate("creator").populate("participants").populate("stopPoint").populate("startPoint").populate("endPoint")
	res.json(routes);
}


// GET ALL PARTICIPANTS OF A ROUTE

const getAllParticipants = async (req: Request, res: Response) => {
	const participants = await Route.findById(req.params.id).populate('user');
	res.json(participants);
};

// GET ALL STOP POINTS OF A ROUTE

const getAllPoints = async (req: Request, res: Response) => {
	const Points = await Route.findById(req.params.id).populate('Points');
	res.json(Points);
};


// GET A ROUTE BY ID

const getRoute = async (req: Request, res: Response) => {
	const route = await Route.findById(req.params.id).populate('creator');
	res.json(route);
};



// UPDATE A ROUTE BY ID

const updateRoute = async (req: Request, res: Response) => {
	const updatedRoute = await Route.findById(req.params.id);
	if (!updatedRoute) {
		return res.status(404).send('No route found.');
	}
	else{
		updatedRoute.name = req.body.name;
		updatedRoute.creator = req.body.creator;
		updatedRoute.participants= req.body.participants;
		updatedRoute.startPoint=req.body.startPoint;
		updatedRoute.endPoint=req.body.endPoint;
		updatedRoute.stopPoint=req.body.stopPoint;
		await updatedRoute.save();
		res.json({ status: 'Route Updated' });
	}
};

// DELETE ROUTE

const deleteRoute = async (req: Request, res: Response) => {
	const route = req.body.route;
	const findRoute = await Route.findOne(route);
	if (!findRoute) {
		return res.status(400).json({ message: 'Route not found.' });
	}
	await Route.findByIdAndDelete(findRoute._id);
	res.status(200).json({ auth: true });
};

export default{
	create,
	newStopPoint,
	newParticipant,
	getAllParticipants,
	getAllRoutes,
	getAllPoints,
	updateRoute,
	deleteRoute,
	getRoute,
	getFilteredRoutes,
	newRouteInUser
};