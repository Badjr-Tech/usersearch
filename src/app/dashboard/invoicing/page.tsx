import { getAllUsers, createInvoice } from '../invoices-payments/actions';
import { getSession } from '@/app/login/actions';
import { redirect } from 'next/navigation';
import CreateInvoiceForm from './CreateInvoiceForm'; // Client component for the form

export default async function InvoicingPage() {
  const session = await getSession();
  if (!session || session.user?.role !== 'admin') {
    redirect('/dashboard'); // Redirect non-admins
  }

  const users = await getAllUsers();

  return (
    <div className="flex-1 p-6">
      <h1 className="text-3xl font-bold text-foreground mb-6">Create & Manage Invoices</h1>
      <p className="text-lg text-gray-700 mb-8">
        Use this page to create new invoices and manage existing ones.
      </p>

      <CreateInvoiceForm users={users} />

      {/* TODO: Display list of all invoices for admin overview */}
      <div className="mt-12 bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-foreground mb-4">All Invoices</h2>
        <p className="text-gray-600">
          (Coming soon: A comprehensive list of all invoices with filtering and sorting options.)
        </p>
      </div>
    </div>
  );
}
