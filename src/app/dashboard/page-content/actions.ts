'use server';

import { db } from '@/db';
import { pageContent } from '@/db/schema';
import { getSession } from '@/app/login/actions';
import { revalidatePath } from 'next/cache';
import { eq } from 'drizzle-orm';

export async function getPageContent(pagePath: string) {
  console.log(`getPageContent: Attempting to fetch content for pagePath: ${pagePath}`);
  const content = await db.query.pageContent.findFirst({
    where: eq(pageContent.pagePath, pagePath),
  });
  console.log(`getPageContent: Result for ${pagePath}:`, content ? 'Found' : 'Not Found');
  return content ? JSON.parse(content.content) : null;
}

export async function updatePageContent(pagePath: string, newContent: any) {
  const session = await getSession();
  if (!session || session.user?.role !== 'admin') {
    return { error: 'Unauthorized' };
  }

  const contentString = JSON.stringify(newContent);

  await db.insert(pageContent)
    .values({ pagePath, content: contentString })
    .onConflictDoUpdate({
      target: pageContent.pagePath,
      set: { content: contentString, updatedAt: new Date() },
    });

  revalidatePath(pagePath);
  return { message: 'Page content updated successfully!' };
}

export async function seedPageContent() {
  console.log('seedPageContent: Starting seeding process...');
  const pagesToSeed = [
    {
      pagePath: '/dashboard/onboarding',
      defaultContent: {
        mainTitle: "Onboarding Hub",
        mainDescription: "Welcome to your central hub for all onboarding materials. Here you'll find everything you need to get started and succeed within our organization.",
        welcomeTitle: "Welcome Aboard!",
        welcomeDescription: "We're thrilled to have you join our team. This section is designed to guide you through your first few weeks and provide quick access to essential information.",
        welcomeList: [
          "Start with the Onboarding Checklist to ensure a smooth setup.",
          "Familiarize yourself with our Company Values and Mission.",
          "Meet your team and key contacts.",
        ],
        trainingTitle: "Training & Development",
        trainingDescription: "Enhance your skills and grow with our curated training materials.",
        trainingLinks: [
          { text: "Product Knowledge Base", href: "#" },
          { text: "Software Tutorials", href: "#" },
          { text: "Leadership Workshops Schedule", href: "#" },
        ],
        linksTitle: "Important Links",
        importantLinks: [
          { text: "Company Intranet", href: "#" },
          { text: "HR Portal", href: "#" },
          { text: "Support Desk", href: "#" },
        ],
      },
    },
    {
      pagePath: '/dashboard/process-manual',
      defaultContent: {
        mainTitle: "Process Manual",
        mainDescription: "This page contains the official process manual for all company operations.",
        tocTitle: "Table of Contents",
        tocItems: [
          "Section 1: General Operations",
          "Section 2: Departmental Procedures",
          "Section 3: Emergency Protocols",
        ],
      },
    },
    {
      pagePath: '/dashboard/philosophy',
      defaultContent: {
        mainTitle: "Company Philosophy",
        mainDescription: "Our company's core values, mission, and vision are outlined here.",
        missionTitle: "Our Mission",
        missionDescription: "To empower our employees and clients through innovation and collaboration.",
        valuesTitle: "Our Values",
        valuesList: [
          "Integrity",
          "Excellence",
          "Customer Focus",
          "Innovation",
        ],
      },
    },
    {
      pagePath: '/dashboard/schedule-a-time',
      defaultContent: {
        mainTitle: "Schedule a time with me",
        mainDescription: "This page allows you to schedule a time with me. Please use the booking link below.",
        bookingLinkTitle: "Book an Appointment",
        bookingLinkUrl: "https://calendly.com/your-booking-link", // Placeholder
        instructions: "Click the link above to open the scheduling tool in a new tab.",
      },
    },
  ];

  for (const page of pagesToSeed) {
    console.log(`seedPageContent: Checking for existing content for pagePath: ${page.pagePath}`);
    const existingContent = await db.query.pageContent.findFirst({
      where: eq(pageContent.pagePath, page.pagePath),
    });

    if (!existingContent) {
      console.log(`seedPageContent: Inserting default content for pagePath: ${page.pagePath}`);
      await db.insert(pageContent).values({
        pagePath: page.pagePath,
        content: JSON.stringify(page.defaultContent),
      });
    } else {
      console.log(`seedPageContent: Content already exists for pagePath: ${page.pagePath}`);
    }
  }
  console.log('Page content seeded successfully!');
}
