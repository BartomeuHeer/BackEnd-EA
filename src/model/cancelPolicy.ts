import { Schema, model } from 'mongoose';

const CancelPolicy = new Schema({
    completRefund:{
        maxCancelDate: Date,
        pirceRefound: Number
    },
    halfRefund: {
        maxCancelDate: Date,
        pirceRefound: Number
    },
    noRefund:{
        maxCancelDate: Date,
        pirceRefound: Number
    }
});