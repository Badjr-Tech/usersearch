'use client';

import Link from 'next/link';
import { useWhitelabel } from '@/app/context/WhitelabelContext';

interface SidebarLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export default function SidebarLink({ href, children, className }: SidebarLinkProps) {
  const { settings } = useWhitelabel();

  return (
    <Link
      href={href}
      className={`block py-2.5 px-4 rounded transition duration-200 hover:bg-secondary ${className}`}
      style={{ backgroundColor: 'transparent' }} // Default to transparent, hover handled by Tailwind
    >
      {children}
    </Link>
  );
}
