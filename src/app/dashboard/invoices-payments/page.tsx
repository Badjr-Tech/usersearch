import { getSession } from '@/app/login/actions';
import { getInvoicesForUser } from './actions';
import { redirect } from 'next/navigation';
import InvoiceListClientPage from './InvoiceListClientPage'; // Client component for display

export default async function InvoicesPaymentsPage() {
  const session = await getSession();
  if (!session || !session.user) {
    redirect('/login');
  }

  const userId = session.user.id;
  const invoices = await getInvoicesForUser(userId);

  // Handle unauthorized access if getInvoicesForUser returns an error object
  if (invoices && 'error' in invoices) {
    // This case should ideally be handled by the server action itself
    // or by ensuring the session check is robust.
    // For now, redirect to dashboard or show an error.
    redirect('/dashboard');
  }

  return (
    <div className="flex-1 p-6">
      <h1 className="text-3xl font-bold text-foreground mb-6">Invoices & Payments</h1>
      <p className="text-lg text-gray-700 mb-8">
        View your invoices and manage your payments here.
      </p>

      <InvoiceListClientPage initialInvoices={invoices} isAdmin={session.user.role === 'admin'} />
    </div>
  );
}