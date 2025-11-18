'use client';

import Link from 'next/link';
import { useWhitelabel } from '@/app/context/WhitelabelContext';
import { useState } from 'react';

interface SidebarLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export default function SidebarLink({ href, children, className }: SidebarLinkProps) {
  const { settings } = useWhitelabel();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      href={href}
      className={`block py-2.5 px-4 rounded transition duration-200 ${className}`}
      style={{ backgroundColor: isHovered ? settings.secondaryColor : 'transparent' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
    </Link>
  );
}
