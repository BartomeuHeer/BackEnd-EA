import { Schema, model } from 'mongoose';

const Point = new Schema({
    placeName: String,
    location: {
        isType: String,
        coordinates: [Number]
    },
    price: Number
    // latitude: Number,
    // length: Number
},
    { typeKey: '$type' });

export default model('Point', Point);