import { resetPasswordSchema } from "../../schemas/auth.schema.js";
import { findUserByEmail, updateUser } from "../../services/auth.service.js";
import { hashPassword } from "../../utils/auth.bcrypt.js";
import {
  accessTokenOptions,
  accessTokenTtl,
  refreshTokenOptions,
  refreshTokenTtl,
} from "../../utils/cookies.util.js";
import { signJwt } from "../../utils/jwt.utils.js";

// Reset password endpoint
export async function httpResetPassword(req, res) {
  // Validate user request

  // Expects
  // New password
  // Confirm password
  const validation = resetPasswordSchema.safeParse(req.body);

  if (!validation.success) {
    console.error({ resetPasswordSchemaError: validation.error.errors });
    return res
      .status(400)
      .json({ error: "Bad request, please provide required details" });
  }

  // Get the user from the session
  if (!req.user && !res.locals.user) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const user = req.user || res.locals.user;
  const { email } = user;

  try {
    // Validate the user exists
    const user = await findUserByEmail(email);

    if (!user) {
      return res
        .status(404)
        .json({ code: 404, message: "Invalid credential provided." });
    }
    // Hash new password
    const { password, confirmPassword } = validation.data;

    if (password !== confirmPassword) {
      return res
        .status(400)
        .json({ code: 400, message: "Passwords do not match." });
    }

    const hash = await hashPassword(password);

    // Update user password
    const updateUserDto = { email, password: hash };
    const updatedUser = await updateUser(updateUserDto);

    // Create session
    const accessToken = await signJwt(updatedUser, {
      expiresIn: accessTokenTtl,
    });
    res.cookie("accessToken", accessToken, accessTokenOptions);

    const refreshToken = await signJwt(updatedUser, {
      expiresIn: refreshTokenTtl,
    });
    res.cookie("refreshToken", refreshToken, refreshTokenOptions);

    // Return
    return res.status(200).json({ updatedUser, accessToken, refreshToken });
  } catch (error) {
    return res.status(500).json({ code: 500, message: error.message });
  }
}
