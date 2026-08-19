"use server";

import { parseWithZod } from "@conform-to/zod/v4";
import connectToDb from "@src/configs/db";
import {
  auth,
  signIn,
  signOut,
} from "@src/lib/auth";
import { generateOTP } from "@src/lib/otp";
import {
  otpCodeSchema,
  phoneNumberSchema,
} from "@src/lib/zodSchemas";
import Otp from "@src/models/OtpCollection";
import User from "@src/models/User";

import UserModel from "@src/models/User";

import { updateProfileSchema } from "@src/lib/zodSchemas";

export async function phoneNumberLoginAction(
  previousState,
  formData,
) {
  const submission = parseWithZod(
    formData,
    {
      schema: phoneNumberSchema,
    },
  );

  if (submission.status !== "success") {
    return {
      submission: submission.reply(),
    };
  }

  // Send SMS here...
  // console.log(
  //   submission.value.contactNumber,
  //   // "<<<<<<<formData>>>>>>>",
  //   // formData,
  // );

  await connectToDb();
  //searching for active code
  const activeOtp = JSON.parse(
    JSON.stringify(
      await Otp.findOne({
        phone:
          submission.value
            .contactNumber,
      }),
    ),
  );

  if (activeOtp) {
    if (
      activeOtp.expiresAt > Date.now()
    ) {
      return {
        submission: submission.reply({
          resetForm: false,
        }),
        phoneOk: true,
        otpOk: false,
        otpError:
          "برای درخواست رمز جدید باید تا تمام شدن انقضای رمز قبلی صبر کنید",
        phoneNumber:
          submission.value
            .contactNumber,
      };
    }
  }
  const otp = generateOTP();
  const otpCollection = JSON.parse(
    JSON.stringify(
      await Otp.create({
        phone:
          submission.value
            .contactNumber,
        code: otp,
        expiresAt: Date.now() + 120000,
      }),
    ),
  );

  // phone: {
  //   type: String,
  //   required: true,
  //   index: true,
  // },

  // code: {
  //   type: String,
  //   required: true,
  // },

  // expiresAt: {
  //   type: Date,
  //   required: true,
  // },

  // attempts: {
  //   type: Number,
  //   default: 0,
  // },

  return {
    submission: submission.reply({
      resetForm: false,
    }),
    phoneOk: true,
    otpOk: false,
    otpCollection,
    phoneNumber:
      submission.value.contactNumber,
  };
}

export async function otpLoginAction(
  previousState,
  formData,
) {
  const submission = parseWithZod(
    formData,
    {
      schema: otpCodeSchema,
    },
  );

  // Zod validation
  if (submission.status !== "success") {
    return {
      submission: submission.reply(),
    };
  }

  await connectToDb();

  const activeOtp = await Otp.findOne({
    phone:
      submission.value.contactNumber,
  }).lean();

  // OTP doesn't exist
  if (!activeOtp) {
    return {
      submission: submission.reply(),
      phoneOk: true,
      otpOk: false,
      otpError:
        "کدی برای این شماره پیدا نشد",
    };
  }

  // OTP expired
  if (
    Date.now() >
    new Date(
      activeOtp.expiresAt,
    ).getTime()
  ) {
    await Otp.deleteOne({
      _id: activeOtp._id,
    });

    return {
      submission: submission.reply(),
      phoneOk: true,
      otpOk: false,
      otpError:
        "کد تأیید منقضی شده است",
    };
  }

  // Too many attempts
  if (activeOtp.attempts >= 5) {
    await Otp.deleteOne({
      _id: activeOtp._id,
    });

    return {
      submission: submission.reply(),
      phoneOk: true,
      otpOk: false,
      otpError:
        "تعداد دفعات مجاز وارد کردن کد به پایان رسیده است",
    };
  }

  // Wrong OTP
  if (
    submission.value.otpNumber !==
    activeOtp.code
  ) {
    await Otp.updateOne(
      { _id: activeOtp._id },
      {
        $inc: {
          attempts: 1,
        },
      },
    );

    return {
      submission: submission.reply({
        resetForm: false,
      }),
      phoneOk: true,
      otpOk: false,
      otpError: "کد وارد شده صحیح نیست",
    };
  }

  // Correct OTP
  await Otp.deleteOne({
    _id: activeOtp._id,
  });

  let user = await User.findOne({
    phone:
      submission.value.contactNumber,
  });
  if (!user) {
    user = await User.create({
      phone:
        submission.value.contactNumber,
    });
  }

  // TODO:
  // Create user if doesn't exist.
  // Sign in with Auth.js.
  await signIn("credentials", {
    phone: user.phone,
    redirectTo: "/",
  });
  // redirect("/");
}

