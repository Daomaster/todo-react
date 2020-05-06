import mongoose, { Schema, Document } from 'mongoose';

export interface UserModel extends Document{
  username: string;
  password: string;
}

const UserSchema: Schema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
});

export const User = mongoose.model<UserModel>('User', UserSchema);
