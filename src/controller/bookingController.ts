import Booking from '../model/Booking';
import User from '../model/User';
import { Request, Response } from 'express';

const getBooking = async (req: Request, res: Response) => {
	const booking = await Booking.findById(req.params._id);
	if(!booking){
		return res.status(404).json("User not found")
	}
	res.json({booking}).status(200)

};

const cancelBooking = async (req: Request, res: Response) => {

	const cancel = await Booking.findByIdAndRemove(req.params._id);
	if(!cancel){
		return res.status(404).json("Booking not found o millor Can't remove something that doesn't exist")
	}
	res.json({cancel}).status(200)

	// const name = req.body.name;
	// const userID = req.body.user;
	// const findbooking = await Booking.findOne({ name, user: userID });
	// if (!findbooking) {
	// 	return res.status(400).json({ message: 'Booking not found' });
	// }
	// await Booking.findByIdAndDelete(findbooking._id);
	// res.status(200).json({ auth: true });
};


const getAll = async (req: Request, res: Response) => {

	const bookings = await Booking.find
	// const bookings = await Booking.find().populate('user'); // No entenc pq serveix aixo de populate pero
	// serveix per obtenir només un booking
	res.json(bookings);
};

const createBooking = async (req:Request, res: Response) => {
	const { route, user, dayOfCreation, price, cancelPolicy, selectedStopPoint} = req.body;
	const newBooking = {


		route,
		user,
		dayOfCreation,
		price,
		cancelPolicy,
		selectedStopPoint
	  }
	  const booking = new Booking(newBooking);
	  await booking.save();

	  return res.json({
		message: "Booking created",
		booking
	  });

}
const updateBooking = async (req: Request, res: Response) => {


  const _id = req.params.id; // Aixi ho fa el profe pero al Barto no li mola peor ns si el req.body sirve
  const { route, user, dayOfCreation, price, cancelPolicy, selectedStopPoint } = req.body; // Destructuring, aquesta linea el que fa es crear 6 -
  // - variables i les guarda, 6 variables amb el mateix route, user ...

  const updatedBooking = await Booking.findByIdAndUpdate(_id, {
// Fa la cerca i el mateix metode del mongo actualitza i ens torna la nova versio al "todo"
    route,
    user,
    dayOfCreation,
    price,
	cancelPolicy,

// si no esta algun es crea s'indiica amb el {new: true}
  }, {new: true}); // Creem el Booking si no el trobem?

//   return res.json({
//     message: "Booking updated",
//     updatedBooking
//   });
  res.json({updatedBooking}).status(200)

}

const getBookingsFromUser = async (req: Request, res: Response) => {
	const _id = req.params.id;
	// const bookings = await Booking.find(User.name: ) // ns com fer aixo
	// res.json(bookings);
}
export default {
	getBooking,
	cancelBooking,
	getAll,
	updateBooking,
	createBooking,
	getBookingsFromUser

};