export async function logOutAction() {
  await signOut({
    redirectTo: "/",
  });
}

export async function updateProfileAction(
  previousState,
  formData,
) {
  const session = await auth();

  if (!session?.user?.phone) {
    return {
      status: "error",
      message: "Unauthorized",
    };
  }

  const submission = parseWithZod(
    formData,
    {
      schema: updateProfileSchema,
    },
  );

  if (submission.status !== "success") {
    return submission.reply();
  }

  await connectToDb();

  const {
    firstName,
    lastName,
    nationalId,
    birthDate,
    gender,
    email,
    address,
  } = submission.value;

  await UserModel.findOneAndUpdate(
    {
      phone: session.user.phone,
    },
    {
      $set: {
        firstName,
        lastName,
        nationalId,
        birthDate: new Date(birthDate),
        gender,
        email,
        address,
      },
    },
    {
      new: true,
      runValidators: true,
    },
  );
  revalidatePath("/profile");
  return submission.reply({
    resetForm: false,
  });
}

//! ///////////////////////////////////////////

import ProductInventory from "@src/models/ProductInventory";
import Order from "@src/models/Order";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

// بعداً این را از Auth.js می‌گیری
// import { auth } from "@/auth";

export async function checkoutAction(
  formData,
) {
  await connectToDb();

  const cart = JSON.parse(
    formData.get("cart"),
  );

  if (
    !Array.isArray(cart) ||
    cart.length === 0
  ) {
    throw new Error("Cart is empty");
  }

  for (const item of cart) {
    if (!item.inventoryId) {
      throw new Error(
        "Invalid inventory",
      );
    }

    if (
      !Number.isInteger(
        item.quantity,
      ) ||
      item.quantity < 1
    ) {
      throw new Error(
        "Invalid quantity",
      );
    }
  }

  // بعداً از Auth.js می‌آید

  const session = await auth();
  if (!session)
    throw new Error("Unauthorized");
  // console.log(
  //   "sessssssssssssssion",
  //   session,
  // );
  const inventoryIds = cart.map(
    (item) => item.inventoryId,
  );

  const inventories =
    await ProductInventory.find({
      _id: {
        $in: inventoryIds,
      },
    })
      .populate("product")
      .lean();

  if (
    inventories.length !== cart.length
  ) {
    throw new Error(
      "Some products do not exist.",
    );
  }

  const orderItems = [];

  let totalPrice = 0;

  for (const cartItem of cart) {
    const inventory = inventories.find(
      (item) =>
        String(item._id) ===
        cartItem.inventoryId,
    );

    if (!inventory) {
      throw new Error(
        "Inventory not found.",
      );
    }

    if (
      inventory.stock <
      cartItem.quantity
    ) {
      throw new Error(
        `${inventory.product.title} does not have enough stock.`,
      );
    }

    const price =
      inventory.product.finalPrice ??
      inventory.product.price;

    totalPrice +=
      price * cartItem.quantity;

    orderItems.push({
      product: inventory.product._id,

      inventory: inventory._id,

      quantity: cartItem.quantity,

      unitPrice: price,
    });
  }
  const { _id: userId } =
    await User.findOne(
      {
        phone: session.user.phone,
      },
      { id: 1 },
    );

  const existingOrder =
    await Order.findOne({
      user: userId,
      paymentStatus: "unpaid",
    });
  //todo [...OrderDb, ...localStorage]
  //todo we must avoid spaming new orders on submit
  // console.log(
  //   "userIIIIIIIIIIIIIIIIIIIIIIIIdddddd",
  //   userId,
  //   orderItems,
  // );

  // console.log(orderItems);

  const order = await Order.create({
    // بعداً از session می‌آید
    user: userId,

    // user: "687000000000000000000001",

    items: orderItems,

    totalPrice,

    status: "pending",

    paymentStatus: "unpaid",
  });
  if (existingOrder) {
    await Order.findOneAndDelete({
      _id: existingOrder._id,
    });
  }
  // console.log("existingOrder");
  // console.log(existingOrder);

  redirect(
    `/profile?order=${order._id}`,
  );
}
