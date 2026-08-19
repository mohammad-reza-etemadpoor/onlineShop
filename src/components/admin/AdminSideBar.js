"use client";

import logo from "@/public/picture-logo.png";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  LuBox,
  LuChevronDown,
  LuCircleUserRound,
  LuClipboardList,
  LuHouse,
  LuImage,
  LuLogOut,
  LuPanelLeftClose,
  LuSettings,
  LuShoppingCart,
  LuUsers,
} from "react-icons/lu";

export const sidebarItems = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: LuHouse,
  },
  {
    title: "Products",
    href: "/admin/products",
    icon: LuBox,
  },
  // {
  //   title: "Inventory",
  //   href: "/admin/inventory",
  //   icon: LuClipboardList,
  // },
  {
    title: "Orders",
    href: "/admin/orders",
    icon: LuShoppingCart,
  },
  {
    title: "Users",
    href: "/admin/users",
    icon: LuUsers,
  },
  {
    title: "Banner & Home",
    href: "/admin/banner",
    icon: LuImage,
  },
  // {
  //   title: "Settings",
  //   href: "/admin/settings",
  //   icon: LuSettings,
  // },
];

export function AdminSideBar() {
  const [collapsed, setCollapsed] =
    useState(false);

  return (
    <div
      className={`relative gap-5 justify-between text-xs items-stretch flex flex-col pt-2 bg-[#0f182a] h-dvh 
${collapsed ? "w-20" : "w-70"}`}
    >
      <button
        onClick={() =>
          setCollapsed(!collapsed)
        }
        className={`text-xl p-1  rounded-md hover:bg-[#5a57ca]  absolute  top-4 ${!collapsed ? " right-2 text-zinc-100 " : " right-[50%] translate-x-[50%]"}`}
      >
        <LuPanelLeftClose />
      </button>
      <div className="flex pl-3 mt-2 flex-col gap-1">
        {!collapsed ? (
          <div
            className={`flex gap-2 mb-6 `}
          >
            <div className="relative min-w-11 transition-all duration-100 min-h-10 aspect-square">
              <Image
                alt="little-loom-logo"
                src={logo}
                width={44}
                height={44}
              />
            </div>
            <div>
              <h1 className="text-lg">
                Little loom
              </h1>
              <p className="text-xs">
                Admin dashboard
              </p>
            </div>
          </div>
        ) : (
          <div className="mb-16"></div>
        )}

        {sidebarItems.map((item) => (
          <SideBarOption
            collapsed={collapsed}
            key={item.href}
            {...item}
          />
        ))}
      </div>
      {!collapsed && (
        <div className="border-[#263040] rounded-md border-2 max-w-53 mb-3 mx-2">
          <div className="flex justify-between pl-2 items-center gap-2 py-3">
            <div className="flex justify-start items-center ml-2 gap-3">
              <div className="text-3xl ">
                <LuCircleUserRound />
              </div>
              <div>
                <h2 className="text-md">
                  sarah admin
                </h2>
                <p className="text-xs">
                  Super Admin
                </p>
              </div>
            </div>
            <div className="justify-self-end pr-3">
              <LuChevronDown />
            </div>
          </div>
          <div className="border-t-[#263040] text-lg  border-t-2 flex justify-start p-4 gap-3 items-center">
            <LuLogOut />
            <div className="text-xs ">
              Logout
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function SideBarOption({
  title,
  href,
  icon,
  collapsed,
}) {
  // { title: "Dashboard", href: "/admin", icon: LuHouse(props) }
  // console.log(props);

  const pathname = usePathname();
  const active = pathname === href;

  return (
    <Link
      href={href}
      className={`flex items-center gap-4
        rounded-md
        py-3 px-3 mr-4
        transition-all
        ${
          active
            ? "bg-[#5a57ca] text-white"
            : "hover:bg-[#5a57ca]"
        }`}
    >
      {/* <div className="text-md">{`<${icon}/>`}</div> */}

      <div className="text-lg">
        {icon()}
      </div>
      {!collapsed && (
        <p
          className={`overflow-hidden whitespace-nowrap
transition-all duration-300
${collapsed ? "w-0 opacity-0" : "w-32 opacity-100"}`}
        >
          {title}
        </p>
      )}
    </Link>
  );
}
