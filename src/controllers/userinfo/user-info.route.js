import { Router } from "express";
import {
  httpUpdateCustomerProfile,
  httpUpdateUserInfo,
} from "./user-info.controller.js";
import { deserializeUser } from "../../middleware/jwt.middleware.js";

const profileRouter = Router();

profileRouter.post("/create", deserializeUser, httpUpdateUserInfo);
profileRouter.post("/usertype", deserializeUser, httpUpdateCustomerProfile);

export default profileRouter;
