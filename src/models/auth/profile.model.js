import { Schema, model } from "mongoose";

const profileSchema = new Schema(
  {
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
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      unique: true,
      required: true,
    },
    freelancer: {
      type: Schema.Types.ObjectId,
      ref: "Freelancer",
      unique: true,
    },
    rider: {
      type: Schema.Types.ObjectId,
      ref: "Rider",
      unique: true,
    },
    seller: {
      type: Schema.Types.ObjectId,
      ref: "Seller",
      unique: true,
    },
  },
  { timestamps: true }
);

export const ProfileModel = model("Profile", profileSchema);
