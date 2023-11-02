import { UserType } from "@prisma/client";
import { z } from "zod";

export const SignupDtoSchema = z.object({
  name: z
    .string({
      required_error: "Name is required",
    })
    .trim()
    .min(1, "Cannot be empty"),
  email: z
    .string({
      required_error: "Email is required",
    })
    .email({ message: "Please enter a valid email address" })
    .trim(),
  password: z
    .string({
      required_error: "Password is required",
    })
    .trim(),
  type: z.nativeEnum(UserType, { required_error: "User type is required!" }),
});

export type SignupDto = z.infer<typeof SignupDtoSchema>;

export const LoginDtoSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Please enter a valid email address" })
    .trim(),
  password: z.string({ required_error: "Password is required" }).trim(),
});

export type LoginDto = z.infer<typeof LoginDtoSchema>;
