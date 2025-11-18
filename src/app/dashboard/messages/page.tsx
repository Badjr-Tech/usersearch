import { getSession } from "@/app/login/actions";
import { getExternalUsers } from "./actions";
import MessagesClientPage from "./MessagesClientPage";
import { redirect } from "next/navigation";

export default async function MessagesPage() {
  const session = await getSession();
  if (!session || !session.user || session.user.role !== 'admin') {
    redirect("/dashboard");
  }

  const externalUsers = await getExternalUsers();
  const currentUserId = session.user.id;

  return (
    <MessagesClientPage
      initialExternalUsers={externalUsers}
      currentUserId={currentUserId}
    />
  );
}
