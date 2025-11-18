import { redirect } from "next/navigation";
import { getSession } from "@/app/login/actions";
import { getAllUserBusinesses } from "./businesses/actions";
import { WhitelabelProvider } from "@/app/context/WhitelabelContext";
import DashboardContent from "./DashboardContent";

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

  return (
    <WhitelabelProvider>
      <DashboardContent businesses={businesses} isAdmin={isAdmin}>
        {children}
      </DashboardContent>
    </WhitelabelProvider>
  );
}