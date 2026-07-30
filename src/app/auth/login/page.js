"use client";

import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod/v4";
import {
  otpLoginAction,
  phoneNumberLoginAction,
} from "@src/app/actions";
import {
  loginSchema,
  otpCodeSchema,
  phoneNumberSchema,
} from "@src/lib/zodSchemas";
import {
  useActionState,
  useEffect,
  useState,
} from "react";
import { IoArrowBackOutline } from "react-icons/io5";

export default function LoginForm() {
  //i added

  const [
    phoneResult,
    phoneAction,
    phonePending,
  ] = useActionState(
    phoneNumberLoginAction,
    undefined,
  );

  const [phoneForm, phoneFields] =
    useForm({
      lastResult:
        phoneResult?.submission,
      onValidate({ formData }) {
        return parseWithZod(formData, {
          schema: phoneNumberSchema,
        });
      },
      shouldValidate: "onBlur",
      shouldRevalidate: "onInput",
    });

  const [
    otpResult,
    otpAction,
    otpPending,
  ] = useActionState(
    otpLoginAction,
    undefined,
  );

  const [otpForm, otpFields] = useForm({
    lastResult: otpResult?.submission,
    onValidate({ formData }) {
      return parseWithZod(formData, {
        schema: otpCodeSchema,
      });
    },
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });

  useEffect(() => {
    if (
      phoneResult?.phoneOk &&
      step !== "otp"
    ) {
      setStep("otp");
    }
  }, [phoneResult]);

  const [step, setStep] =
    useState("phone");

  // async function handlePhoneSubmit(e) {
  //   e.preventDefault();

  //   setError("");

  //   if (!/^09\d{9}$/.test(phone)) {
  //     setError(
  //       "Please enter a valid phone number.",
  //     );
  //     return;
  //   }

  //   try {
  //     setLoading(true);

  //     // بعداً API واقعی
  //     // await fetch("/api/auth/send-otp", {...})

  //     await new Promise((resolve) =>
  //       setTimeout(resolve, 1000),
  //     );

  //     setStep("otp");
  //   } finally {
  //     setLoading(false);
  //   }
  // }

  return (
    <section className="flex min-h-screen items-center justify-center text-zinc-600 bg-gray-50 px-4">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-lg">
        {step === "phone" && (
          <>
            <h1 className="text-3xl font-bold">
              Welcome Back
            </h1>

            <p className="mt-2 text-gray-500">
              Enter your phone number to
              receive a verification
              code.
            </p>

            <form
              // onSubmit={
              //   handlePhoneSubmit
              // }
              onSubmit={
                phoneForm.onSubmit
              }
              id={phoneForm.id}
              action={phoneAction}
              noValidate
              className="mt-8 space-y-5"
            >
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Phone Number
                </label>

                <input
                  type="tel"
                  key={
                    phoneFields
                      .contactNumber.key
                  }
                  name={
                    phoneFields
                      .contactNumber
                      .name
                  }
                  defaultValue={
                    phoneFields
                      .contactNumber
                      .initialValue
                  }
                  placeholder="09123456789"
                  className="w-full rounded-xl border px-4 py-3 outline-none transition focus:border-yellow-400"
                />
              </div>
              <p className="text-red-500 text-sm mt-2">
                {
                  phoneFields
                    .contactNumber
                    .errors
                }
              </p>

              <button
                disabled={phonePending}
                className="w-full rounded-xl bg-[#F9E34F] py-3 font-semibold transition hover:brightness-95 disabled:opacity-60"
              >
                {phonePending
                  ? "Sending..."
                  : "Send Verification Code"}
              </button>
            </form>
          </>
        )}

        {step === "otp" && (
          <>
            <button
              onClick={() =>
                setStep("phone")
              }
              className="mb-6 flex items-center gap-2 text-gray-500 transition hover:text-black"
            >
              <IoArrowBackOutline
                size={18}
              />
              Back
            </button>

            <h1 className="text-3xl font-bold">
              Verify Phone
            </h1>

            <p className="mt-2 text-gray-500">
              We sent a verification
              code to
            </p>

            <p className="mt-1 font-semibold">
              {phoneResult.phoneNumber}
            </p>
            <p className="mt-1 font-semibold">
              otp code is:
              {
                phoneResult
                  ?.otpCollection?.code
              }
            </p>

            <form
              //? onSubmit={handleOTPSubmit}
              onSubmit={
                otpForm.onSubmit
              }
              action={otpAction}
              id={otpForm.id}
              noValidate
              className="mt-8 space-y-5"
            >
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Verification Code
                </label>
                <input
                  type="text"
                  inputMode="numeric"
                  maxLength={6}
                  key={
                    otpFields.otpNumber
                      .key
                  }
                  name={
                    otpFields.otpNumber
                      .name
                  }
                  defaultValue={
                    otpFields.otpNumber
                      .defaultValue
                  }
                  placeholder="------"
                  className="w-full rounded-xl border px-4 py-3 text-center text-2xl tracking-[12px] outline-none transition focus:border-yellow-400"
                />
                <input
                  type="hidden"
                  name={
                    otpFields
                      .contactNumber
                      .name
                  }
                  value={
                    phoneResult.phoneNumber
                  }
                />
              </div>

              {
                <p className="text-sm text-red-500">
                  {
                    otpFields.otpNumber
                      .errors
                  }
                </p>
              }
              {
                <p className="text-sm text-red-500">
                  {otpResult?.otpError}
                </p>
              }
              <button
                disabled={otpPending}
                className="w-full rounded-xl bg-[#F9E34F] py-3 font-semibold transition hover:brightness-95 disabled:opacity-60"
              >
                {otpPending
                  ? "Verifying..."
                  : "Verify"}
              </button>
            </form>
          </>
        )}
      </div>
    </section>
  );
}
