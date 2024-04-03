import { Router } from "express";
import { uploadB2 } from "../../middleware/backblaze.middleware.js";
import {
  deserializeUser,
  requireUser,
} from "../../middleware/jwt.middleware.js";
import { httpSetupRider } from "./rider.controller.js";
import { riderUpload } from "./rider.multer.js";

const riderRouter = Router();

riderRouter.post(
  "/rider",
  [deserializeUser, requireUser],
  [riderUpload, uploadB2],
  httpSetupRider
);

export default riderRouter;
