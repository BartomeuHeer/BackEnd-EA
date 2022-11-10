import { Schema, model } from 'mongoose';
import User from './User';

const Route = new Schema({
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
	dateOfBeggining: Date

});

export default model('Route', Route);