import { z } from "zod";

export const formLogin = z.object({
  email: z.string().min(2, "Email field is required.").default(""),
  password: z.string().min(2, "Password field is required.").default(""),
});

export const formPasswordReset = z.object({
  email: z.string().min(2, "Email field is required.").default(""),
});

export const formNewPassword = z.object({
  password: z.string().min(2, "Password field is required.").default(""),
  confirmPassword: z.string().min(2, "Comfirm password field is required.").default(""),
});

export const formUpdateUser = z.object({
  passwordReset: z
    .object({
      currentPassword: z.string().optional(),
      password: z.string().optional(),
      confirmPassword: z.string().optional(),
    })
    .optional(),
  email: z.string().optional(),
  lastname: z.string().optional(),
  firstname: z.string().optional(),
});

export const formStep1 = z.object({
  firstname: z.string().min(2, "Firstname field is required.").default(""),
  lastname: z.string().min(2, "Lastname field is required.").default(""),
  phone: z
    .string()
    .regex(/^\d+(\.\d+)?$/, "Table number must be a valid number.")
    .min(11, "Phone field is required.")
    .default(""),
  gender: z.string().min(1, "Gender field is required.").default(""),
  email: z.string().optional(),
  matricNo: z.string().optional(),
  dob: z.date({
    required_error: "Date of birth is required.",
  }),
});

export const formStep2 = z.object({
  courses: z
    .array(
      z
        .object({
          title: z.string().optional(),
          cohort: z.number().optional(),
          day: z.string().optional(),
          time: z.string().optional(),
          id: z.number().optional(),
        })
        .optional()
    )
    .optional(),
});
