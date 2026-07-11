import { getUserFromToken } from "@/lib/getUserFromToken";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const user = await getUserFromToken();

  if (!user) redirect("/login");

  return (
    <div>
      <h1>Welcome to your Dashboard</h1>
      <p>Role: {user.role}</p>
      <p> User: {user.name} </p>
    </div>
  );
}