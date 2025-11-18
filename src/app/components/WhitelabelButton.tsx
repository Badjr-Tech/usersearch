'use client';

import Link from 'next/link';
import { useWhitelabel } from '@/app/context/WhitelabelContext';

interface WhitelabelButtonProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export default function WhitelabelButton({ href, children, className }: WhitelabelButtonProps) {
  const { settings } = useWhitelabel();

  return (
    <Link
      href={href}
      className={`px-6 py-3 text-white font-semibold rounded-lg shadow-md hover:opacity-90 transition-opacity ${className}`}
      style={{ backgroundColor: settings.primaryColor }}
    >
      {children}
    </Link>
  );
}
