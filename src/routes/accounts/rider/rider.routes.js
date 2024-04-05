import { Router } from "express";
import { httpSetupRider } from "../../../controllers/rider/rider.controller.js";
import { uploadB2 } from "../../../middleware/backblaze.middleware.js";
import {
  deserializeUser,
  requireUser,
} from "../../../middleware/jwt.middleware.js";
import { riderUpload } from "../../../middleware/multer/rider.multer.js";

const riderRouter = Router();

riderRouter.post(
  "/rider",
  [deserializeUser, requireUser],
  [riderUpload, uploadB2],
  httpSetupRider
);

export default riderRouter;
