import { Router } from "express";
import {
  deserializeUser,
  requireUser,
} from "../../middleware/jwt.middleware.js";
import { httpForgotPassword } from "./forgot-password.controller.js";
import { httpResetPassword } from "./reset-password.controller.js";
import { httpSignIn } from "./signin.controller.js";
import { httpSignUp } from "./signup.controller.js";
import { httpVerifyOTP } from "./verify-otp.controller.js";

const authRouter = Router();

authRouter.post("/signup", httpSignUp);
authRouter.post("/signin", httpSignIn);
authRouter.post("/forgot-password", httpForgotPassword);
authRouter.post("/verify-otp", httpVerifyOTP);
authRouter.post(
  "/reset-password",
  deserializeUser,
  requireUser,
  httpResetPassword
);

export default authRouter;
