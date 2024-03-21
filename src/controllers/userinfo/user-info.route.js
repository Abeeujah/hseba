import { Router } from "express";
import {
  deserializeUser,
  requireUser,
} from "../../middleware/jwt.middleware.js";
import { httpUpdateUserInfo } from "./update-user-info.controller.js";
import { httpUpdateCustomerProfile } from "./update-user-type.controller.js";

const profileRouter = Router();

profileRouter.post("/create", deserializeUser, requireUser, httpUpdateUserInfo);
profileRouter.post(
  "/usertype",
  deserializeUser,
  requireUser,
  httpUpdateCustomerProfile
);

export default profileRouter;
