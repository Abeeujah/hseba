import { z } from "zod";

export const riderSetupSchema = z.object({
  vehicleModel: z.string().min(3).max(255),
  vehicleName: z.string().min(3).max(255),
  vehiclePlateNumber: z.string().min(3).max(25),
  location: z.string().min(3).max(255),
});
