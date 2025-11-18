'use client';

import { useState } from 'react';
import { useWhitelabel } from '@/app/context/WhitelabelContext';
import PageContentEditor from '../components/PageContentEditor';

interface OnboardingClientPageProps {
  isAdmin: boolean;
  initialContent: any;
}

export default function OnboardingClientPage({ isAdmin, initialContent }: OnboardingClientPageProps) {
  const { settings } = useWhitelabel();
  const [content, setContent] = useState(initialContent);

  console.log('OnboardingClientPage (Client Component): isAdmin', isAdmin);

  // Function to re-fetch content after save
  const handleSaveSuccess = () => {
    // In a real app, you'd re-fetch the content from the server here
    // For now, we'll just assume the editor updates the local state
    // or you'd trigger a revalidation of the server component
    console.log("Content saved, revalidating...");
    // This is a placeholder. Actual revalidation would happen on the server action.
    // For client-side update, you might need to pass a setter or refetch.
  };

  return (
    <div className="flex-1 p-6">
      <h1 className="text-3xl font-bold text-foreground mb-6">{content.mainTitle || "Onboarding Hub"}</h1>
      <p className="text-lg text-gray-700 mb-8">
        {content.mainDescription || "Welcome to your central hub for all onboarding materials. Here you'll find everything you need to get started and succeed within our organization."}
      </p>

      {/* Welcome Section */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold text-foreground mb-4">{content.welcomeTitle || "Welcome Aboard!"}</h2>
        <p className="text-gray-700">
          {content.welcomeDescription || "We're thrilled to have you join our team. This section is designed to guide you through your first few weeks and provide quick access to essential information."}
        </p>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mt-4">
          {content.welcomeList?.map((item: string, index: number) => (
            <li key={index}>{item}</li>
          )) || (
            <>
              <li>Start with the Onboarding Checklist to ensure a smooth setup.</li>
              <li>Familiarize yourself with our Company Values and Mission.</li>
              <li>Meet your team and key contacts.</li>
            </>
          )}
        </ul>
      </div>

      {/* Training & Development Section */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold text-foreground mb-4">{content.trainingTitle || "Training & Development"}</h2>
        <p className="text-gray-700 mb-4">
          {content.trainingDescription || "Enhance your skills and grow with our curated training materials."}
        </p>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          {content.trainingLinks?.map((link: { text: string; href: string }, index: number) => (
            <li key={index}><a href={link.href} className="text-blue-600 hover:underline">{link.text}</a></li>
          )) || (
            <>
              <li><a href="#" className="text-blue-600 hover:underline">Product Knowledge Base</a></li>
              <li><a href="#" className="text-blue-600 hover:underline">Software Tutorials</a></li>
              <li><a href="#" className="text-blue-600 hover:underline">Leadership Workshops Schedule</a></li>
            </>
          )}
        </ul>
      </div>

      {/* Important Links Section */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-foreground mb-4">{content.linksTitle || "Important Links"}</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          {content.importantLinks?.map((link: { text: string; href: string }, index: number) => (
            <li key={index}><a href={link.href} className="text-blue-600 hover:underline">{link.text}</a></li>
          )) || (
            <>
              <li><a href="#" className="text-blue-600 hover:underline">Company Intranet</a></li>
              <li><a href="#" className="text-blue-600 hover:underline">HR Portal</a></li>
              <li><a href="#" className="text-blue-600 hover:underline">Support Desk</a></li>
            </>
          )}
        </ul>
      </div>

      {isAdmin && (
        <PageContentEditor pagePath="/dashboard/onboarding" initialContent={initialContent} onSaveSuccess={handleSaveSuccess} />
      )}
    </div>
  );
}
