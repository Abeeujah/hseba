import { Schema, model } from "mongoose";

const productSchema = new Schema({
  name: { type: String, required: true, max: 255 },
  description: { type: String, required: true, min: true, max: 4000 },
  price: { type: Number, required: true, min: 0 },
  category: { type: String, required: true, min: 3, max: 255 },
  quantity: { type: Number, min: 1 },
  images: [{ type: String, required: true, min: 3, max: 255 }],
  seller: { type: Schema.Types.ObjectId, ref: "Seller" },
});

export const ProductModel = model("Product", productSchema);
