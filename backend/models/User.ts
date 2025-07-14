import mongoose, { Document, Schema } from "../config/db";

// Define an interface for the User document
export interface IUser extends Document {
  name: string;
  avatar: string;
  totalPoints: number;
  createdAt: Date;
}

// Define the schema for the user model
const UserSchema: Schema = new Schema({
  name: {
    type: String,
    require: true,
    trim: true,
  },
  avatar: {
    type: String,
    require: true,
  },
  totalPoints: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

// Create and export the user model based on the schema
export default mongoose.model<IUser>("User", UserSchema);
