import { findUserByEmail } from "../../services/auth.service.js";
import { createUserInfo } from "../../services/user-info.services.js";
import { userInfoSchema } from "../../utils/user.schema.js";

// Update user information
export async function httpUpdateUserInfo(req, res) {
  // Validate user request

  // Expects
  // Gender: MALE | FEMALE
  // Phone: String {080xxxxxxxx | +234xxxxxxxxxx}
  // Address: String
  const validation = userInfoSchema.safeParse(req.body);

  if (!validation.success) {
    console.error({ userInfoSchema: validation.error.errors });
    return res
      .status(400)
      .json({ code: 400, message: "Please provide valid information" });
  }

  const { gender, phone, address } = validation.data;

  if (!req.user && !res.locals.user) {
    // Get the user from the session
    return res.status(401).json({ code: 401, message: "Unauthorized" });
  }

  const user = req.user || res.locals.user;
  const { email } = user;

  try {
    // Ensure user is valid
    const validUser = await findUserByEmail(email);

    if (!validUser) {
      return res
        .status(404)
        .json({ code: 404, message: "Invalid user credentials" });
    }

    // Create user profile
    const profileEntity = { gender, phone, address, userEmail: email };
    const userInfo = await createUserInfo(profileEntity);

    // Return
    return res.status(201).json(userInfo);
  } catch (error) {
    return res.status(500).json({ code:500, message: error.message });
  }
}
