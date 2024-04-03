import { Router } from "express";
import { uploadB2 } from "../../middleware/backblaze.middleware.js";
import {
  deserializeUser,
  requireUser,
} from "../../middleware/jwt.middleware.js";
import { sellerProductsRouter } from "./products/products.routes.js";
import { httpSellerSetup } from "./seller.controller.js";
import { sellerUpload } from "./seller.multer.js";

const sellerRouter = Router();

sellerRouter.post(
  "/seller",
  [deserializeUser, requireUser],
  [sellerUpload, uploadB2],
  httpSellerSetup
);

sellerRouter.use("/seller", sellerProductsRouter);

export default sellerRouter;
