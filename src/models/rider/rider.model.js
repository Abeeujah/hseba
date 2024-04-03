import { Schema, model } from "mongoose";

const riderSchema = new Schema(
  {
    vehicleModel: { type: String, required: true, min: 3, max: 255 },
    vehicleName: { type: String, required: true, min: 3, max: 255 },
    vehiclePlateNumber: { type: String, required: true, min: 3, max: 255 },
    riderPicture: { type: String, required: true, min: 3, max: 255 },
    vehiclePicture: { type: String, required: true, min: 3, max: 255 },
    vehicleDocument: { type: String, required: true, min: 3, max: 255 },
    location: { type: String, required: true, min: 3, max: 255 },
    rating: { type: Schema.Types.Decimal128, min: 0, max: 5 },
    totalTrips: { type: Number, default: 0, min: 0 },
    totalEarnings: { type: Number, default: 0, min: 0 },
    isActive: { type: Boolean, default: true },
    hibernated: { type: Boolean, default: false },
    userProfile: { type: Schema.Types.ObjectId, ref: "User", unique: true },
  },
  { timestamps: true }
);

export const RiderModel = model("Rider", riderSchema);
