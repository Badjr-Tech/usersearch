'use client';

import { useState } from 'react';
import { useWhitelabel } from '@/app/context/WhitelabelContext';
import PageContentEditor from '../components/PageContentEditor';

interface ProcessManualClientPageProps {
  isAdmin: boolean;
  initialContent: any;
}

export default function ProcessManualClientPage({ isAdmin, initialContent }: ProcessManualClientPageProps) {
  const { settings } = useWhitelabel();
  const [content, setContent] = useState(initialContent);

  const handleSaveSuccess = () => {
    console.log("Content saved, revalidating...");
  };

  return (
    <div className="flex-1 p-6">
      <h1 className="text-3xl font-bold text-foreground mb-6">{content.mainTitle || "Process Manual"}</h1>
      <p className="text-lg text-gray-700 mb-4">
        {content.mainDescription || "This page contains the official process manual for all company operations."}
      </p>
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-foreground mb-4">{content.tocTitle || "Table of Contents"}</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          {content.tocItems?.map((item: string, index: number) => (
            <li key={index}>{item}</li>
          )) || (
            <>
              <li>Section 1: General Operations</li>
              <li>Section 2: Departmental Procedures</li>
              <li>Section 3: Emergency Protocols</li>
            </>
          )}
        </ul>
      </div>

      {isAdmin && (
        <PageContentEditor pagePath="/dashboard/process-manual" initialContent={initialContent} onSaveSuccess={handleSaveSuccess} />
      )}
    </div>
  );
}
