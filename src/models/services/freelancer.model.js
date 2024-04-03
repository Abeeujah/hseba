import { Schema, model } from "mongoose";

const freelancerSchema = new Schema(
  {
    serviceType: { type: String, required: true, min: 3, max: 255 },
    bio: { type: String, required: true, min: 3, max: 255 },
    experienceYears: { type: Number, required: true, min: 0, max: 90 },
    coverBanner: { type: String, required: true, min: 3, max: 255 },
    profilePhoto: { type: String, required: true, min: 3, max: 255 },
    externalLink: { type: String, min: 3, max: 255 },
    imageReferences: [{ type: String, required: true, min: 3, max: 255 }],
    rating: { type: Schema.Types.Decimal128, min: 0, max: 5 },
    totalBookings: { type: Number, min: 0, default: 0 },
    totalEarnings: { type: Number, min: 0, default: 0 },
    isActive: { type: Boolean, default: true },
    isHibernated: { type: Boolean, default: false },
    userProfile: { type: Schema.Types.ObjectId, ref: "User", unique: true },
  },
  { timestamps: true }
);

export const FreelancerModel = model("Freelancer", freelancerSchema);
