"use client";

import {
	Button,
	buttonVariants,
} from "@amber-pre-interview/ui/components/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@amber-pre-interview/ui/components/card";
import { Input } from "@amber-pre-interview/ui/components/input";
import { Label } from "@amber-pre-interview/ui/components/label";
import { useForm } from "@tanstack/react-form";
import type { Route } from "next";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import z from "zod";

import { authClient } from "@/lib/auth-client";

const signInSchema = z.object({
	email: z.email("Please enter a valid email address."),
	password: z.string().min(8, "Password must be at least 8 characters."),
});
const dashboardRoute = "/dashboard" as Route;
const signUpRoute = "/sign-up" as Route;

export default function SignInForm() {
	const router = useRouter();

	const form = useForm({
		defaultValues: {
			email: "",
			password: "",
		},
		onSubmit: async ({ value }) => {
			await authClient.signIn.email(
				{
					email: value.email,
					password: value.password,
				},
				{
					onSuccess: () => {
						toast.success("Signed in successfully.");
						router.push(dashboardRoute);
						router.refresh();
					},
					onError: (error) => {
						toast.error(error.error.message || error.error.statusText);
					},
				}
			);
		},
		validators: {
			onSubmit: signInSchema,
		},
	});

	return (
		<Card className="w-full max-w-md">
			<CardHeader>
				<CardTitle>Sign in</CardTitle>
				<CardDescription>
					Enter your credentials to access your account.
				</CardDescription>
			</CardHeader>
			<CardContent>
				<form
					className="flex flex-col gap-5"
					onSubmit={(event) => {
						event.preventDefault();
						event.stopPropagation();
						form.handleSubmit();
					}}
				>
					<form.Field name="email">
						{(field) => (
							<div className="flex flex-col gap-2">
								<Label htmlFor={field.name}>Email</Label>
								<Input
									autoComplete="email"
									id={field.name}
									name={field.name}
									onBlur={field.handleBlur}
									onChange={(event) => field.handleChange(event.target.value)}
									placeholder="name@example.com"
									type="email"
									value={field.state.value}
								/>
								{field.state.meta.errors.map((error, index) => (
									<p
										className="text-destructive text-sm"
										key={`${field.name}-${index}`}
									>
										{error?.message}
									</p>
								))}
							</div>
						)}
					</form.Field>
					<form.Field name="password">
						{(field) => (
							<div className="flex flex-col gap-2">
								<Label htmlFor={field.name}>Password</Label>
								<Input
									autoComplete="current-password"
									id={field.name}
									name={field.name}
									onBlur={field.handleBlur}
									onChange={(event) => field.handleChange(event.target.value)}
									placeholder="Enter your password"
									type="password"
									value={field.state.value}
								/>
								{field.state.meta.errors.map((error, index) => (
									<p
										className="text-destructive text-sm"
										key={`${field.name}-${index}`}
									>
										{error?.message}
									</p>
								))}
							</div>
						)}
					</form.Field>
					<form.Subscribe
						selector={(state) => ({
							canSubmit: state.canSubmit,
							isSubmitting: state.isSubmitting,
						})}
					>
						{({ canSubmit, isSubmitting }) => (
							<Button
								className="w-full"
								disabled={!canSubmit || isSubmitting}
								type="submit"
							>
								{isSubmitting ? "Signing in..." : "Sign in"}
							</Button>
						)}
					</form.Subscribe>
				</form>
			</CardContent>
			<CardFooter>
				<div className="flex w-full flex-col items-center justify-center gap-1">
					<p className="text-muted-foreground text-sm">
						Don&apos;t have an account?
					</p>
					<Link
						className={buttonVariants({
							className: "h-auto px-0",
							variant: "link",
						})}
						href={signUpRoute}
					>
						Create your account
					</Link>
				</div>
			</CardFooter>
		</Card>
	);
}
