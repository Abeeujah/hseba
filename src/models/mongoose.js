import mongoose from "mongoose";
import defaults from "../../config/defaults.js";

const dbUri = defaults["dbUri"];

mongoose.set("strictQuery", true);
mongoose.connection.once("open", () => {
  console.log("Database Connection Successful");
});

mongoose.connection.on("error", (err) => {
  console.error(err);
});

export async function mongoConnect() {
  await mongoose.connect(dbUri);
}

export async function mongoDisconnect() {
  await mongoose.disconnect();
}
