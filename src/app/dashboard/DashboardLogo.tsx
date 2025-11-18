'use client';

import Image from 'next/image';
import { useWhitelabel } from '@/app/context/WhitelabelContext';

export default function DashboardLogo() {
  const { settings } = useWhitelabel();

  return (
    <Image
      src={settings.logoUrl || "/green.png"}
      alt="Logo"
      width={300}
      height={300}
      className=""
    />
  );
}
