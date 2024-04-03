import { z } from "zod";

export const sellerSetupSchema = z.object({
  storeName: z.string().min(3).max(255),
  itemsType: z.string().min(3).max(255),
  location: z.string().min(3).max(255),
});
