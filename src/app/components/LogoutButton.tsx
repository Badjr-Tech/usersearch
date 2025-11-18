"use client";

import { logout } from "@/app/login/actions";
import { useWhitelabel } from "@/app/context/WhitelabelContext";
import { useState } from "react";

export default function LogoutButton({ className }: { className?: string }) {
  const { settings } = useWhitelabel();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <form action={logout}>
      <button
        type="submit"
        className={`w-full text-left py-2.5 px-4 rounded transition duration-200 text-white ${className}`}
        style={{ backgroundColor: isHovered ? settings.secondaryColor : settings.primaryColor }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        Logout
      </button>
    </form>
  );
}
