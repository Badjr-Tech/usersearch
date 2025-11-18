"use server";

import { getSession } from "@/app/login/actions";
import { db } from "@/db";
import { users, individualMessages } from "@/db/schema";
import { eq, or } from "drizzle-orm";
import { revalidatePath } from "next/cache";

type FormState = {
  message: string;
  error: string;
} | undefined;

export async function getExternalUsers() {
  try {
    const externalUsers = await db.select().from(users).where(eq(users.role, 'external'));
    return externalUsers;
  } catch (error) {
    console.error("Error fetching external users:", error);
    return [];
  }
}

export async function sendMessage(prevState: FormState, formData: FormData): Promise<FormState> {
  const session = await getSession();
  if (!session || !session.user || session.user.role !== 'admin') {
    return { message: "", error: "User not authenticated or not an admin." };
  }

  const content = formData.get("content") as string;
  const recipientId = formData.get("recipientId") as string;

  if (!content || !recipientId) {
    return { message: "", error: "Message content and recipient are required." };
  }

  try {
    await db.insert(individualMessages).values({
      senderId: session.user.id,
      recipientId: parseInt(recipientId),
      content: content,
      timestamp: new Date(),
    });
    revalidatePath("/dashboard/messages");
    return { message: "Message sent successfully!", error: "" };
  } catch (error) {
    console.error("Error sending individual message:", error);
    return { message: "", error: "Failed to send message." };
  }
}

export async function getIndividualMessages(currentUserId: number, otherUserId: number) {
  try {
    const messages = await db.query.individualMessages.findMany({
      where: or(
        eq(individualMessages.senderId, currentUserId),
        eq(individualMessages.recipientId, currentUserId)
      ),
      orderBy: (messages, { asc }) => [asc(messages.timestamp)],
      with: {
        sender: { columns: { id: true, name: true, email: true } },
        recipient: { columns: { id: true, name: true, email: true } },
      },
    });
    
    // Filter messages to only include those between the two users
    const filteredMessages = messages.filter(message => 
      (message.senderId === currentUserId && message.recipientId === otherUserId) ||
      (message.senderId === otherUserId && message.recipientId === currentUserId)
    );

    return filteredMessages;
  } catch (error) {
    console.error("Error fetching individual messages:", error);
    return [];
  }
}