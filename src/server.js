import http from "http";
import config from "../config/defaults.js";
import app from "./app.js";

const server = http.createServer(app);

const PORT = config["port"];

server.listen(PORT, () => console.log(`Listening on port ${PORT}`));
