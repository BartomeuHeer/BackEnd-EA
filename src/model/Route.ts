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
        placeName: String,
        coordinates: [Number]
    },
    endPoint: {
        placeName: String,
        coordinates: [Number]
    },
    stopPoint: [{
        placeName: String,
        coordinates: [Number],
        price: Number
    }],
	dateOfBeggining: Date,
	price: Number,
    maxParticipants: Number
});

export default model('Route', Route2);