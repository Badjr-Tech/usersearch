import { getEvents } from "./server-actions";
import EventsClientPage from "./EventsClientPage";

export default async function EventsPage() {
  const events = await getEvents();

  return (
    <EventsClientPage
      initialEvents={JSON.stringify(events)}
    />
  );
}
