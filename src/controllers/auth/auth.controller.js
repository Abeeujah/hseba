import pkg from "lodash";
import db from "../../../prisma/prisma.client.js";
import { getOtpToken } from "../../middleware/jwt.middleware.js";
import {
  createUser,
  findUserByEmail,
  updateUser,
} from "../../services/auth.service.js";
import { compareHash, hashPassword } from "../../utils/auth.bcrypt.js";
import {
  forgotPasswordSchema,
  otpTokenSchema,
  resetPasswordSchema,
  signInSchema,
  signUpSchema,
} from "../../utils/auth.schema.js";
import {
  accessTokenOptions,
  accessTokenTtl,
  otpTokenOptions,
  otpTokenTtl,
  refreshTokenOptions,
  refreshTokenTtl,
} from "../../utils/cookies.util.js";
import { signJwt } from "../../utils/jwt.utils.js";
import sendMail from "../../utils/mail.util.js";
import generateRandomNDigits from "../../utils/otp.util.js";

const { get } = pkg;

// Sign up endpoint
export async function httpSignUp(req, res) {
  // Validate user request

  // Expects
  // Name: String
  // Email: String && Email
  // Password: String
  const validation = signUpSchema.safeParse(req.body);

  if (!validation.success) {
    console.log({ signUpSchemaError: validation.error.errors });
    return res
      .status(400)
      .json({ error: "Bad request, please provide valid sign up details" });
  }

  const { name, email, password } = validation.data;

  try {
    // Hash password
    const hash = await hashPassword(password);

    // Store name, email, and password to db
    const user = await createUser({ name, email, password: hash });

    // Create session
    const accessToken = await signJwt(user, { expiresIn: accessTokenTtl });
    res.cookie("accessToken", accessToken, accessTokenOptions);

    const refreshToken = await signJwt(user, { expiresIn: refreshTokenTtl });
    res.cookie("refreshToken", refreshToken, refreshTokenOptions);

    // Return
    // Redirect to home page
    return res.status(201).json({ user, accessToken, refreshToken });
  } catch (error) {
    return res.status(500).json({ serverError: error.message });
  }
}

// Sign in endpoint
export async function httpSignIn(req, res) {
  // Validate user request

  // Expects
  // Email: String && Email
  // Password: String
  const validation = signInSchema.safeParse(req.body);

  if (!validation.success) {
    console.log({ signInSchemaError: validation.error.errors });
    return res
      .status(400)
      .json({ error: "Bad request, please provide valid sign in details" });
  }

  const { email, password } = validation.data;

  try {
    // Retrieve user with email
    const user = await findUserByEmail(email, true);

    if (!user) {
      return res.status(404).json({ error: "Invalid credentials provided" });
    }

    // Compare password
    const result = await compareHash(password, user.password);

    if (!result) {
      return res.status(304).json({ error: "Incorrect email or password" });
    }

    // Create session
    const accessToken = await signJwt(user, { expiresIn: accessTokenTtl });
    res.cookie("accessToken", accessToken, accessTokenOptions);

    const refreshToken = await signJwt(user, { expiresIn: refreshTokenTtl });
    res.cookie("refreshToken", refreshToken, refreshTokenOptions);

    // Return
    return res.status(200).json({ email, accessToken, refreshToken });
  } catch (error) {
    return res.status(500).json({ serverError: error.message });
  }
}

// Forgot password endpoint
export async function httpForgotPassword(req, res) {
  // Validate user request

  // Expects
  // Email: String && Email
  const validation = forgotPasswordSchema.safeParse(req.body);

  if (!validation.success) {
    console.log({ forgotPasswordSchemaError: validation.error.errors });
    return res
      .status(400)
      .json({ error: "Bad request, please provide required details" });
  }

  const { email } = validation.data;

  try {
    // Verify user with email exists
    const user = await findUserByEmail(email, false);

    // Generate OTP and send to the email address
    const otp = generateRandomNDigits();
    console.log({ otp });

    const mail = await sendMail({
      recipient: email,
      message: otp,
      subject: "OTP Verification",
    });

    // Create a session
    const otpToken = await signJwt(
      { ...user, otp },
      { expiresIn: otpTokenTtl }
    );
    res.cookie("otpToken", otpToken, otpTokenOptions);

    // Return
    // A redirect will to verify otp endpoint
    return res
      .status(200)
      .json({ success: "Otp sent to your email address.", otpToken });
  } catch (error) {
    return res.status(500).json({ serverError: error.message });
  }
}

// Verify OTP endpoint
export async function httpVerifyOTP(req, res) {
  // Validate user request

  // Expects
  // OTP: String
  const validation = otpTokenSchema.safeParse(req.body);

  if (!validation.success) {
    console.error({ otpMissingError: validation.error.errors });
    return res
      .status(400)
      .json({ otpMissingError: "Please provide your OTP." });
  }

  const clientOTP = Number(validation.data.otp);

  try {
    // Get OTP from cookie
    const otpToken = get(req, "cookies.otpToken");
    const serverOTP = await getOtpToken(otpToken);

    // Confirm if it's still valid
    if (!serverOTP) {
      return res
        .status(408)
        .json({ otpError: "OTP Expired, please request again." });
    }

    // Verify client OTP input matches server OTP
    if (!(clientOTP === serverOTP)) {
      return res.status(400).json({ otpInvalidError: "Invalid OTP provided" });
    }

    // Return
    // A redirect to reset password endpoint from here
    return res.status(200).json({ message: "success" });
  } catch (error) {
    return res.status(500).json({ serverError: error.message });
  }
}

// Reset password endpoint
export async function httpResetPassword(req, res) {
  // Validate user request

  // Expects
  // New password
  // Confirm password
  const validation = resetPasswordSchema.safeParse(req.body);

  if (!validation.success) {
    console.log({ resetPasswordSchemaError: validation.error.errors });
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
    // Hash new password
    const { password, confirmPassword } = validation.data;

    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords do not match." });
    }

    const hash = await hashPassword(password);

    // Update user password
    const updatedUser = await updateUser(email, hash);
    console.log(updatedUser);

    // Create session
    const accessToken = await signJwt(updatedUser, {
      expiresIn: accessTokenTtl,
    });
    console.log({ accessToken });
    res.cookie("accessToken", accessToken, accessTokenOptions);

    const refreshToken = await signJwt(updatedUser, {
      expiresIn: refreshTokenTtl,
    });
    res.cookie("refreshToken", refreshToken, refreshTokenOptions);

    // Return
    return res.status(200).json({ updatedUser, accessToken, refreshToken });
  } catch (error) {
    return res.status(500).json({ serverError: error.message });
  }
}
