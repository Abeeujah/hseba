import db from "../../prisma/prisma.client.js";
import { ProfileModel } from "../models/auth/profile.model.js";
import { UserModel } from "../models/auth/user.model.js";
import { findUserByEmail } from "./auth.service.js";

// Create user info
export async function createUserInfo(profileDto) {
  try {
    const { user } = profileDto;
    const userInfo = await ProfileModel.create(profileDto);
    const updateUser = await UserModel.findOneAndUpdate(
      { _id: user },
      { profile: userInfo._id },
      { new: true }
    );
    const { gender, phone, address } = userInfo;

    return { gender, phone, address };
  } catch (error) {
    console.error({ userInfoDbError: error });
    throw new Error("Failed to create user profile");
  }
}

// Update user info
export async function updatedUserInfo(userTypeDto) {
  try {
    const { user, userType } = userTypeDto;
    const userInfo = await ProfileModel.findOneAndUpdate(
      { user },
      { userType },
      { new: true }
    );

    const { gender, phone, address } = userInfo;
    return { gender, phone, address, userType: userInfo.userType };
  } catch (error) {
    console.error({ updateUserInfoError: error });
    throw new Error("Failed to update user type");
  }
}

export async function updateProfile(filter, update) {
  try {
    const profile = await ProfileModel.findOneAndUpdate(filter, update, {
      new: true,
    });

    return profile;
  } catch (error) {
    console.error({ updateProfileError: error });
    throw new Error("Profile update failed");
  }
}

// Get user info
export async function getUserInfo(user) {
  try {
    const userInfo = await ProfileModel.findOne({ user });

    return userInfo;
  } catch (error) {
    console.error({ getUserInfoError: error });
    throw new Error("Failed to get user profile");
  }
}

export async function validateRequest(email) {
  const user = await findUserByEmail(email, true);
  return user.seller;
}

// Delete user info
export async function deleteUserInfo() {
  const userInfo = await db.userInfo.delete({ where: {} });

  return userInfo;
}
