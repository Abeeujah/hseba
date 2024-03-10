import { findUserByEmail } from "../../services/auth.service.js";
import {
  createUserInfo,
  updatedUserInfo,
} from "../../services/user-info.services.js";
import { userInfoSchema, userTypeSchema } from "../../utils/user.schema.js";

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
      .json({ userInfoSchemaError: "Please provide valid information" });
  }

  const { gender, phone, address } = validation.data;

  if (!req.user && !res.locals.user) {
    // Get the user from the session
    return res.status(401).json({ error: "Unauthorized" });
  }

  const user = req.user || res.locals.user;
  const { email } = user;

  try {
    // Ensure user is valid
    const validUser = await findUserByEmail(email);

    if (!validUser) {
      return res
        .status(404)
        .json({ invalidUserError: "Invalid user credentials" });
    }

    // Create user profile
    const profileEntity = { gender, phone, address, userEmail: email };
    const userInfo = await createUserInfo(profileEntity);

    // Return
    return res.status(201).json(userInfo);
  } catch (error) {
    return res.status(500).json({ serverError: error.message });
  }
}

// Select user type
export async function httpUpdateCustomerProfile(req, res) {
  // Validate user request

  // Expects
  // UserType: "SELLER" | "RIDER" | "SHOPPER" | "FREELANCER" | "SERVICES" | "EXPLORER"
  const validation = userTypeSchema.safeParse(req.body);

  console.log(validation.data);

  if (!validation.success) {
    console.error({ userTypeError: validation.error.errors });
    return res
      .status(400)
      .json({ userTypeError: "Please select a valid user type" });
  }

  // Get the user from the session
  if (!req.user && !res.locals.user) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const user = req.user || res.locals.user;
  const { email } = user;

  try {
    // Get customer
    const validUser = await findUserByEmail(email);

    if (!validUser) {
      return res.status(400).json({ userError: "Invalid user details" });
    }

    // Update customer type
    const { userType } = validation.data;
    const customerEntity = { userEmail: validUser.email, userType };

    const userInfo = await updatedUserInfo(customerEntity);

    // Return
    return res.status(200).json({ success: "Updated user info successfully" });
  } catch (error) {
    return res.status(500).json({ serverError: error.message });
  }
}
