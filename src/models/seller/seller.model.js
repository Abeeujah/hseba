import { Schema, model } from "mongoose";

const sellerSchema = new Schema(
  {
    storeName: { type: String, required: true, unique: true, min: 3, max: 255 },
    itemsType: { type: String, required: true, min: 3, max: 255 },
    coverBanner: { type: String, required: true, min: 3, max: 255 },
    profilePhoto: { type: String, required: true, min: 3, max: 255 },
    location: { type: String, required: true, min: 3, max: 255 },
    rating: { type: Number, min: 0, max: 5 },
    totalSales: { type: Number, min: 0, default: 0 },
    totalEarnings: { type: Number, min: 0, default: 0 },
    isActive: { type: Boolean, default: true },
    isHibernated: { type: Boolean, default: false },
    userProfile: { type: Schema.Types.ObjectId, ref: "User", unique: true },
    products: [{ type: Schema.Types.ObjectId, ref: "Product" }],
  },
  { timestamps: true }
);

export const SellerModel = model("Seller", sellerSchema);
