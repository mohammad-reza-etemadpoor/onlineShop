"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  IoCloseOutline,
  IoLocationOutline,
  IoWarningOutline,
} from "react-icons/io5";

export default function ConfirmCheckoutModal({
  open,
  onClose,
  address,
}) {
  const router = useRouter();

  useEffect(() => {
    if (!open) return;

    const handleEsc = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener(
      "keydown",
      handleEsc,
    );

    return () =>
      document.removeEventListener(
        "keydown",
        handleEsc,
      );
  }, [open, onClose]);

  if (!open) return null;

  function handleContinue() {
    onClose();

    // بعداً اگر لازم بود
    // await saveUserInfo();

    router.push("/payment");
  }

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 backdrop-blur-sm"
    >
      <div
        onClick={(e) =>
          e.stopPropagation()
        }
        className="w-full max-w-lg rounded-3xl bg-white p-8 shadow-2xl"
      >
        {/* Header */}

        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">
            Confirm Order
          </h2>

          <button
            onClick={onClose}
            className="rounded-full p-2 transition hover:bg-gray-100"
          >
            <IoCloseOutline size={24} />
          </button>
        </div>

        {/* Warning */}

        <div className="mb-6 flex items-start gap-3 rounded-2xl bg-yellow-50 p-4">
          <IoWarningOutline
            size={28}
            className="mt-0.5 text-yellow-600"
          />

          <div>
            <h3 className="font-semibold">
              Please review your
              information
            </h3>

            <p className="mt-1 text-sm text-gray-600">
              Your order will be shipped
              to the address below.
            </p>
          </div>
        </div>

        {/* Address */}

        <div className="rounded-2xl border border-gray-200 p-5">
          <div className="mb-3 flex items-center gap-2">
            <IoLocationOutline
              size={22}
              className="text-[#F9E34F]"
            />

            <h3 className="font-semibold">
              Shipping Address
            </h3>
          </div>

          <p className="leading-7 text-gray-700">
            {address}
          </p>
        </div>

        {/* Buttons */}

        <div className="mt-8 flex gap-4">
          <button
            onClick={onClose}
            className="flex-1 rounded-xl border border-gray-300 py-3 font-medium transition hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            onClick={handleContinue}
            className="flex-1 rounded-xl bg-[#F9E34F] py-3 font-semibold transition hover:brightness-95"
          >
            Continue to Payment
          </button>
        </div>
      </div>
    </div>
  );
}
