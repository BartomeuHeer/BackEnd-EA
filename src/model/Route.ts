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
    startPoint: {
        type: Schema.Types.ObjectId,
        ref: "Point"
    },
    endPoint: {
        type: Schema.Types.ObjectId,
        ref: "Point"
    },
    stopPoint: [{
        type: Schema.Types.ObjectId,
        ref: "Point"
    }],
	dateOfBeggining: Date,
	price: Number,
});

export default model('Route', Route2);