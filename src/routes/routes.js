import { Router } from "express";
import authRouter from "../controllers/auth/auth.route.js";
import freelancerRouter from "../controllers/freelancer/freelancer.routes.js";
import riderRouter from "../controllers/rider/rider.routes.js";
import { productsRouter } from "../controllers/seller/products/products.routes.js";
import sellerRouter from "../controllers/seller/seller.routes.js";
import profileRouter from "../controllers/userinfo/user-info.route.js";

const api = Router();

api.use("/auth", authRouter);
api.use("/profile", profileRouter);
api.use("/accounts", freelancerRouter);
api.use("/accounts", riderRouter);
api.use("/accounts", sellerRouter);
api.use("/products", productsRouter);

export default api;
