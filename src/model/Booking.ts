import { Schema, model } from 'mongoose';

const Booking = new Schema({
	route: {
		type: Schema.Types.ObjectId,
		ref: "Route"
	},
	user: {
		type: Schema.Types.ObjectId,
		ref: "User"
	},
	dayOfCreation: { type: Date, default: Date.now },
	selectedStopPoint: {
		placeName: String,
		coordinates: [Number],
	},
	price: Number,
	duration: Number
});

export default model('Booking', Booking);