'use client';

import { useWhitelabel } from '@/app/context/WhitelabelContext';

export default function WelcomeMessage() {
  const { settings } = useWhitelabel();

  return (
    <h1 className="text-4xl font-extrabold text-foreground">
      {settings.ownerName ? `${settings.ownerName}, Welcome to Your Dashboard!` : "Welcome to Your Dashboard!"}
    </h1>
  );
}
