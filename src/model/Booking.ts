import { Schema, model } from 'mongoose';

const Booking = new Schema({
	route: { type: Schema.Types.ObjectId, ref: "Route"},
	user: {
		type: Schema.Types.ObjectId,
		ref: "User"
	},
	dayOfCreation: {type: Date, default: Date.now},
	price: Number,
	cancelPolicy:{
		completRefund:{
			cancelDate: Date,
			cancelPrice: Number
		},
		halfRefund: {
			cancelDate: Date,
			cancelPrice: Number
		},
		noRefund:{
			cancelDate: Date,
			cancelPrice: Number
		}
	},
	selectedStopPoint:{type: Schema.Types.ObjectId, ref: "Point"}
});

export default model('Booking', Booking);