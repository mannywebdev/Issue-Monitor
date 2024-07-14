"use client";
import React from "react";
import Link from "next/link";
import { IoBug } from "react-icons/io5";
import { usePathname } from "next/navigation";
import classnames from "classnames";

const Navbar = () => {
  const path = usePathname();

  const links = [
    { label: "Dashboard", path: "/" },
    { label: "Issues", path: "/issues" },
    { label: "Docs", path: "/not" },
    { label: "Pricing", path: "/ijix" },
  ];
  return (
    <nav className="flex justify-between items-center border-b h-14 px-2 sm:px-6">
      <div className="mr-3 basis-1/12">
        <Link href="/">
          <IoBug size={25} />
        </Link>
      </div>
      <div className="basis-10/12">
        <div className="flex space-x-2 sm:space-x-4">
          {links.map((link) => (
            <Link
              className={classnames({
                "h-14 flex items-center font-medium border-b-2 hover:border-blue-600":
                  true,
                "border-blue-600 text-zinc-800": path === link.path,
                "border-transparent text-zinc-500 hover:text-zinc-800 transition-colors":
                  path !== link.path,
              })}
              key={link.path}
              href={link.path}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
      <div className="basis-1/12">Login</div>
    </nav>
  );
};

export default Navbar;
