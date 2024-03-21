import http from "http";
import config from "../config/defaults.js";
import app from "./app.js";
import { swaggerDocs } from "./docs/swagger.js";

const server = http.createServer(app);

const PORT = config["port"];

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);

  swaggerDocs(app, PORT);
});
