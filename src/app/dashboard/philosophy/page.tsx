import { getPageContent } from '../page-content/actions';
import PhilosophyClientPage from './PhilosophyClientPage';
import { getSession } from '@/app/login/actions';

export default async function PhilosophyPage() {
  const session = await getSession();
  const isAdmin = session?.user?.role === 'admin';

  const initialContent = await getPageContent('/dashboard/philosophy');

  const defaultContent = {
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
  };

  const contentToRender = initialContent || defaultContent;

  return <PhilosophyClientPage isAdmin={isAdmin} initialContent={contentToRender} />;
}