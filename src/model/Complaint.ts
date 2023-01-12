import { Schema, model } from 'mongoose';

const Complaint = new Schema({
    date: {type: Date, default: Date.now},
	name: {type: String},
    comment:  {type: String},
	category: {type: String}
});

export default model('Complaint', Complaint);