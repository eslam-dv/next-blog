"use client";

import Link from "next/link";
import { Moon, Sun, LogIn } from "lucide-react";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { Button } from "./ui/button";

export default function Header() {
  const { theme, setTheme } = useTheme();

  const path = usePathname();

  const menus = [
    { title: "Home", path: "/" },
    { title: "About", path: "/about" },
    { title: "Projects", path: "/projects" },
  ];
  return (
    <header className="px-2 py-4 border-b border-gray-200">
      <nav className="container mx-auto flex gap-5 items-center justify-between">
        <h1>Islam&apos;s Blog</h1>
        <ul className="flex gap-5">
          {menus.map((item, idx) => (
            <li key={idx}>
              <Link
                href={item.path}
                className={`hover:text-blue-500 transition-all duration-300 ${path === item.path && "text-blue-500"}`}
              >
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
        <div className="flex gap-5">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          >
            {theme === "light" ? <Sun /> : <Moon />}
          </Button>
          <SignedOut>
            <SignInButton>
              <Button variant="outline">
                <LogIn /> Sign In
              </Button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </nav>
    </header>
  );
}
