import { signUpSchema } from "../../schemas/auth.schema.js";
import { createUser } from "../../services/auth.service.js";
import { hashPassword } from "../../utils/auth.bcrypt.js";
import {
  accessTokenOptions,
  accessTokenTtl,
  refreshTokenOptions,
  refreshTokenTtl,
} from "../../utils/cookies.util.js";
import { signJwt } from "../../utils/jwt.utils.js";

// Sign up endpoint
export async function httpSignUp(req, res) {
  // Validate user request
  const validation = signUpSchema.safeParse(req.body);

  if (!validation.success) {
    console.error({ signUpSchemaError: validation.error.errors });
    return res.status(400).json({
      code: 400,
      message: "Bad request, please provide valid sign up details",
    });
  }

  const { name, email, password, address, gender, phone } = validation.data;

  try {
    // Hash password
    const hash = await hashPassword(password);

    // Store name, email, and password to db
    const user = await createUser({
      name,
      email,
      address,
      gender,
      phone,
      password: hash,
    });

    if (!user) {
      throw new Error(
        "Unexpected error occured while signing you up, please try again."
      );
    }

    // Create session
    const accessToken = await signJwt(user, { expiresIn: accessTokenTtl });
    res.cookie("accessToken", accessToken, accessTokenOptions);

    const refreshToken = await signJwt(user, { expiresIn: refreshTokenTtl });
    res.cookie("refreshToken", refreshToken, refreshTokenOptions);

    // Return
    // Redirect to home page
    return res.status(201).json({ user, accessToken, refreshToken });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ code: 500, message: error.message });
  }
}
