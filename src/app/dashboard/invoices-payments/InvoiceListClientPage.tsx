'use client';

import { useState } from 'react';
import { useWhitelabel } from '@/app/context/WhitelabelContext';
import { updateInvoiceStatus } from './actions'; // Assuming this action exists

interface Invoice {
  id: number;
  userId: number;
  invoiceNumber: string;
  amount: number;
  dueDate: string;
  status: 'paid' | 'unpaid' | 'overdue';
  pdfUrl?: string;
  createdAt: string;
}

interface InvoiceListClientPageProps {
  initialInvoices: Invoice[];
  isAdmin: boolean;
}

export default function InvoiceListClientPage({ initialInvoices, isAdmin }: InvoiceListClientPageProps) {
  const { settings } = useWhitelabel();
  const [invoices, setInvoices] = useState(initialInvoices);
  const [sortBy, setSortBy] = useState<'date' | 'amount' | 'status'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const sortedInvoices = [...invoices].sort((a, b) => {
    if (sortBy === 'date') {
      return sortOrder === 'asc'
        ? new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        : new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    } else if (sortBy === 'amount') {
      return sortOrder === 'asc'
        ? a.amount - b.amount
        : b.amount - a.amount;
    } else if (sortBy === 'status') {
      // Custom sort for status: unpaid > overdue > paid
      const statusOrder = { 'unpaid': 1, 'overdue': 2, 'paid': 3 };
      return sortOrder === 'asc'
        ? statusOrder[a.status] - statusOrder[b.status]
        : statusOrder[b.status] - statusOrder[a.status];
    }
    return 0;
  });

  const handleSortChange = (newSortBy: 'date' | 'amount' | 'status') => {
    if (sortBy === newSortBy) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(newSortBy);
      setSortOrder('desc'); // Default sort order for new sort category
    }
  };

  const handlePayInvoice = async (invoiceId: number) => {
    // Placeholder for payment integration
    alert('Payment integration coming soon!');
    // In a real application, this would initiate a payment flow
    // On successful payment, update the invoice status
    // const result = await updateInvoiceStatus(invoiceId, 'paid');
    // if (result?.message) {
    //   // Re-fetch or update local state
    //   setInvoices(prev => prev.map(inv => inv.id === invoiceId ? { ...inv, status: 'paid' } : inv));
    // }
  };

  return (
    <div className="space-y-6">
      {/* Sorting Controls */}
      <div className="flex items-center space-x-4 mb-6">
        <span className="text-gray-700">Sort by:</span>
        <button
          onClick={() => handleSortChange('date')}
          className={`px-3 py-1 rounded-md text-sm font-medium ${sortBy === 'date' ? 'text-white' : 'text-gray-700 bg-gray-200'}`}
          style={sortBy === 'date' ? { backgroundColor: settings.primaryColor } : {}}
        >
          Date {sortBy === 'date' && (sortOrder === 'asc' ? '▲' : '▼')}
        </button>
        <button
          onClick={() => handleSortChange('amount')}
          className={`px-3 py-1 rounded-md text-sm font-medium ${sortBy === 'amount' ? 'text-white' : 'text-gray-700 bg-gray-200'}`}
          style={sortBy === 'amount' ? { backgroundColor: settings.primaryColor } : {}}
        >
          Amount {sortBy === 'amount' && (sortOrder === 'asc' ? '▲' : '▼')}
        </button>
        <button
          onClick={() => handleSortChange('status')}
          className={`px-3 py-1 rounded-md text-sm font-medium ${sortBy === 'status' ? 'text-white' : 'text-gray-700 bg-gray-200'}`}
          style={sortBy === 'status' ? { backgroundColor: settings.primaryColor } : {}}
        >
          Status {sortBy === 'status' && (sortOrder === 'asc' ? '▲' : '▼')}
        </button>
      </div>

      {sortedInvoices.length === 0 ? (
        <p className="text-gray-600">No invoices found.</p>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {sortedInvoices.map((invoice) => (
            <div key={invoice.id} className="bg-white shadow-md rounded-lg p-4 flex flex-col md:flex-row justify-between items-start md:items-center">
              <div className="flex-1 mb-2 md:mb-0">
                <h3 className="text-lg font-semibold text-foreground">Invoice #{invoice.invoiceNumber}</h3>
                <p className="text-gray-700">Amount: ${invoice.amount.toFixed(2)}</p>
                <p className="text-gray-700">Due: {new Date(invoice.dueDate).toLocaleDateString()}</p>
                <p className={`text-sm font-medium ${invoice.status === 'paid' ? 'text-green-600' : invoice.status === 'overdue' ? 'text-red-600' : 'text-yellow-600'}`}>
                  Status: {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                </p>
              </div>
              <div className="flex space-x-2">
                {invoice.pdfUrl && (
                  <a
                    href={invoice.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1 rounded-md text-sm font-medium text-white"
                    style={{ backgroundColor: settings.secondaryColor }}
                  >
                    Download PDF
                  </a>
                )}
                {invoice.status !== 'paid' && (
                  <button
                    onClick={() => handlePayInvoice(invoice.id)}
                    className="px-3 py-1 rounded-md text-sm font-medium text-white"
                    style={{ backgroundColor: settings.primaryColor }}
                  >
                    Pay Now
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
