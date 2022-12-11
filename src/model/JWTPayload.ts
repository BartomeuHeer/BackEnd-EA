import User from './Client';
import { Schema, model } from 'mongoose';

export default interface IJwtPayload {
  id: string,
  isAdmin: boolean
}