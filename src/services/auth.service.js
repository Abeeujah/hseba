import db from "../../prisma/prisma.client.js";

// Create user
export async function createUser(entity) {
  const { name, email, password } = entity;
  try {
    const user = await db.user.create({ data: { name, email, password } });
    const gzip = exclude(user, ["id", "password"]);
    return gzip;
  } catch (error) {
    console.log({ dbError: error });
    throw new Error("User creation failed");
  }
}

// Find user by email
export async function findUserByEmail(email, full) {
  try {
    const user = await db.user.findUnique({ where: { email } });
    const gzip = exclude(user, ["id", "password"]);
    if (full) {
      return user;
    }
    return gzip;
  } catch (error) {
    console.log({ dbError: error });
    throw new Error("Retrieve user by email failed");
  }
}

// Update user
export async function updateUser(email, password) {
  try {
    const user = await db.user.update({ where: { email }, data: { password } });
    const gzip = exclude(user, ["id", "password"]);
    return gzip;
  } catch (error) {
    console.log({ dbError: error });
    throw new Error("Failed to update user");
  }
}

// Exclude sensitive fields from returned objects
export function exclude(entity, keys) {
  return Object.fromEntries(
    Object.entries(entity).filter(([key]) => !keys.includes(key))
  );
}
