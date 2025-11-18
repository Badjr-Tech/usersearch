'use server';

import { db } from '@/db';
import { files } from '@/db/schema';
import { getSession } from '@/app/login/actions';
import { revalidatePath } from 'next/cache';
import { eq } from 'drizzle-orm';
import { put } from '@vercel/blob'; // Assuming Vercel Blob for storage

export async function uploadFile(formData: FormData) {
  const session = await getSession();
  if (!session || !session.user) {
    return { error: 'Unauthorized' };
  }

  const file = formData.get('file') as File;
  const category = formData.get('category') as string;

  if (!file) {
    return { error: 'No file provided.' };
  }

  try {
    // Upload file to Vercel Blob storage
    const { url } = await put(file.name, file, { access: 'public' });

    // Save file metadata to the database
    await db.insert(files).values({
      name: file.name,
      url: url,
      category: category || null,
      uploaderId: session.user.id,
    });

    revalidatePath('/dashboard/resources');
    return { message: 'File uploaded successfully!' };
  } catch (error) {
    console.error('Error uploading file:', error);
    return { error: 'Failed to upload file.' };
  }
}

export async function getFiles() {
  const session = await getSession();
  if (!session || !session.user) {
    return [];
  }
  const allFiles = await db.query.files.findMany();
  return allFiles;
}

export async function deleteFile(fileId: number) {
  const session = await getSession();
  if (!session || !session.user) {
    return { error: 'Unauthorized' };
  }

  // TODO: Implement actual deletion from Vercel Blob storage
  // For now, just delete from DB
  await db.delete(files).where(eq(files.id, fileId));

  revalidatePath('/dashboard/resources');
  return { message: 'File deleted successfully!' };
}
