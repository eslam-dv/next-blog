"use client";

import Link from "next/link";
import { Moon, Sun } from "lucide-react";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";

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
        <h1>Islam's Blog</h1>
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
          <button
            className="cursor-pointer py-1 px-2 rounded"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          >
            {theme === "light" ? <Sun /> : <Moon />}
          </button>
          <SignedOut>
            <SignInButton />
            <SignUpButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </nav>
    </header>
  );
}
