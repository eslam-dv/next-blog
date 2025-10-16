import { connect } from "mongoose";

export const connectDB = async () => {
  try {
    await connect(`${process.env.MONGODB_URI}`);
    console.log(`MongoDB connected!`);
  } catch (err) {
    console.error("Failed to connect to MongoDB", err);
  }
};
