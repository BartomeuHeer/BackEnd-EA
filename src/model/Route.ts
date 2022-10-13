import { Schema, model } from 'mongoose';
import Point from './Point';
import User from './User';

const Route = new Schema({
	name: String,
    creator:{
        type: Schema.Types.ObjectId,
        ref: User,
    },
    participants: [{
        type: Schema.Types.ObjectId,
        ref: User,
    }],
    startPoint: {
        type: Schema.Types.ObjectId,
        ref: Point,
    },
    endPoint: {
        type: Schema.Types.ObjectId,
        ref: Point,
    },
    stopPoint: [{
        type: Schema.Types.ObjectId,
        ref: Point,
    }],
	dateOfEntry: Date

});

export default model('Route', Route);