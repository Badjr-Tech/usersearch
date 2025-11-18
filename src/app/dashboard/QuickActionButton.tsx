'use client';

import Link from 'next/link';
import { useWhitelabel } from '@/app/context/WhitelabelContext';

interface QuickActionButtonProps {
  href: string;
  children: React.ReactNode;
}

export default function QuickActionButton({ href, children }: QuickActionButtonProps) {
  const { settings } = useWhitelabel();

  return (
    <Link
      href={href}
      className="flex flex-col items-center justify-center p-4 text-white rounded-lg shadow-md hover:opacity-90 transition-opacity aspect-square"
      style={{ backgroundColor: settings.primaryColor }}
    >
      {children}
    </Link>
  );
}
