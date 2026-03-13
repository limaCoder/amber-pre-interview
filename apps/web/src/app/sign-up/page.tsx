import { auth } from "@amber-pre-interview/auth";
import type { Route } from "next";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import SignUpForm from "@/components/sign-up-form";

export default async function SignUpPage() {
	const session = await auth.api.getSession({
		headers: await headers(),
	});

	if (session?.user) {
		redirect("/dashboard" as Route);
	}

	return (
		<main className="flex min-h-svh items-center justify-center p-6">
			<SignUpForm />
		</main>
	);
}
