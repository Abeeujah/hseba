import { Router } from "express";
import { uploadB2 } from "../../middleware/backblaze.middleware.js";
import {
  deserializeUser,
  requireUser,
} from "../../middleware/jwt.middleware.js";
import { httpRegisterFreelancer } from "./freelancer.controller.js";
import { freelancerUpload } from "./freelancer.multer.js";

const freelancerRouter = Router();

freelancerRouter.post(
  "/freelancer",
  [deserializeUser, requireUser],
  [freelancerUpload, uploadB2],
  httpRegisterFreelancer
);

export default freelancerRouter;
