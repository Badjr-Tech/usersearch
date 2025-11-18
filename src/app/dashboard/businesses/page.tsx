import { redirect } from "next/navigation";
import { getSession } from "@/app/login/actions";
import YourBusinessesPageContent from "./YourBusinessesPageContent";

export default async function BusinessesPage() {
  const session = await getSession();
  if (!session || !session.user || session.user.role !== 'admin') {
    redirect("/dashboard");
  }

  return <YourBusinessesPageContent />;
}
