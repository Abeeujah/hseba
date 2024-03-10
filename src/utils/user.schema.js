import { z } from "zod";
import { Gender, UserType } from "@prisma/client";

export const userInfoSchema = z.object({
  gender: z.nativeEnum(Gender),
  phone: z.string().min(11).max(14),
  address: z.string().min(3).max(255),
});

export const userTypeSchema = z.object({
  userType: z.nativeEnum(UserType),
});
