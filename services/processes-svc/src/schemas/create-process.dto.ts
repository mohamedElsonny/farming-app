import { z } from "zod";

export const CreateProcessDtoSchema = z.object({
  title: z
    .string({
      required_error: "Title is required!",
    })
    .trim()
    .min(1, "Cannot be empty"),
  location: z
    .string({
      required_error: "Location is required!",
    })
    .trim()
    .min(1, "Cannot be empty"),
  landDistance: z.number({ required_error: "Land distance is required!" }),
});

export type CreateProcessDto = z.infer<typeof CreateProcessDtoSchema>;
