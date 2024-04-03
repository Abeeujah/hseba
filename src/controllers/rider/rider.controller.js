import { riderSetupSchema } from "../../schemas/rider.schema.js";
import { findUserByEmail } from "../../services/auth.service.js";
import { setupRider } from "../../services/rider.services.js";

export async function httpSetupRider(req, res) {
  if (!req.user && !res.locals.user) {
    // Get the user from the session
    return res.status(401).json({ code: 401, message: "Unauthorized" });
  }

  const user = req.user || res.locals.user;
  const { email } = user;

  // Validate the request
  const validation = riderSetupSchema.safeParse(req.body);

  if (!validation.success) {
    console.error({ validationError: validation.error.errors });
    return res.status(400).json({
      code: 400,
      message:
        "Bad request, Validation error, please provide a valid request payload",
    });
  }

  const { location, vehicleName, vehiclePlateNumber, vehicleModel } =
    validation.data;

  // Extract the image urls from res.locals
  const { uploadMapping } = res.locals;
  const { riderPicture, vehiclePicture, vehicleDocument } = uploadMapping;

  // Create the entity
  const riderDto = {
    location,
    vehicleName,
    vehiclePlateNumber,
    vehicleModel,
    userEmail: email,
    riderPicture: riderPicture[0],
    vehiclePicture: vehiclePicture[0],
    vehicleDocument: vehicleDocument[0],
  };

  try {
    const user = await findUserByEmail(email, true);

    if (!user) {
      return res
        .status(404)
        .json({ code: 404, message: "Invalid user credential." });
    }

    const rider = await setupRider(
      { ...riderDto, userProfile: user._id },
      user
    );

    if (!rider) {
      return res.status(500).json({
        code: 500,
        message: "An unexpected error occured, please try again.",
      });
    }

    // Return
    return res
      .status(201)
      .json({ message: "Success creating the profile", rider });
  } catch (error) {
    console.error({ serverError: error.message });
    return res.status(500).json({
      code: 500,
      message:
        "Some internal server error occured when processing your request",
    });
  }
}
