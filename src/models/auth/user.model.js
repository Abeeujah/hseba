import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    name: { type: String, required: true, min: 3, max: 255 },
    email: { type: String, unique: true, required: true, min: 5, max: 255 },
    password: { type: String, required: true, min: 7 },
    gender: { type: String, enum: ["MALE", "FEMALE"], required: true },
    phone: { type: String, required: true, min: 11, max: 14 },
    address: { type: String, required: true, min: 3, max: 255 },
    userType: {
      type: String,
      required: true,
      default: "EXPLORER",
      enum: [
        "SELLER",
        "RIDER",
        "SHOPPER",
        "FREELANCER",
        "SERVICES",
        "EXPLORER",
      ],
    },
    freelancer: {
      type: Schema.Types.ObjectId,
      ref: "Freelancer",
    },
    rider: {
      type: Schema.Types.ObjectId,
      ref: "Rider",
    },
    seller: {
      type: Schema.Types.ObjectId,
      ref: "Seller",
    },
  },
  { timestamps: true }
);

export const UserModel = model("User", userSchema);
