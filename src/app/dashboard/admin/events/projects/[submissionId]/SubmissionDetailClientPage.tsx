'use client';

import { InferSelectModel } from "drizzle-orm";
import { eventSubmissions, users } from "@/db/schema";
import Link from "next/link";

type Submission = InferSelectModel<typeof eventSubmissions> & { user: InferSelectModel<typeof users> };

interface SubmissionDetailClientPageProps {
  submission: Submission;
}

export default function SubmissionDetailClientPage({ submission }: SubmissionDetailClientPageProps) {
  return (
    <div>
      <Link href="/dashboard/admin/events" className="text-indigo-600 hover:underline mb-4 inline-block">
        ← Back to Events
      </Link>
      <div className="bg-background shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h1 className="text-2xl font-bold text-foreground">{submission.projectName}</h1>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Submitted by {submission.user.name} ({submission.user.email})
          </p>
        </div>
        <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
          <dl className="sm:divide-y sm:divide-gray-200">
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Project Name</dt>
              <dd className="mt-1 text-sm text-foreground sm:mt-0 sm:col-span-2">{submission.projectName}</dd>
            </div>
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Submitter Name</dt>
              <dd className="mt-1 text-sm text-foreground sm:mt-0 sm:col-span-2">{submission.user.name}</dd>
            </div>
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Submitter Email</dt>
              <dd className="mt-1 text-sm text-foreground sm:mt-0 sm:col-span-2">{submission.user.email}</dd>
            </div>
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Submitted At</dt>
              <dd className="mt-1 text-sm text-foreground sm:mt-0 sm:col-span-2">{new Date(submission.submittedAt).toLocaleString()}</dd>
            </div>
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Project Location</dt>
              <dd className="mt-1 text-sm text-foreground sm:mt-0 sm:col-span-2">{submission.projectLocation}</dd>
            </div>
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Deck</dt>
              <dd className="mt-1 text-sm text-foreground sm:mt-0 sm:col-span-2">
                {submission.deckUrl ? (
                  <a href={submission.deckUrl} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">
                    View Deck
                  </a>
                ) : (
                  'Not provided'
                )}
              </dd>
            </div>
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Video</dt>
              <dd className="mt-1 text-sm text-foreground sm:mt-0 sm:col-span-2">
                {submission.videoUrl ? (
                  <a href={submission.videoUrl} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">
                    Watch Video
                  </a>
                ) : (
                  'Not provided'
                )}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}