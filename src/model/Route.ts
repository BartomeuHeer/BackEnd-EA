import { Schema, model } from 'mongoose';
import User from './Client';

const Route2 = new Schema({
	name: String,
    creator:{
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    participants: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }],
    startPoint: String,
    endPoint: String,
    stopPoint: [String],
	dateOfBeggining: Date,
	price: Number,
});

export default model('Route', Route2);