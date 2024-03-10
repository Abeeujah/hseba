import config from "../../config/defaults.js";

export const accessTokenTtl = config["accessTokenTtl"];
export const refreshTokenTtl = config["refreshTokenTtl"];
export const otpTokenTtl = config["otpTokenTtl"];

export const accessTokenOptions = {
  maxAge: accessTokenTtl,
  httpOnly: true,
  domain: "localhost",
  path: "/",
  sameSite: "strict",
  secure: false,
};

export const refreshTokenOptions = {
  ...accessTokenOptions,
  maxAge: refreshTokenTtl,
};

export const otpTokenOptions = {
  ...accessTokenOptions,
  maxAge: otpTokenTtl,
};
