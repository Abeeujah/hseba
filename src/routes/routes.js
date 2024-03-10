import { Router } from "express";
import authRouter from "../controllers/auth/auth.route.js";
import profileRouter from "../controllers/userinfo/user-info.route.js";

const api = Router();

api.use("/auth", authRouter);
api.use("/profile", profileRouter);

export default api;

// Auth
// signup   {name, email, password}
// signin   {email, password}
// forgotpassword   {email}
// resetpassword    {new password, old password}

// Profile
// create   {gender, phone, address}
// usertype {UserType}
