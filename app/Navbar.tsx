"use client";
import React from "react";
import Link from "next/link";
import { IoBug } from "react-icons/io5";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { DropdownMenu, Avatar, Flex, TabNav, Skeleton } from "@radix-ui/themes";

const Navbar = () => {
  return (
    <nav className="px-2 sm:px-12">
      <Flex className="h-14" justify="between" align="center">
        <Flex align="center" gap={{ initial: "4", sm: "8" }}>
          <Link href="/">
            <IoBug size={26} />
          </Link>
          <NavLinks />
        </Flex>
        <AuthStatus />
      </Flex>
    </nav>
  );
};

const NavLinks = () => {
  const path = usePathname();

  const links = [
    { label: "Dashboard", path: "/" },
    { label: "Issues", path: "/issues" },
  ];

  return (
    <Flex gap={{ initial: "2", sm: "4" }}>
      <TabNav.Root>
        {links.map((link) => (
          <TabNav.Link
            active={
              link.path === "/"
                ? path === link.path
                : path.startsWith(link.path)
            }
            key={link.path}
            href={link.path}
          >
            {link.label}
          </TabNav.Link>
        ))}
      </TabNav.Root>
    </Flex>
  );
};

const AuthStatus = () => {
  const { status, data: session } = useSession();
  if (status === "loading")
    return (
      <Skeleton width="50px" height="30px">
        Loading
      </Skeleton>
    );

  if (status === "unauthenticated")
    return <Link href="/api/auth/signin">Login</Link>;

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <Avatar
          src={session!.user!.image!}
          fallback="?"
          radius="full"
          size="2"
          className="cursor-pointer"
        />
      </DropdownMenu.Trigger>
      <DropdownMenu.Content variant="soft" size="2">
        <DropdownMenu.Label>{session!.user!.email}</DropdownMenu.Label>
        <Link href="/api/auth/signout">
          <DropdownMenu.Item>Logout</DropdownMenu.Item>
        </Link>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};

export default Navbar;
