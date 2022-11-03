import { Schema, model } from 'mongoose';

const User = new Schema({
	name: {
		type: String,
		required:  true
	},
	password: {
		type: String,
		required:  true
	},
	email: {
		type: String,
		required:  true
	},
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
	vehicle: {
		type: Schema.Types.ObjectId,
		ref: "Vehicle"
	}
});

export default model('User', User);