import UserModel from "../models/user.model";
import { connectDB } from "../db";

export const createOrUpdateUser = async (
  id: string,
  first_name: string,
  last_name: string,
  image_url: string,
  email_addresses: any,
  username: string,
) => {
  try {
    await connectDB();
    const user = await UserModel.findOneAndUpdate(
      { clerkId: id },
      {
        $set: {
          firstName: first_name,
          lastName: last_name,
          profilePicture: image_url,
          email: email_addresses[0].email_address,
          username,
        },
      },
      { new: true, upsert: true },
    );
    return user;
  } catch (err) {
    console.error("Erro creating or updating the user", err);
  }
};

export const deleteUser = async (id: string) => {
  try {
    await connectDB();
    await UserModel.findOneAndDelete({ clerkId: id });
  } catch (err) {
    console.error("Error deleting user", err);
  }
};
