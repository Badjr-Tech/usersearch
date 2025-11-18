'use client';

import { useState } from 'react';
import { useWhitelabel } from '@/app/context/WhitelabelContext';
import PageContentEditor from '../components/PageContentEditor';

interface PhilosophyClientPageProps {
  isAdmin: boolean;
  initialContent: any;
}

export default function PhilosophyClientPage({ isAdmin, initialContent }: PhilosophyClientPageProps) {
  const { settings } = useWhitelabel();
  const [content, setContent] = useState(initialContent);

  const handleSaveSuccess = () => {
    console.log("Content saved, revalidating...");
  };

  return (
    <div className="flex-1 p-6">
      <h1 className="text-3xl font-bold text-foreground mb-6">{content.mainTitle || "Company Philosophy"}</h1>
      <p className="text-lg text-gray-700 mb-4">
        {content.mainDescription || "Our company's core values, mission, and vision are outlined here."}
      </p>
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-foreground mb-4">{content.missionTitle || "Our Mission"}</h2>
        <p className="text-gray-700 mb-4">
          {content.missionDescription || "To empower our employees and clients through innovation and collaboration."}
        </p>
        <h2 className="text-2xl font-semibold text-foreground mb-4">{content.valuesTitle || "Our Values"}</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          {content.valuesList?.map((item: string, index: number) => (
            <li key={index}>{item}</li>
          )) || (
            <>
              <li>Integrity</li>
              <li>Excellence</li>
              <li>Customer Focus</li>
              <li>Innovation</li>
            </>
          )}
        </ul>
      </div>

      {isAdmin && (
        <PageContentEditor pagePath="/dashboard/philosophy" initialContent={initialContent} onSaveSuccess={handleSaveSuccess} />
      )}
    </div>
  );
}
