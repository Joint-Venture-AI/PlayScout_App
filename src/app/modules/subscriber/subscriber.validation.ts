import { z } from "zod";

export const createSubscriberZodSchema = z.object({
  body: z
    .object({
      email: z.string().email(),
      name: z.string().min(1, "Name is required"),
    })
    .strict(),
});
