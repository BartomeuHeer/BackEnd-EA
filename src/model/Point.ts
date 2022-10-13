import { Schema, model } from 'mongoose';

const Point = new Schema({
	name: String,
    latitude: Number,
    length: Number,
});

export default model('Point', Point);