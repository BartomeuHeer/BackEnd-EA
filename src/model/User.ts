import { Schema, model } from 'mongoose';

const User = new Schema({
	name: String,
	password: String,
	email: String,
	birthday: {
		type: Schema.Types.Date
	},
	route: [{
		type: Schema.Types.ObjectId,
		ref: "Route"
	}],
	ratings: {
		type: Schema.Types.ObjectId,
		ref: "Rating"
	},
	booking: [{
		type: Schema.Types.ObjectId,
		ref: "Booking"
	}],
});

export default model('User', User);