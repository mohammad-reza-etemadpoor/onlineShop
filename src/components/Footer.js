import Link from "next/link";
import {
  IoLogoInstagram,
  IoPaperPlaneOutline,
  IoChatbubbleEllipsesOutline,
} from "react-icons/io5";

export default function Footer() {
  return (
    <footer className="mt-24 border-t bg-[#FFF9EB]">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 md:grid-cols-3">
        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold text-zinc-900">
            Little Loom
          </h2>

          <p className="mt-4 max-w-sm leading-7 text-zinc-600">
            Premium baby clothing
            designed with comfort,
            softness, and everyday
            moments in mind.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="mb-4 text-lg text-yellow-500 font-semibold">
            Quick Links
          </h3>

          <ul className="space-y-3 text-zinc-600">
            <li>
              <Link
                href="/"
                className="transition hover:text-zinc-900"
              >
                Home
              </Link>
            </li>

            <li>
              <Link
                href="/shop"
                className="transition hover:text-zinc-900"
              >
                Shop
              </Link>
            </li>

            <li>
              <Link
                href="/about"
                className="transition hover:text-zinc-900"
              >
                About Us
              </Link>
            </li>

            <li>
              <Link
                href="/contact"
                className="transition hover:text-zinc-900"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact & Social */}
        <div>
          <h3 className="mb-4 text-yellow-500 text-lg font-semibold">
            Stay Connected
          </h3>

          <p className="text-zinc-600">
            support@littleloom.com
          </p>

          <p className="mt-2 text-zinc-600">
            +98 912 345 6789
          </p>

          <div className="mt-6 flex text-zinc-600 gap-4">
            <Link
              href="https://instagram.com"
              target="_blank"
              className="rounded-full bg-white p-3 shadow transition hover:-translate-y-1 hover:bg-[#F9E34F]"
            >
              <IoLogoInstagram
                size={22}
              />
            </Link>

            <Link
              href="https://telegram.org"
              target="_blank"
              className="rounded-full bg-white p-3 shadow transition hover:-translate-y-1 hover:bg-[#F9E34F]"
            >
              <IoPaperPlaneOutline
                size={22}
              />
            </Link>

            <Link
              href="https://ble.ir"
              target="_blank"
              className="rounded-full bg-white p-3 shadow transition hover:-translate-y-1 hover:bg-[#F9E34F]"
            >
              <IoChatbubbleEllipsesOutline
                size={22}
              />
            </Link>
          </div>
        </div>
      </div>

      <div className="border-t py-6 text-center text-sm text-zinc-500">
        © {new Date().getFullYear()}{" "}
        Little Loom. All rights
        reserved.
      </div>
    </footer>
  );
}
