"use server";

import { db } from "@/db";
import { users } from "@/db/schema";
import bcrypt from "bcrypt";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { getSession } from "@/app/login/actions";

export type FormState = {
  message: string;
  error: string;
} | undefined;

export async function requestAccount(prevState: FormState, formData: FormData): Promise<FormState> {
  const name = formData.get("name") as string;
  const phone = formData.get("phone") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    await db.insert(users).values({
      name,
      phone,
      email,
      password: hashedPassword,
      status: 'pending', // New accounts are pending by default
    });

    console.log("Account request submitted successfully!");
    return { message: "Account request submitted successfully! Awaiting admin approval.", error: "" };
  } catch (error: unknown) {
    console.error("Error requesting account:", error);
    let errorMessage = "Failed to request account.";
    if (error instanceof Error) {
      errorMessage = `Failed to request account: ${error.message}`;
    }
    return { message: "", error: errorMessage };
  }
}

export async function approveAccount(userId: number) {
  const session = await getSession();
  if (!session || session.user?.role !== 'admin') {
    return { error: 'Unauthorized' };
  }

  try {
    await db.update(users)
      .set({ status: 'approved' })
      .where(eq(users.id, userId));
    revalidatePath('/dashboard/admin/account-requests'); // Revalidate admin page
    return { message: 'Account approved successfully!' };
  } catch (e: any) {
    return { error: e.message };
  }
}

export async function rejectAccount(userId: number) {
  const session = await getSession();
  if (!session || session.user?.role !== 'admin') {
    return { error: 'Unauthorized' };
  }

  try {
    await db.update(users)
      .set({ status: 'rejected' })
      .where(eq(users.id, userId));
    revalidatePath('/dashboard/admin/account-requests'); // Revalidate admin page
    return { message: 'Account rejected successfully!' };
  } catch (e: any) {
    return { error: e.message };
  }
}
