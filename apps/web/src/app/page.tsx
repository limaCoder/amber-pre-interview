import { auth } from "@amber-pre-interview/auth";
import type { Route } from "next";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import SignInForm from "@/components/sign-in-form";

export default async function HomePage() {
	const session = await auth.api.getSession({
		headers: await headers(),
	});

	if (session?.user) {
		redirect("/dashboard" as Route);
	}

	return (
		<main className="flex min-h-svh items-center justify-center p-6">
			<SignInForm />
		</main>
	);
}
