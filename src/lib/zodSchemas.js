import { z } from "zod";

const IRAN_PHONE_REGEX =
  /^(0[1-9]\d{9}|09[1-9]\d{8})$/;

export const phoneNumberSchema =
  z.object({
    contactNumber: z
      .string({
        message:
          "شماره تلفن معتبر نیست",
      })
      .trim()
      .min(1, {
        message:
          " شماره باید ۱۱ رقم باشد",
      })
      .regex(IRAN_PHONE_REGEX, {
        message: "شماره معتبر نیست",
      }),
  });

export const otpCodeSchema = z.object({
  otpNumber: z
    .string({
      message: "فرمت کد صحیح نیست ",
    })
    .length(
      6,
      "کد تایید باید ۶ رقم باشد ",
    )
    .regex(
      /^\d{6}$/,
      "فقط اعداد مجاز هستند ",
    ),
  contactNumber: z
    .string({
      message: "شماره تلفن معتبر نیست ",
    })
    .trim()
    .min(1, {
      message:
        " شماره باید ۱۱ رقم باشد ",
    })
    .regex(IRAN_PHONE_REGEX, {
      message: "شماره معتبر نیست ",
    }),
});

export const updateProfileSchema =
  z.object({
    firstName: z
      .string()
      .trim()
      .min(
        2,
        "First name must contain at least 2 characters.",
      )
      .max(30),

    lastName: z
      .string()
      .trim()
      .min(
        2,
        "Last name must contain at least 2 characters.",
      )
      .max(30),

    nationalId: z
      .string()
      .regex(
        /^\d{10}$/,
        "National ID must be exactly 10 digits.",
      ),

    birthDate: z
      .string()
      .min(
        1,
        "Birth date is required.",
      ),

    gender: z.enum(["male", "female"], {
      message:
        "Please select your gender.",
    }),

    email: z
      .string()
      .trim()
      .email(
        "Please enter a valid email address.",
      )
      .or(z.literal("")),

    address: z
      .string()
      .trim()
      .min(10, "Address is too short.")
      .max(300),
  });
