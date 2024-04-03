import { FreelancerModel } from "../models/services/freelancer.model.js";

// Create a freelancer record
export async function setupFreelancer(freelancerDto, user) {
  try {
    const freelancer = await FreelancerModel.create(freelancerDto);

    if (!freelancer) {
      return false;
    }

    user.freelancer = freelancer._id;
    await user.save();

    const {
      serviceType,
      bio,
      experienceYears,
      coverBanner,
      profilePhoto,
      externalLink,
      imageReferences,
    } = freelancer;

    return {
      serviceType,
      bio,
      experienceYears,
      coverBanner,
      profilePhoto,
      externalLink,
      imageReferences,
    };
  } catch (error) {
    console.error({ dbError: error });
    throw new Error("Failed to setup freelancer profile.");
  }
}
