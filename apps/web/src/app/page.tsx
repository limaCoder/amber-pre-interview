import { auth } from "@amber-pre-interview/auth";
import type { Route } from "next";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import AuthLayout from "@/components/auth-layout";
import SignInForm from "@/components/sign-in-form";

export default async function HomePage() {
	const session = await auth.api.getSession({
		headers: await headers(),
	});

	if (session?.user) {
		redirect("/dashboard" as Route);
	}

	return (
		<AuthLayout
			description="Enter your credentials to access your account"
			title="Welcome back"
		>
			<SignInForm />
		</AuthLayout>
	);
}
