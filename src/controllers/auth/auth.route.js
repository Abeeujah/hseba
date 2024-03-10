import { Router } from "express";
import {
  httpForgotPassword,
  httpResetPassword,
  httpSignIn,
  httpSignUp,
  httpVerifyOTP,
} from "./auth.controller.js";
import { deserializeUser } from "../../middleware/jwt.middleware.js";

const authRouter = Router();

authRouter.post("/signup", httpSignUp);
authRouter.post("/signin", httpSignIn);
authRouter.post("/forgot-password", httpForgotPassword);
authRouter.post("/verify-otp", httpVerifyOTP);
authRouter.post("/reset-password", deserializeUser, httpResetPassword);

export default authRouter;
