import UserModel from "../models/user.model";
import { connectDB } from "../db";

type User = {
  id: string;
  first_name: string | null;
  last_name: string | null;
  image_url: string;
  email_addresses: any;
  username: string | null;
};

export const createUser = async ({
  id,
  first_name,
  last_name,
  image_url,
  email_addresses,
  username,
}: User) => {
  try {
    await connectDB();
    const newUser = await UserModel.create({
      clerkId: id,
      firsName: first_name,
      lastName: last_name,
      profilePicture: image_url,
      email: email_addresses[0]?.email_address,
      username,
    });
    return newUser;
  } catch (err) {
    console.error("Error creating user: ", err);
  }
};

export const updateUser = async ({
  id,
  first_name,
  last_name,
  image_url,
  email_addresses,
  username,
}: Partial<User>) => {
  try {
    await connectDB();
    const user = await UserModel.findOneAndUpdate(
      { clerkId: id },
      {
        $set: {
          firstName: first_name,
          lastName: last_name,
          profilePicture: image_url,
          email: email_addresses![0]?.email_address,
          username,
        },
      },
      { new: true },
    );
    return user;
  } catch (err) {
    console.error("Error Updating user: ", err);
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
