import { Router } from "express";
import { httpViewProductById } from "../../controllers/products/products.controller.js";

const productsRouter = Router();

productsRouter.get("/:productId", httpViewProductById);

export default productsRouter;
