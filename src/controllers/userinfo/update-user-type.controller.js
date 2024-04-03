import { userTypeSchema } from "../../schemas/user.schema.js";
import { findUserByEmail } from "../../services/auth.service.js";
import { updateProfile } from "../../services/user-info.services.js";

// Select user type
export async function httpUpdateCustomerProfile(req, res) {
  // Validate user request

  // Expects
  // UserType: "SELLER" | "RIDER" | "SHOPPER" | "FREELANCER" | "SERVICES" | "EXPLORER"
  const validation = userTypeSchema.safeParse(req.body);

  if (!validation.success) {
    console.error({ userTypeError: validation.error.errors });
    return res
      .status(400)
      .json({ code: 400, message: "Please select a valid user type" });
  }

  // Get the user from the session
  if (!req.user && !res.locals.user) {
    return res.status(401).json({ code: 401, message: "Unauthorized" });
  }

  const user = req.user || res.locals.user;
  const { email } = user;

  try {
    // Get customer
    const validUser = await findUserByEmail(email, true);

    if (!validUser) {
      return res
        .status(404)
        .json({ code: 404, message: "Invalid user details" });
    }

    // Update customer type
    const { userType } = validation.data;
    const userInfo = await updateProfile({ user: validUser._id }, { userType });

    if (!userInfo) {
      return res
        .status(500)
        .json({ code: 500, message: "Error occured while updating profile." });
    }

    // Return
    return res.status(200).json({ message: "Updated user info successfully" });
  } catch (error) {
    return res.status(500).json({ code: 500, message: error.message });
  }
}
