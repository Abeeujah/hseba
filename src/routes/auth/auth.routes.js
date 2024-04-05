import { Router } from "express";
import { httpForgotPassword } from "../../controllers/auth/forgot-password.controller.js";
import { httpResetPassword } from "../../controllers/auth/reset-password.controller.js";
import { httpSignIn } from "../../controllers/auth/signin.controller.js";
import { httpSignUp } from "../../controllers/auth/signup.controller.js";
import { httpVerifyOTP } from "../../controllers/auth/verify-otp.controller.js";
import {
  deserializeUser,
  requireUser,
} from "../../middleware/jwt.middleware.js";

const authRouter = Router();

authRouter.post("/signup", httpSignUp);
authRouter.post("/signin", httpSignIn);
authRouter.post("/forgot-password", httpForgotPassword);
authRouter.post("/verify-otp", httpVerifyOTP);
authRouter.post(
  "/reset-password",
  [deserializeUser, requireUser],
  httpResetPassword
);

export default authRouter;
