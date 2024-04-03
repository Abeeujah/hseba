import { z } from "zod";

export const createProductSchema = z.object({
  name: z.string().min(2).max(255),
  description: z.string().min(3).max(4000),
  price: z.number().min(0),
  category: z.string().min(3).max(255),
});
