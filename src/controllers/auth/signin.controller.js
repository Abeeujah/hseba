import { signInSchema } from "../../schemas/auth.schema.js";
import { findUserByEmail } from "../../services/auth.service.js";
import { compareHash } from "../../utils/auth.bcrypt.js";
import {
  accessTokenOptions,
  accessTokenTtl,
  refreshTokenOptions,
  refreshTokenTtl,
} from "../../utils/cookies.util.js";
import { signJwt } from "../../utils/jwt.utils.js";

// Sign in endpoint
export async function httpSignIn(req, res) {
  // Validate user request

  // Expects
  // Email: String && Email
  // Password: String
  const validation = signInSchema.safeParse(req.body);

  if (!validation.success) {
    console.error({ signInSchemaError: validation.error.errors });
    return res.status(400).json({
      code: 400,
      message: "Bad request, please provide valid sign in details",
    });
  }

  const { email, password } = validation.data;

  try {
    // Retrieve user with email
    const user = await findUserByEmail(email, true);

    if (!user) {
      return res
        .status(404)
        .json({ code: 404, message: "Invalid credentials provided" });
    }

    // Compare password
    const result = await compareHash(password, user.password);

    if (!result) {
      return res
        .status(304)
        .json({ code: 304, message: "Incorrect email or password" });
    }

    const { name } = user;
    const ponse = { name, email };
    // Create session
    const accessToken = await signJwt(ponse, { expiresIn: accessTokenTtl });
    res.cookie("accessToken", accessToken, accessTokenOptions);

    const refreshToken = await signJwt(ponse, { expiresIn: refreshTokenTtl });
    res.cookie("refreshToken", refreshToken, refreshTokenOptions);

    // Return
    return res.status(200).json({ user: ponse, accessToken, refreshToken });
  } catch (error) {
    return res.status(500).json({ code: 500, message: error.message });
  }
}
