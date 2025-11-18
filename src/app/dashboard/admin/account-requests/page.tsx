import { getSession } from '@/app/login/actions';
import { redirect } from 'next/navigation';
import { db } from '@/db';
import { users } from '@/db/schema';
import { eq } from 'drizzle-orm';
import AccountRequestClientPage from './AccountRequestClientPage';

export default async function AccountRequestsPage() {
  const session = await getSession();
  if (!session || session.user?.role !== 'admin') {
    redirect('/dashboard'); // Only admins can access this page
  }

  const pendingUsers = await db.query.users.findMany({
    where: eq(users.status, 'pending'),
    columns: {
      id: true,
      name: true,
      email: true,
      phone: true,
      role: true, // To show what role they requested, though it will be external by default
    },
  });

  return (
    <div className="flex-1 p-6">
      <h1 className="text-3xl font-bold text-foreground mb-6">Account Requests</h1>
      <p className="text-lg text-gray-700 mb-8">
        Review and manage pending user account requests.
      </p>
      <AccountRequestClientPage pendingUsers={pendingUsers} />
    </div>
  );
}
