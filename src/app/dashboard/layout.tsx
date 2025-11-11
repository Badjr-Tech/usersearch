import { redirect } from "next/navigation";
import { getSession } from "@/app/login/actions";
import LogoutButton from "@/app/components/LogoutButton";
import Image from "next/image";
import Link from "next/link";
import { getAllUserBusinesses } from "./businesses/actions";
// import AdminViewToggle from "./components/AdminViewToggle"; // New import
// import { headers, cookies } from "next/headers"; // New import for searchParams and cookies

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
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-secondary-accent text-white p-4 space-y-6">
        <nav className="space-y-2">
          <Link href="/dashboard" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-light-gray">Home</Link>
          <Link href="/dashboard/businesses" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-light-gray">Businesses</Link>
          {businesses.map((business) => (
            <Link key={business.id} href={`/dashboard/businesses/${business.id}`} className="block py-2 px-6 text-sm rounded transition duration-200 hover:bg-light-gray">
              - {business.businessName}
            </Link>
          ))}
          <Link href="/dashboard/heighten-ai" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-light-gray">Heighten.Ai</Link>
          <Link href="/dashboard/messages" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-light-gray">Messages</Link>
          <Link href="/dashboard/resources" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-light-gray">Resources</Link>
          <Link href="/dashboard/hth-class" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-light-gray">HTH Class</Link>
          <Link href="/dashboard/settings" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-light-gray">Settings</Link>
          <Link href="/dashboard/profile" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-light-gray">Profile</Link>
          {isAdmin && (
            <>
              <h2 className="text-lg font-semibold text-light-gray uppercase mt-6 mb-2">Admin Tools</h2>
              <Link href="/dashboard/admin/users" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-light-gray">Admin Users</Link>
              <Link href="/dashboard/admin/businesses/manage" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-light-gray">Admin Businesses</Link>
              <Link href="/dashboard/admin/pitch-competition" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-light-gray">Admin Pitch Competition</Link>
              <Link href="/dashboard/admin/hth-class" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-light-gray">Admin HTH Class</Link>
            </>
          )}
        </nav>
        <div className="absolute bottom-4 left-4">
          <LogoutButton />
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 flex flex-col text-gray-900 p-6">
        {children}
      </main>
    </div>
  );
}