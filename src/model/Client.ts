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
	/* photo:{
		type: Image
	},*/
	email: {
		type: String,
		required:  true,
		unique: true
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
	},
	admin: {
		type: Boolean,

	}
});

export default model('User', User);