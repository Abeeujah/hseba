import { Router } from "express";
import {
  httpCreateProduct,
  httpDeleteProductById,
  httpUpdateProduct,
  httpViewSellerProducts,
} from "../../../controllers/products/products.controller.js";
import { httpSellerSetup } from "../../../controllers/seller/seller.controller.js";
import { uploadB2 } from "../../../middleware/backblaze.middleware.js";
import {
  deserializeUser,
  requireUser,
} from "../../../middleware/jwt.middleware.js";
import { productImagesUpload } from "../../../middleware/multer/products.multer.js";
import { sellerUpload } from "../../../middleware/multer/seller.multer.js";

const sellerRouter = Router();

sellerRouter.post(
  "/seller",
  [deserializeUser, requireUser],
  [sellerUpload, uploadB2],
  httpSellerSetup
);

sellerRouter.get("/seller/:sellerId/products", httpViewSellerProducts);
sellerRouter.post(
  "/seller/:sellerId/products",
  [deserializeUser, requireUser],
  [productImagesUpload, uploadB2],
  httpCreateProduct
);
sellerRouter.patch(
  "/seller/:sellerId/products/:productId",
  [deserializeUser, requireUser],
  [productImagesUpload, uploadB2],
  httpUpdateProduct
);
sellerRouter.delete(
  "/seller/:sellerId/products/:productId",
  [deserializeUser, requireUser],
  httpDeleteProductById
);

export default sellerRouter;
