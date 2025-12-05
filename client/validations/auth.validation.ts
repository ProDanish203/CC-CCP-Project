import { z } from "zod";

const registerSchema = z.object({
  email: z
    .string({ message: "Email is required" })
    .min(1, { message: "Email is required*" })
    .email({ message: "Invalid email address" }),
  password: z
    .string({ message: "Password is required" })
    .min(1, { message: "Password is required*" })
    .min(6, { message: "Password must be atleast 6 characters" })
    .regex(/^\S*$/, {
      message: "Username should not contain any white spaces",
    }),
  name: z
    .string({ message: "Name is required" })
    .min(1, { message: "Name is required*" })
    .min(3, { message: "Name must be atleast 3 characters" }),
  // username: z
  //   .string({ message: "Username is required" })
  //   .min(1, { message: "Username is required*" })
  //   .min(3, { message: "Username must be atleast 3 characters" })
  //   .regex(/^\S*$/, {
  //     message: "Username should not contain any white spaces",
  //   }),
});

const loginSchema = z.object({
  email: z
    .string({ message: "Email is required*" })
    .min(1, { message: "Email is required*" })
    .email({ message: "Invalid email address" }),
  password: z
    .string({ message: "Password is required*" })
    .min(1, { message: "Password is required*" })
    .min(6, { message: "Password must be atleast 6 characters" }),
});

const forgotPasswordSchema = z.object({
  email: z
    .string({ message: "Email is required*" })
    .min(1, { message: "Email is required*" })
    .email({ message: "Invalid email address" }),
});

const resetPasswordSchema = z
  .object({
    password: z
      .string({ message: "Password is required*" })
      .min(1, { message: "Password is required*" })
      .min(6, { message: "Password must be atleast 6 characters" })
      .regex(/^\S*$/, {
        message: "Username should not contain any white spaces",
      }),
    confirmPassword: z
      .string({ message: "Confirm Password is required*" })
      .min(1, { message: "Confirm Password is required*" })
      .min(6, { message: "Password must be atleast 6 characters" })
      .regex(/^\S*$/, {
        message: "Username should not contain any white spaces",
      }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export {
  registerSchema,
  loginSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
};
