"use client";
import Link from "next/link";
import Image from "next/image";
import Logo from "@/assets/logo.jpeg";
import { UserButton } from "@clerk/nextjs";
import { CreditCard } from "lucide-react";
import ToggleTheme from "@/components/ToggleTheme";
import { useTheme } from "next-themes";
import { dark } from "@clerk/themes";
export default function Navbar() {
  const { theme } = useTheme();
  return (
    <header className="shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 p-3">
        <Link href={"/resumes"} className="flex items-center gap-2">
          <Image
            src={Logo}
            alt="Resume builder logo"
            width={35}
            height={35}
            className="rounded-full"
          />
          <span className="text-xl font-bold tracking-tight">
            Resume Builder
          </span>

        </Link>
        <div className="flex items-center gap-2">
          <ToggleTheme />

          <UserButton
            appearance={{
              baseTheme: theme === "dark" ? dark : undefined,
              elements: {
                avatarBox: {
                  width: 35,
                  height: 35,
                },
              },
            }}
          >
            <UserButton.MenuItems>
              <UserButton.Link
                label="Billing"
                labelIcon={<CreditCard />}
                href="/billing"
              />
            </UserButton.MenuItems>
            <UserButton.MenuItems>
              <UserButton.Link
                label="Billing"
                labelIcon={<CreditCard />}
                href="/billing"
              />
            </UserButton.MenuItems>
          </UserButton>
        </div>
      </div>
    </header>
  );
}
