export function generateOTP(
  length = 6,
) {
  const digits = "0123456789";

  let otp = "";

  for (let i = 0; i < length; i++) {
    otp +=
      digits[
        Math.floor(
          Math.random() * digits.length,
        )
      ];
  }

  return otp;
}

export function getOTPExpiration(
  minutes = 2,
) {
  return new Date(
    Date.now() + minutes * 60 * 1000,
  );
}
