"use client";

import { logout } from "@/app/login/actions";

export default function LogoutButton({ className }: { className?: string }) {
  return (
    <form action={logout}>
      <button type="submit" className={`w-full text-left py-2.5 px-4 rounded transition duration-200 bg-secondary text-white hover:bg-primary ${className}`}>
        Logout
      </button>
    </form>
  );
}
