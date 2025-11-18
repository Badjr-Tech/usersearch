'use client';

import { useWhitelabel } from '@/app/context/WhitelabelContext';
import Link from 'next/link';

export default function ResourcesPage({ isAdmin, isInternal }: { isAdmin: boolean; isInternal: boolean; }) {
  const { settings } = useWhitelabel();

  return (
    <div className="flex-1 p-6">
      <h1 className="text-3xl font-bold text-foreground mb-6">Resources</h1>
      <p className="text-lg text-gray-700 mb-8">
        Explore our comprehensive collection of internal resources.
      </p>

      <div className="flex flex-col space-y-4">
        {/* Onboarding Box */}
        <Link href="/dashboard/onboarding" className="block">
          <div
            className="p-8 rounded-lg shadow-md text-white text-center cursor-pointer transition-all duration-300 hover:shadow-lg"
            style={{ backgroundColor: settings.primaryColor }}
          >
            <h2 className="text-3xl font-bold mb-2">Onboarding Hub</h2>
            <p className="text-lg">Essential resources for new employees.</p>
          </div>
        </Link>

        {/* Process Manual Box */}
        <Link href="/dashboard/process-manual" className="block">
          <div
            className="p-8 rounded-lg shadow-md text-white text-center cursor-pointer transition-all duration-300 hover:shadow-lg"
            style={{ backgroundColor: settings.secondaryColor }}
          >
            <h2 className="text-3xl font-bold mb-2">Process Manual</h2>
            <p className="text-lg">Comprehensive guide to company operations.</p>
          </div>
        </Link>

        {/* Philosophy Box */}
        <Link href="/dashboard/philosophy" className="block">
          <div
            className="p-8 rounded-lg shadow-md text-white text-center cursor-pointer transition-all duration-300 hover:shadow-lg"
            style={{ backgroundColor: settings.tertiaryColor }}
          >
            <h2 className="text-3xl font-bold mb-2">Company Philosophy</h2>
            <p className="text-lg">Our core values, mission, and vision.</p>
          </div>
        </Link>

        {/* File Storage Box */}
        <Link href="/dashboard/resources/file-storage" className="block">
          <div
            className="p-8 rounded-lg shadow-md text-white text-center cursor-pointer transition-all duration-300 hover:shadow-lg"
            style={{ backgroundColor: settings.primaryColor }}
          >
            <h2 className="text-3xl font-bold mb-2">File Storage</h2>
            <p className="text-lg">Access and manage internal documents.</p>
          </div>
        </Link>
      </div>
    </div>
  );
}