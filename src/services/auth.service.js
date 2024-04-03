import { UserModel } from "../models/auth/user.model.js";

// Create user
export async function createUser(userDto) {
  try {
    const createdUser = await UserModel.create(userDto);

    if (!createdUser) {
      return false;
    }
    
    const { name, email } = createdUser;
    return { name, email };
  } catch (error) {
    console.error({ dbError: error });
    throw new Error("User creation failed");
  }
}

// Find user by email
export async function findUserByEmail(email, full) {
  try {
    const user = await UserModel.findOne({ email });

    if (full) {
      return user;
    }

    return { name: user.name, email };
  } catch (error) {
    console.error({ dbError: error });
    throw new Error("Retrieve user by email failed");
  }
}

// Update user
export async function updateUser(updateUserDto) {
  try {
    const { email, password } = updateUserDto;
    const user = await UserModel.findOneAndUpdate(
      { email },
      { password },
      { new: true }
    );

    return { name: user.name, email };
  } catch (error) {
    console.error({ dbError: error });
    throw new Error("Failed to update user");
  }
}

// Exclude sensitive fields from returned objects
export function exclude(entity, keys) {
  return Object.fromEntries(
    Object.entries(entity).filter(([key]) => !keys.includes(key))
  );
}
