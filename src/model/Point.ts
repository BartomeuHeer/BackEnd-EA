import { Schema, model } from 'mongoose';

const Point = new Schema({
    placeName: String,
    location:{
        type: String,
        coordinates: [Number]
    }
	
    // latitude: Number,
    // length: Number
});
Point.index({location: "2dsphere"});

export default model('Point', Point);