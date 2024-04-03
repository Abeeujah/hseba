import { registerFreelancerSchema } from "../../schemas/freelancer.schema.js";
import { findUserByEmail } from "../../services/auth.service.js";
import { setupFreelancer } from "../../services/freelancer.service.js";

export async function httpRegisterFreelancer(req, res) {
  if (!req.user && !res.locals.user) {
    // Get the user from the session
    return res.status(401).json({ code: 401, message: "Unauthorized" });
  }

  const user = req.user || res.locals.user;
  const { email } = user;

  // Validate the incoming request body
  const validation = registerFreelancerSchema.safeParse(req.body);

  if (!validation.success) {
    console.error({ validationError: validation.error.errors });
    return res
      .status(400)
      .json({ code: 400, message: "Validation errors, Bad request" });
  }

  const { bio, experienceYears, serviceType, externalLink } = validation.data;

  // Extract the image urls from res.locals
  const { uploadMapping } = res.locals;
  const { profilePhoto, coverBanner, imageReferences } = uploadMapping;

  // Create the freelancer DTO
  const freelancerDto = {
    serviceType,
    bio,
    experienceYears,
    externalLink: externalLink || undefined,
    userEmail: email,
    profilePhoto: profilePhoto[0],
    coverBanner: coverBanner[0],
    imageReferences,
  };

  try {
    const user = await findUserByEmail(email, true);

    if (!user) {
      return res
        .status(404)
        .json({ code: 404, message: "Invalid user credential." });
    }

    const freelancer = await setupFreelancer(
      {
        ...freelancerDto,
        userProfile: user._id,
      },
      user
    );

    if (!freelancer) {
      return res.status(500).json({
        code: 500,
        message: "An unexpected error occured, please try again.",
      });
    }

    return res
      .status(201)
      .json({ message: "Success creating the profile", freelancer });
  } catch (error) {
    console.error({ serverError: error.message });
    return res.status(500).json({
      code: 500,
      message:
        "Some internal server error occured when processing your request",
    });
  }
}
