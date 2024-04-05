import { z } from "zod";

export const createProductSchema = z.object({
  name: z.string().min(2).max(255),
  description: z.string().min(3).max(4000),
  price: z
    .string()
    .transform((val) => parseFloat(val))
    .pipe(z.number().positive()),
  category: z.string().min(3).max(255),
});

export const updateProductSchema = z.object({
  name: z.string().min(2).max(255).optional(),
  description: z.string().min(3).max(4000).optional(),
  price: z
    .string()
    .transform((val) => parseFloat(val))
    .pipe(z.number().positive())
    .optional(),
  category: z.string().min(3).max(255).optional(),
});
