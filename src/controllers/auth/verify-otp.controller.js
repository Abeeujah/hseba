import pkg from "lodash";
import { getOtpToken } from "../../middleware/jwt.middleware.js";
import { otpTokenSchema } from "../../schemas/auth.schema.js";

const { get } = pkg;

// Verify OTP endpoint
export async function httpVerifyOTP(req, res) {
  // Validate user request

  // Expects
  // OTP: String
  const validation = otpTokenSchema.safeParse(req.body);

  if (!validation.success) {
    console.error({ otpMissingError: validation.error.errors });
    return res
      .status(400)
      .json({ code: 400, message: "Please provide your OTP." });
  }

  const clientOTP = Number(validation.data.otp);

  try {
    // Get OTP from cookie
    const otpToken = get(req, "cookies.otpToken");
    const serverOTP = await getOtpToken(otpToken);

    // Confirm if it's still valid
    if (!serverOTP) {
      return res
        .status(408)
        .json({ code: 408, message: "OTP Expired, please request again." });
    }

    // Verify client OTP input matches server OTP
    if (!(clientOTP === serverOTP)) {
      return res.status(400).json({ otpInvalidError: "Invalid OTP provided" });
    }

    // Return
    // A redirect to reset password endpoint from here
    return res.status(200).json({ message: "success" });
  } catch (error) {
    return res.status(500).json({ code: 500, message: error.message });
  }
}
