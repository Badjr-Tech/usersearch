import { getPageContent } from '../page-content/actions';
import ProcessManualClientPage from './ProcessManualClientPage';
import { getSession } from '@/app/login/actions';

export default async function ProcessManualPage() {
  const session = await getSession();
  const isAdmin = session?.user?.role === 'admin';

  const initialContent = await getPageContent('/dashboard/process-manual');

  const defaultContent = {
    mainTitle: "Process Manual",
    mainDescription: "This page contains the official process manual for all company operations.",
    tocTitle: "Table of Contents",
    tocItems: [
      "Section 1: General Operations",
      "Section 2: Departmental Procedures",
      "Section 3: Emergency Protocols",
    ],
  };

  const contentToRender = initialContent || defaultContent;

  return <ProcessManualClientPage isAdmin={isAdmin} initialContent={contentToRender} />;
}