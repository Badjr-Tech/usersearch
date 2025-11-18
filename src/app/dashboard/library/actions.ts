'use server';

import { db } from "@/db";
import { libraryItems, itemTypeEnum, categories } from "@/db/schema";
import { eq } from "drizzle-orm";
import { getSession, SessionPayload } from "@/app/login/actions";
import { revalidatePath } from "next/cache";
import { put } from "@vercel/blob";
import { InferInsertModel } from "drizzle-orm";

type FormState = {
  message: string;
  error: string;
} | undefined;

type NewLibraryItem = InferInsertModel<typeof libraryItems>;
type NewCategory = InferInsertModel<typeof categories>;

async function getUserIdFromSession(): Promise<number | undefined> {
  const session: SessionPayload | null = await getSession();
  return session?.user?.id;
}

export async function getCategories() {
  try {
    const allCategories = await db.query.categories.findMany();
    return allCategories;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}

export async function createCategory(prevState: FormState, formData: FormData): Promise<FormState> {
  const userId = await getUserIdFromSession();

  if (!userId) {
    return { message: "", error: "User not authenticated." };
  }

  const name = formData.get("name") as string;

  if (!name) {
    return { message: "", error: "Category name is required." };
  }

  try {
    const newCategory: NewCategory = { name };
    await db.insert(categories).values(newCategory);

    revalidatePath("/dashboard/library");
    return { message: "Category created successfully!", error: "" };
  } catch (error) {
    console.error("Error creating category:", error);
    return { message: "", error: "Failed to create category." };
  }
}

export async function getLibraryItems() {
  try {
    const items = await db.query.libraryItems.findMany({
      with: {
        category: true,
      },
      orderBy: (libraryItems, { desc }) => [desc(libraryItems.createdAt)],
    });
    return items;
  } catch (error) {
    console.error("Error fetching library items:", error);
    return [];
  }
}

export async function createLibraryItem(prevState: FormState, formData: FormData): Promise<FormState> {
  const userId = await getUserIdFromSession();

  if (!userId) {
    return { message: "", error: "User not authenticated." };
  }

  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const itemType = formData.get("itemType") as 'document' | 'video';
  const url = formData.get("url") as string;
  const file = formData.get("file") as File;
  const categoryId = formData.get("categoryId") as string;

  if (!title || !itemType) {
    return { message: "", error: "Title and item type are required." };
  }

  if (itemType === 'video' && !url) {
    return { message: "", error: "URL is required for video items." };
  }

  if (itemType === 'document' && !file) {
    return { message: "", error: "File is required for document items." };
  }

  try {
    let fileUrl: string | undefined;
    if (itemType === 'document' && file && file.size > 0) {
      const blob = await put(file.name, file, { access: 'public', allowOverwrite: true });
      fileUrl = blob.url;
    }

    const newLibraryItem: NewLibraryItem = {
      title,
      description,
      itemType,
      url: itemType === 'document' ? fileUrl! : url,
      uploaderId: userId,
      categoryId: categoryId ? parseInt(categoryId) : null,
    };

    await db.insert(libraryItems).values(newLibraryItem);

    revalidatePath("/dashboard/library");
    return { message: "Library item created successfully!", error: "" };
  } catch (error) {
    console.error("Error creating library item:", error);
    return { message: "", error: "Failed to create library item." };
  }
}

export async function deleteLibraryItem(itemId: number): Promise<FormState> {
  const userId = await getUserIdFromSession();

  if (!userId) {
    return { message: "", error: "User not authenticated." };
  }

  try {
    await db.delete(libraryItems).where(eq(libraryItems.id, itemId));

    revalidatePath("/dashboard/library");
    return { message: "Library item deleted successfully!", error: "" };
  } catch (error) {
    console.error("Error deleting library item:", error);
    return { message: "", error: "Failed to delete library item." };
  }
}
