'use server';

import { db } from '@/db';
import { invoices, users } from '@/db/schema';
import { getSession } from '@/app/login/actions';
import { revalidatePath } from 'next/cache';
import { eq } from 'drizzle-orm';

export async function createInvoice(formData: FormData) {
  const session = await getSession();
  if (!session || session.user?.role !== 'admin') {
    return { error: 'Unauthorized' };
  }

  const userId = parseInt(formData.get('userId') as string);
  const invoiceNumber = formData.get('invoiceNumber') as string;
  const amount = formData.get('amount') as string;
  const dueDate = formData.get('dueDate') as string;

  if (!userId || !invoiceNumber || !amount || !dueDate) {
    return { error: 'All fields are required.' };
  }

  try {
    await db.insert(invoices).values({
      userId,
      invoiceNumber,
      amount: parseFloat(amount),
      dueDate: new Date(dueDate),
      status: 'unpaid',
    });
    revalidatePath('/dashboard/invoicing');
    revalidatePath(`/dashboard/invoices-payments`); // Revalidate user's page
    return { message: 'Invoice created successfully!' };
  } catch (e: any) {
    return { error: e.message };
  }
}

export async function getInvoicesForUser(userId: number) {
  const session = await getSession();
  if (!session || (session.user?.id !== userId && session.user?.role !== 'admin')) {
    return { error: 'Unauthorized' };
  }

  const userInvoices = await db.query.invoices.findMany({
    where: eq(invoices.userId, userId),
    orderBy: (invoices, { desc }) => [desc(invoices.createdAt)],
  });
  return userInvoices;
}

export async function getAllUsers() {
  const session = await getSession();
  if (!session || session.user?.role !== 'admin') {
    return { error: 'Unauthorized' };
  }

  const allUsers = await db.query.users.findMany({
    where: eq(users.role, 'external'),
    columns: {
      id: true,
      name: true,
      email: true,
    },
  });
  return allUsers;
}

export async function updateInvoiceStatus(invoiceId: number, newStatus: 'paid' | 'unpaid' | 'overdue') {
  const session = await getSession();
  if (!session || session.user?.role !== 'admin') {
    return { error: 'Unauthorized' };
  }

  try {
    await db.update(invoices)
      .set({ status: newStatus })
      .where(eq(invoices.id, invoiceId));
    revalidatePath('/dashboard/invoicing');
    revalidatePath(`/dashboard/invoices-payments`);
    return { message: 'Invoice status updated successfully!' };
  } catch (e: any) {
    return { error: e.message };
  }
}
