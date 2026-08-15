"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { clearTokens } from "@/lib/auth";

export default function Navbar() {
  const router = useRouter();

  function logout() {
    clearTokens();
    router.push("/login");
  }

  return (
    <nav className="border-b bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link
          href="/dashboard"
          className="text-xl font-bold"
        >
          Todo App
        </Link>

        <div className="flex items-center gap-4">
          <Link
            href="/dashboard"
            className="text-sm text-gray-600 hover:text-black"
          >
            Dashboard
          </Link>

          <button
            onClick={logout}
            className="rounded-lg bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}