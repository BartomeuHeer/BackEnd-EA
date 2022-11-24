import User from './User';
import { Schema, model } from 'mongoose';

export default interface IJwtPayload {
  id: string,
  isAdmin: boolean
}