'use client';

import { useState } from "react";
import { getEvents, getSubmissionsForEvent, createEvent } from "./server-actions";
import { InferSelectModel } from "drizzle-orm";
import { events, eventSubmissions, users } from "@/db/schema";
import Link from "next/link";
import CreateEventModal from "./CreateEventModal"; // This will be created next
import { useWhitelabel } from "@/app/context/WhitelabelContext";

type Event = InferSelectModel<typeof events>;
type Submission = InferSelectModel<typeof eventSubmissions> & { user: InferSelectModel<typeof users> };

interface EventsClientPageProps {
  initialEvents: string;
}

export default function EventsClientPage({ initialEvents }: EventsClientPageProps) {
  const { settings } = useWhitelabel();
  const [events, setEvents] = useState<Event[]>(JSON.parse(initialEvents));
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoadingSubmissions, setIsLoadingSubmissions] = useState(false);

  const handleCreateEvent = async (event: { name: string; description?: string; }) => {
    try {
      await createEvent(event);
      const updatedEvents = await getEvents();
      setEvents(updatedEvents);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Failed to create event:", error);
      alert(`Failed to create event: ${error instanceof Error ? error.message : String(error)}`);
    }
  };

  const handleSelectEvent = async (event: Event) => {
    setSelectedEvent(event);
    setIsLoadingSubmissions(true);
    try {
      const eventSubmissions = await getSubmissionsForEvent(event.id);
      setSubmissions(eventSubmissions);
    } catch (error) {
      console.error("Failed to load submissions:", error);
      alert("Failed to load submissions.");
    }
    setIsLoadingSubmissions(false);
  };

  if (selectedEvent) {
    return (
      <div>
        <button onClick={() => setSelectedEvent(null)} className="text-indigo-600 hover:underline mb-4">← Back to Events</button>
        <h1 className="text-2xl font-bold mb-4">Submissions for {selectedEvent.name}</h1>
        {isLoadingSubmissions ? <p>Loading submissions...</p> : (
          <div className="mt-8">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-background">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Project Name</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Submitter</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                </tr>
              </thead>
              <tbody className="bg-background divide-y divide-gray-200">
                {submissions.map((submission) => (
                  <tr key={submission.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-foreground">
                      <Link href={`/dashboard/admin/events/projects/${submission.id}`} className="text-indigo-600 hover:underline">
                        {submission.projectName}
                      </Link>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{submission.user.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(submission.submittedAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {submissions.length === 0 && <p className="text-center text-gray-500 mt-4">No submissions for this event yet.</p>}
          </div>
        )}
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Events</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="text-white px-4 py-2 rounded-md"
          style={{ backgroundColor: settings.primaryColor }}
        >
          Create Event
        </button>
        {isModalOpen && (
          <CreateEventModal
            onAdd={handleCreateEvent}
            onClose={() => setIsModalOpen(false)}
          />
        )}
      </div>
      <div className="mt-8">
        <div className="bg-background shadow overflow-hidden sm:rounded-md">
          <ul role="list" className="divide-y divide-gray-200">
            {events.map((event) => (
              <li key={event.id}>
                <a href="#" onClick={(e) => { e.preventDefault(); handleSelectEvent(event); }} className="block hover:bg-background">
                  <div className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-indigo-600 truncate">{event.name}</p>
                      <div className="ml-2 flex-shrink-0 flex">
                        <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          {event.startDate ? new Date(event.startDate).toLocaleDateString() : 'TBA'} - {event.endDate ? new Date(event.endDate).toLocaleDateString() : 'TBA'}
                        </p>
                      </div>
                    </div>
                    <div className="mt-2 sm:flex sm:justify-between">
                      <div className="sm:flex">
                        <p className="flex items-center text-sm text-gray-500">
                          {event.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </div>
        {events.length === 0 && <p className="text-center text-gray-500 mt-4">No events found. Create one to get started.</p>}
      </div>
    </div>
  );
}