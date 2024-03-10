import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import api from "./routes/routes.js";

const app = express();

// Middlewares
app.use(helmet());
app.use(morgan("combined"));
// app.use(
//   cors({
//     credentials: true,
//   })
// );
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/", api);
app.get("/auth/signup", (req, res) => res.send("Works"));

export default app;
