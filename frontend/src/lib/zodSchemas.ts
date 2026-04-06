import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.number().optional(),
  message: z.string().min(1),
});
