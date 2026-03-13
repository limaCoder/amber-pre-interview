import { auth } from "@amber-pre-interview/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import DashboardShell from "@/components/dashboard-shell";

export default async function DashboardPage() {
	const session = await auth.api.getSession({
		headers: await headers(),
	});

	if (!session?.user) {
		redirect("/");
	}

	const userName = session.user.name || session.user.email || "User";
	const userEmail = session.user.email || "No email";

	return <DashboardShell userEmail={userEmail} userName={userName} />;
}
