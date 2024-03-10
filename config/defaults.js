import dotenv from "dotenv";

dotenv.config();

export default {
  port: Number(process.env.PORT),
  salt: Number(process.env.SALT),
  otpTokenTtl: Number(process.env.OTP_TOKEN_TTL),
  accessTokenTtl: Number(process.env.ACCESS_TOKEN_TTL),
  refreshTokenTtl: Number(process.env.REFRESH_TOKEN_TTL),
  privateKey: process.env.PRIVATE_KEY,
  publicKey: process.env.PUBLIC_KEY,
  mailerAccount: process.env.GOOGLE_ACCOUNT,
  mailerPassword: process.env.GOOGLE_PASSWORD,
};
