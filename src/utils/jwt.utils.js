import jwt from "jsonwebtoken";
import config from "../../config/defaults.js";

const privateKey = config["privateKey"];
const publicKey = config["publicKey"];

export async function signJwt(object, options) {
  return await jwt.sign(object, privateKey, {
    ...(options && options),
    algorithm: "RS256",
  });
}

export async function verifyJwt(token) {
  try {
    const decoded = await jwt.verify(token, publicKey);
    return { valid: true, expired: false, decoded };
  } catch (error) {
    console.error({ jwtVerifyError: error });
    return {
      valid: false,
      expired: error.message === "jwt expired",
      decoded: null,
    };
  }
}
