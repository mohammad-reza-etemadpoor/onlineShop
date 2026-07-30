"use client";
import { useCart } from "@src/context/CartContext";
import Link from "next/link";
import {
  IoBagHandleOutline,
  IoPersonOutline,
} from "react-icons/io5";

function Navbar() {
  const { cartItems } = useCart();
  return (
    <nav className="flex w-full items-center justify-between px-8 m py-4 border-b bg-secondary ">
      {/* Left Side */}
      <div className="ml-24 flex items-center gap-10">
        {/* <p className="text-2xl font-bold text-yellow-400">
            Little Loom
          </p> */}
        {/* <div className="h-16 w-48 relative">
          <Image
            fill
            alt="Little Loom brand logo"
            src={logo}
          />
        </div> */}

        <div className="flex items-center gap-8 text-gray-700 font-medium">
          <a
            href="/"
            className="transition hover:text-yellow-500"
          >
            Home
          </a>
          {/* <a
            href="/shop"
            className="transition hover:text-yellow-500"
          >
            Shop
          </a> */}
          <a
            href="/contact"
            className="transition hover:text-yellow-500"
          >
            Contact Us
          </a>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex mr-24 text-xl items-center gap-6 text-black">
        {/* <Link
          href={"/"}
          className="transition hover:text-yellow-500"
        >
          <IoSearchOutline />
        </Link> */}

        <Link
          href={"/profile"}
          className="transition hover:text-yellow-500"
        >
          <IoPersonOutline />
        </Link>

        <Link
          href={"/cart"}
          className="relative transition hover:text-yellow-500"
        >
          <IoBagHandleOutline />
          <span className="absolute -top-2 -right-3 flex h-5 w-5 items-center justify-center rounded-full bg-yellow-400 text-xs font-semibold text-black">
            {cartItems.length ??
              cartItems.length}
          </span>
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
