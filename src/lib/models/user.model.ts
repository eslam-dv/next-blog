import { Schema, model, type Document } from "mongoose";

export interface IUser extends Document {
  clerkId: string;
  email: string;
  firsName: string;
  lastName: string;
  username?: string;
  profilePicture?: string;
  isAdmin?: boolean;
}

const userSchema = new Schema<IUser>(
  {
    clerkId: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    firsName: { type: String, required: true },
    lastName: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    profilePicture: { type: String },
    isAdmin: { type: Boolean, default: false },
  },
  { timestamps: true },
);

const UserModel = model("User", userSchema);
export default UserModel;
