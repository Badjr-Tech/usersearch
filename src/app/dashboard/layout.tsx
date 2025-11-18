import { redirect } from "next/navigation";
import { getSession } from "@/app/login/actions";
import { getAllUserBusinesses } from "./businesses/actions";
import DashboardContent from "./DashboardContent";
import { seedPageContent } from "./page-content/actions"; // Import the seed action

interface Business {
  id: number;
  businessName: string;
  // Add other properties if they are used in the layout
}

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  if (!session || !session.user) {
    redirect("/login");
  }

  const businesses = await getAllUserBusinesses(session.user.id); // Fetch businesses
  const isAdmin = session.user.role === 'admin';
  const isInternal = session.user.role === 'internal';

  console.log('DashboardLayout: session.user.role', session.user.role);
  console.log('DashboardLayout: isAdmin', isAdmin);
  console.log('DashboardLayout: isInternal', isInternal);

  // Seed page content if not already present
  await seedPageContent();

  return (
    <DashboardContent businesses={businesses} isAdmin={isAdmin} isInternal={isInternal} userRole={session.user.role}>
      {children}
    </DashboardContent>
  );
}