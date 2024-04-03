import { z } from "zod";

// jobType -> Nature of Service
// bio -> Name and Bio
// experienceYears -> Years of Experience
// coverBanner -> Cover Banner
// profilePhoto -> Profile Photo
// officeAddress -> Shop Location
// externalLink -> External Link
// imageReference -> Image Reference

export const registerFreelancerSchema = z.object({
  serviceType: z.string().min(1).max(255),
  bio: z.string().min(3).max(4000),
  experienceYears: z.number().min(0).max(99),
  externalLink: z.string().optional(),
});
