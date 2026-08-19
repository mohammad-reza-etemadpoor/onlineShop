import { z } from "zod";

//#region phone
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
//#endregion

//#region otp
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
//#endregion

//#region profile
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
//endregion

//#region product
export const productSchema = z.object({
  title: z
    .string()
    .min(1, "Product name is required")
    .max(
      100,
      "Product name is too long",
    ),

  description: z
    .string()
    .min(1, "Description is required"),

  category: z.enum([
    "Girls",
    "Boys",
    "Newborn",
    "Maternity",
  ]),

  tags: z.array(z.string()).default([]),

  images: z
    .array(z.string())
    .min(
      1,
      "At least one image is required",
    ),

  price: z
    .number()
    .min(0, "Price cannot be negative"),

  discount: z.number().min(0).max(100),

  material: z.string().optional(),

  featured: z.boolean().default(false),

  isActive: z.boolean().default(true),

  variants: z
    .array(
      z.object({
        color: z.object({
          name: z
            .string()
            .min(
              1,
              "Color name is required",
            ),

          hex: z
            .string()
            .min(
              1,
              "Color is required",
            ),
        }),

        size: z.string(),

        stock: z.number().int().min(0),

        barcode: z.string().optional(),
      }),
    )
    .min(
      1,
      "At least one variant is required",
    ),
});
//endregion
