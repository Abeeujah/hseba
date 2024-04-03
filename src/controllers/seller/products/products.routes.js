import { Router } from "express";
import { uploadB2 } from "../../../middleware/backblaze.middleware.js";
import {
  deserializeUser,
  requireUser,
} from "../../../middleware/jwt.middleware.js";
import {
  httpCreateProduct,
  httpDeleteProductById,
  httpViewProductById,
  httpViewSellerProducts,
} from "./products.controller.js";
import { productImagesUpload } from "./products.multer.js";

export const productsRouter = Router();
export const sellerProductsRouter = Router();

sellerProductsRouter.post(
  "/:sellerId/products",
  [deserializeUser, requireUser],
  [productImagesUpload, uploadB2],
  httpCreateProduct
);
sellerProductsRouter.patch(
  "/:sellerId/products",
  [deserializeUser, requireUser],
  [productImagesUpload, uploadB2],
  httpCreateProduct
);

sellerProductsRouter.get("/:sellerId/products", httpViewSellerProducts);
sellerProductsRouter.delete(
  "/:sellerId/products/:productId",
  [deserializeUser, requireUser],
  httpDeleteProductById
);

productsRouter.get("/:productId", httpViewProductById);
