import { Router } from "express";
import authRouter from "./auth/auth.routes.js";
import profileRouter from "./auth/profile.routes.js";
import freelancerRouter from "./accounts/freelancer/freelancer.routes.js";
import riderRouter from "./accounts/rider/rider.routes.js";
import sellerRouter from "./accounts/seller/seller.routes.js";
import productsRouter from "./products/products.routes.js";

const api = Router();

api.use("/auth", authRouter);
api.use("/profile", profileRouter);
api.use("/accounts", freelancerRouter);
api.use("/accounts", riderRouter);
api.use("/accounts", sellerRouter);
api.use("/products", productsRouter);

export default api;
