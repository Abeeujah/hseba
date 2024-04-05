import { Router } from "express";
import { httpUpdateUserInfo } from "../../controllers/userinfo/update-user-info.controller.js";
import { httpUpdateCustomerProfile } from "../../controllers/userinfo/update-user-type.controller.js";
import {
  deserializeUser,
  requireUser,
} from "../../middleware/jwt.middleware.js";

const profileRouter = Router();

profileRouter.post("/create", deserializeUser, requireUser, httpUpdateUserInfo);
profileRouter.post(
  "/usertype",
  deserializeUser,
  requireUser,
  httpUpdateCustomerProfile
);

export default profileRouter;
