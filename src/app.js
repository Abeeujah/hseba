import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import api from "./routes/routes.js";
import { cpUpload } from "./middleware/multer.middleware.js";
import { uploadB2 } from "./middleware/backblaze.middleware.js";

const app = express();

// Middlewares
app.use(helmet());
app.use(morgan("dev"));
// app.use(
//   cors({
//     credentials: true,
//   })
// );
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/", api);
app.post("/uploads", cpUpload, uploadB2, (req, res) => {
  try {
    // const uploads = [];
    // for (const files of Object.values(req.files)) {
    //   files.forEach((file) => uploads.push({ file }));
    // }

    // uploads.forEach((upload) => console.log(upload));
    // return res.status(200).json(uploads);
    return res.json(res.locals.uploadMapping);
  } catch (error) {
    return res.status(500).json({ code: 500, message: error.message });
  }
});

app.get("/users/:userId/books/:bookId", (req, res) => {
  res.send(req.params);
});

export default app;
