import { Schema, model } from 'mongoose';

const Vehicle = new Schema({
	model: String,
	brand: String,
	year: {
		type: Schema.Types.Date
	},
	owner: {
		type: Schema.Types.ObjectId,
		ref: "User"
	},
	seats: Number,
	licencePlate: String,
	insurance: {
		isValid: Boolean,
		docPicture:String
	}
});

export default model('Vehicle', Vehicle);