'use server';

import { db } from "@/db";
import { events, eventSubmissions } from "@/db/schema";
import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { getSession } from "@/app/login/actions";

export async function createEvent(event: {
  name: string;
  description?: string;
  startDate?: Date;
  endDate?: Date;
}) {
  const session = await getSession();
  if (!session || !session.user || session.user.role !== 'admin') {
    throw new Error("Unauthorized: Only admins can create events.");
  }

  await db.insert(events).values({
    ...event,
    createdById: session.user.id,
  });

  revalidatePath("/dashboard/admin/events");
}

export async function getEvents() {
  return await db.query.events.findMany({
    orderBy: (events, { desc }) => [desc(events.createdAt)],
  });
}

export async function getSubmissionsForEvent(eventId: number) {
  return await db.query.eventSubmissions.findMany({
    where: eq(eventSubmissions.eventId, eventId),
    with: {
      user: true, // Include user details with each submission
    },
    orderBy: (submissions, { desc }) => [desc(submissions.submittedAt)],
  });
}

export async function getSubmissionById(submissionId: number) {
  return await db.query.eventSubmissions.findFirst({
    where: eq(eventSubmissions.id, submissionId),
    with: {
      user: true, // Include user details
    },
  });
}