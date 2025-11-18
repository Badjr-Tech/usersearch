import { getPageContent } from '../page-content/actions';
import ScheduleATimeClientPage from './ScheduleATimeClientPage';
import { getSession } from '@/app/login/actions';

export default async function ScheduleATimePage() {
  const session = await getSession();
  const isAdmin = session?.user?.role === 'admin';

  const initialContent = await getPageContent('/dashboard/schedule-a-time');

  const defaultContent = {
    mainTitle: "Schedule a time with me",
    mainDescription: "This page allows you to schedule a time with me. Please use the booking link below.",
    bookingLinkTitle: "Book an Appointment",
    bookingLinkUrl: "https://calendly.com/your-booking-link", // Placeholder
    instructions: "Click the link above to open the scheduling tool in a new tab.",
  };

  const contentToRender = initialContent || defaultContent;

  return <ScheduleATimeClientPage isAdmin={isAdmin} initialContent={contentToRender} />;
}