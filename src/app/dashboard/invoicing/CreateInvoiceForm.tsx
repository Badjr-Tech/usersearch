'use client';

import { useState, useActionState } from 'react';
import { createInvoice } from '../invoices-payments/actions';
import { useWhitelabel } from '@/app/context/WhitelabelContext';

interface User {
  id: number;
  name: string;
  email: string;
}

interface CreateInvoiceFormProps {
  users: User[];
}

type FormState = {
  message: string;
  error: string;
} | undefined;

export default function CreateInvoiceForm({ users }: CreateInvoiceFormProps) {
  const { settings } = useWhitelabel();
  const [state, formAction] = useActionState<FormState, FormData>(createInvoice, undefined);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-8">
      <h2 className="text-2xl font-semibold text-foreground mb-4">Create New Invoice</h2>
      <form action={formAction} className="space-y-4">
        <div>
          <label htmlFor="userId" className="block text-sm font-medium text-gray-700">
            Select User
          </label>
          <select
            id="userId"
            name="userId"
            required
            value={selectedUserId || ''}
            onChange={(e) => setSelectedUserId(parseInt(e.target.value))}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="">-- Select a user --</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name} ({user.email})
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="invoiceNumber" className="block text-sm font-medium text-gray-700">
            Invoice Number
          </label>
          <input
            type="text"
            id="invoiceNumber"
            name="invoiceNumber"
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
            Amount
          </label>
          <input
            type="number"
            id="amount"
            name="amount"
            step="0.01"
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700">
            Due Date
          </label>
          <input
            type="date"
            id="dueDate"
            name="dueDate"
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        {state?.message && <p className="text-green-500 text-sm">{state.message}</p>}
        {state?.error && <p className="text-red-500 text-sm">{state.error}</p>}
        <div>
          <button
            type="submit"
            className="inline-flex justify-center rounded-md border border-transparent py-2 px-4 text-sm font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2"
            style={{ backgroundColor: settings.primaryColor }}
          >
            Create Invoice
          </button>
        </div>
      </form>
    </div>
  );
}
