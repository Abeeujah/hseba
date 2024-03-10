import { z } from "zod";

export const signUpSchema = z.object({
  name: z.string().min(3).max(255),
  email: z.string().email().min(5).max(255),
  password: z.string().min(7).max(255),
});

export const signInSchema = z.object({
  email: z.string().email().min(5).max(255),
  password: z.string().min(7).max(255),
});

export const forgotPasswordSchema = z.object({
  email: z.string().email().min(5).max(255),
});

export const resetPasswordSchema = z.object({
  password: z.string().min(7).max(255),
  confirmPassword: z.string().min(7).max(255),
});

export const otpTokenSchema = z.object({
  otp: z.string().min(5).max(5),
});
