import User from './User';
import { Schema, model } from 'mongoose';

export default interface IJwtPayload {
  id:{
    type: Schema.Types.ObjectId,
    
}, 
    isAdmin: boolean
  }