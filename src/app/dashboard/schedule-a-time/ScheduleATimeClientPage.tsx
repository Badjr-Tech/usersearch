'use client';

import { useState } from 'react';
import { useWhitelabel } from '@/app/context/WhitelabelContext';
import PageContentEditor from '../components/PageContentEditor';

interface ScheduleATimeClientPageProps {
  isAdmin: boolean;
  initialContent: any;
}

export default function ScheduleATimeClientPage({ isAdmin, initialContent }: ScheduleATimeClientPageProps) {
  const { settings } = useWhitelabel();
  const [content, setContent] = useState(initialContent);

  const handleSaveSuccess = () => {
    console.log("Content saved, revalidating...");
  };

  return (
    <div className="flex-1 p-6">
      <h1 className="text-3xl font-bold text-foreground mb-6">{content.mainTitle || "Schedule a time with me"}</h1>
      <p className="text-lg text-gray-700 mb-4">
        {content.mainDescription || "This page allows you to schedule a time with me. Please use the booking link below."}
      </p>
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-foreground mb-4">{content.bookingLinkTitle || "Book an Appointment"}</h2>
        {content.bookingLinkUrl && (
          <div className="relative" style={{ paddingBottom: '56.25%', height: 0 }}>
            <iframe
              src={content.bookingLinkUrl}
              width="100%"
              height="100%"
              frameBorder="0"
              className="absolute top-0 left-0 w-full h-full"
            ></iframe>
          </div>
        )}
        <p className="mt-4 text-gray-700">
          {content.instructions || "Click the link above to open the scheduling tool in a new tab."}
        </p>
      </div>

      {isAdmin && (
        <PageContentEditor pagePath="/dashboard/schedule-a-time" initialContent={initialContent} onSaveSuccess={handleSaveSuccess} />
      )}
    </div>
  );
}
