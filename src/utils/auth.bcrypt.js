import bcryptjs from "bcryptjs";
import config from "../../config/defaults.js";

// Hash Utility function
export async function hashPassword(plain) {
  try {
    const rounds = config["salt"];

    const salt = bcryptjs.genSaltSync(rounds);
    const hash = await bcryptjs.hashSync(plain, salt);

    return hash;
  } catch (error) {
    console.error({ hashError: error });
    throw new Error("Failed to hash password");
  }
}

// Password compare utility function
export async function compareHash(plain, hashed) {
  try {
    const success = await bcryptjs.compareSync(plain, hashed);
    console.log({ success });
    return success;
  } catch (error) {
    console.error({ compareError: error });
    throw new Error("Could not complete password compare");
  }
}
