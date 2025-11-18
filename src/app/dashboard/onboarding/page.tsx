import { getPageContent } from '../page-content/actions';
import OnboardingClientPage from './OnboardingClientPage';
import { getSession } from '@/app/login/actions';

export default async function OnboardingPage() {
  const session = await getSession();
  const isAdmin = session?.user?.role === 'admin';
  console.log('OnboardingPage (Server Component): isAdmin', isAdmin);

  const initialContent = await getPageContent('/dashboard/onboarding');

  // Default content structure if no content is found in DB
  const defaultContent = {
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
  };

  const contentToRender = initialContent || defaultContent;

  return <OnboardingClientPage isAdmin={isAdmin} initialContent={contentToRender} />;
}