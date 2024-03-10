import pkg from "lodash";
import { signJwt, verifyJwt } from "../utils/jwt.utils.js";
import { findUserByEmail } from "../services/auth.service.js";
import { accessTokenTtl } from "../utils/cookies.util.js";

const { get } = pkg;

export async function getOtpToken(jwt) {
  const { decoded, expired } = await verifyJwt(jwt);

  if (expired) {
    return false;
  }

  if (!decoded || !get(decoded, "otp")) {
    return false;
  }

  const { otp } = decoded;

  return otp;
}

export async function reissueAccessToken(jwt) {
  const { decoded } = await verifyJwt(jwt);

  if (!decoded || !get(decoded, "email")) {
    return false;
  }

  const { email } = decoded;

  const validUser = await findUserByEmail(email);

  if (!validUser) {
    return false;
  }

  const accessToken = await signJwt(decoded, { expiresIn: accessTokenTtl });
  return accessToken;
}

export async function deserializeUser(req, res, next) {
  const otpToken = get(req, "cookies.otpToken");
  const accessToken = get(req, "cookies.accessToken");
  const refreshToken = get(req, "cookies.refreshToken");

  if (!otpToken && !refreshToken && !accessToken) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const { decoded, expired } = await verifyJwt(
    otpToken || refreshToken || accessToken
  );

  if (decoded) {
    const { email } = decoded;
    const exists = await findUserByEmail(email, false);

    if (!exists) {
      return res.status(403).json({ error: "Forbidden" });
    }

    req.user = decoded;
    res.locals.user = decoded;
    return next();
  }

  if (expired && refreshToken) {
    const renewToken = reissueAccessToken(refreshToken);
    res.cookie("accessToken", renewToken, accessTokenOptions);
    const result = verifyJwt(renewToken);
    req.user = result.decoded;
    res.locals.user = decoded;
    return next();
  }

  return next();
}

export async function requireUser(req, res, next) {
  const { user } = req;

  const exists = await findUserByEmail(user.email);

  if (!user && !exists) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  return next();
}
