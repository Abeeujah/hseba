import db from "../../prisma/prisma.client.js";
import { exclude } from "./auth.service.js";

// Create user info
export async function createUserInfo(entity) {
  try {
    const userInfo = await db.userInfo.create({ data: entity });
    const user = exclude(userInfo, ["id", "user"]);

    return user;
  } catch (error) {
    console.error({ userInfoDbError: error });
    throw new Error("Failed to create user profile");
  }
}

// Update user info
export async function updatedUserInfo(entity) {
  const { userEmail, userType } = entity;

  try {
    const userInfo = await db.userInfo.update({
      where: { userEmail },
      data: { userType },
    });
    const gzip = exclude(userInfo, ["id", "user"]);

    return gzip;
  } catch (error) {
    console.error({ updateUserInfoError: error });
    throw new Error("Failed to update user type");
  }
}

// Get user info
export async function getUserInfo() {
  const userInfo = db.userInfo.findUnique({ where: {} });

  return userInfo;
}

// Delete user info
export async function deleteUserInfo() {
  const userInfo = await db.userInfo.delete({ where: {} });

  return userInfo;
}
