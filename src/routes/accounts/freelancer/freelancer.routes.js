import { Router } from "express";
import { httpRegisterFreelancer } from "../../../controllers/freelancer/freelancer.controller.js";
import { uploadB2 } from "../../../middleware/backblaze.middleware.js";
import {
  deserializeUser,
  requireUser,
} from "../../../middleware/jwt.middleware.js";
import { freelancerUpload } from "../../../middleware/multer/freelancer.multer.js";

const freelancerRouter = Router();

freelancerRouter.post(
  "/freelancer",
  [deserializeUser, requireUser],
  [freelancerUpload, uploadB2],
  httpRegisterFreelancer
);

export default freelancerRouter;
