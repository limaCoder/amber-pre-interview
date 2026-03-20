import { auth } from "@amber-pre-interview/auth";
import type { Route } from "next";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import AuthLayout from "@/components/auth-layout";
import SignUpForm from "@/components/sign-up-form";

export default async function SignUpPage() {
	const session = await auth.api.getSession({
		headers: await headers(),
	});

	if (session?.user) {
		redirect("/dashboard" as Route);
	}

	return (
		<AuthLayout
			description="Create your account to get started with our platform"
			title="Join us today"
		>
			<SignUpForm />
		</AuthLayout>
	);
}
