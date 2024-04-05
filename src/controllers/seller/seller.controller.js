import { sellerSetupSchema } from "../../schemas/seller.schema.js";
import { findUserByEmail } from "../../services/auth.service.js";
import { setupSeller } from "../../services/seller.services.js";

export async function httpSellerSetup(req, res) {
  // Get the user from the session
  if (!req.user && !res.locals.user) {
    return res.status(401).json({ code: 401, message: "Unauthorized" });
  }

  const user = req.user || res.locals.user;
  const { email } = user;

  // Extract the image urls from res.locals
  const { uploadMapping } = res.locals;
  const { coverBanner, profilePhoto } = uploadMapping;

  // Validate the request body
  const validation = sellerSetupSchema.safeParse(req.body);

  if (!validation.success) {
    console.error({ validationError: validation.error.errors });
    return res.status(400).json({
      code: 400,
      message:
        "Bad request, Validation error, please provide a valid request payload",
    });
  }

  const { itemsType, location, storeName } = validation.data;

  const sellerSetupDto = {
    itemsType,
    location,
    storeName,
    coverBanner: coverBanner[0],
    profilePhoto: profilePhoto[0],
  };

  try {
    const user = await findUserByEmail(email, true);

    if (!user) {
      return res
        .status(404)
        .json({ code: 404, message: "Invalid user credential." });
    }

    const seller = await setupSeller(
      {
        ...sellerSetupDto,
        userProfile: user._id,
      },
      user
    );

    if (!seller) {
      return res.status(500).json({
        code: 500,
        message: "An unexpected error occured, please try again.",
      });
    }

    return res
      .status(201)
      .json({ message: "Success creating the profile", seller });
  } catch (error) {
    return res.status(500).json({
      code: 500,
      message:
        "Some internal server error occured when processing your request",
    });
  }
}
