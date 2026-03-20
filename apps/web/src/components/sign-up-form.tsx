"use client";

import {
	Button,
	buttonVariants,
} from "@amber-pre-interview/ui/components/button";
import {
	Card,
	CardContent,
	CardFooter,
} from "@amber-pre-interview/ui/components/card";
import { Input } from "@amber-pre-interview/ui/components/input";
import { Label } from "@amber-pre-interview/ui/components/label";
import { useForm } from "@tanstack/react-form";
import { motion } from "motion/react";
import type { Route } from "next";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import z from "zod";

import { authClient } from "@/lib/auth-client";

const signUpSchema = z.object({
	name: z.string().min(2, "Name must be at least 2 characters."),
	email: z.email("Please enter a valid email address."),
	password: z.string().min(8, "Password must be at least 8 characters."),
});
const dashboardRoute = "/dashboard" as Route;
const signInRoute = "/" as Route;

const containerVariants = {
	hidden: { opacity: 0 },
	show: {
		opacity: 1,
		transition: {
			staggerChildren: 0.1,
		},
	},
};

const itemVariants = {
	hidden: { opacity: 0, y: 10 },
	show: { opacity: 1, y: 0 },
};

export default function SignUpForm() {
	const router = useRouter();

	const form = useForm({
		defaultValues: {
			email: "",
			name: "",
			password: "",
		},
		onSubmit: async ({ value }) => {
			await authClient.signUp.email(
				{
					email: value.email,
					name: value.name,
					password: value.password,
				},
				{
					onSuccess: () => {
						toast.success("Account created successfully.");
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
			onSubmit: signUpSchema,
		},
	});

	return (
		<motion.div animate="show" initial="hidden" variants={containerVariants}>
			<Card className="w-full border-white/20 bg-background/60 shadow-xl backdrop-blur-md">
				<CardContent className="pt-6">
					<form
						className="flex flex-col gap-5"
						onSubmit={(event) => {
							event.preventDefault();
							event.stopPropagation();
							form.handleSubmit();
						}}
					>
						<motion.div variants={itemVariants}>
							<form.Field name="name">
								{(field) => (
									<div className="flex flex-col gap-2">
										<Label htmlFor={field.name}>Name</Label>
										<Input
											autoComplete="name"
											className="border-white/10 bg-background/50 transition-colors focus:border-primary/50"
											id={field.name}
											name={field.name}
											onBlur={field.handleBlur}
											onChange={(event) =>
												field.handleChange(event.target.value)
											}
											placeholder="Jane Doe"
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
						</motion.div>

						<motion.div variants={itemVariants}>
							<form.Field name="email">
								{(field) => (
									<div className="flex flex-col gap-2">
										<Label htmlFor={field.name}>Email</Label>
										<Input
											autoComplete="email"
											className="border-white/10 bg-background/50 transition-colors focus:border-primary/50"
											id={field.name}
											name={field.name}
											onBlur={field.handleBlur}
											onChange={(event) =>
												field.handleChange(event.target.value)
											}
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
						</motion.div>

						<motion.div variants={itemVariants}>
							<form.Field name="password">
								{(field) => (
									<div className="flex flex-col gap-2">
										<Label htmlFor={field.name}>Password</Label>
										<Input
											autoComplete="new-password"
											className="border-white/10 bg-background/50 transition-colors focus:border-primary/50"
											id={field.name}
											name={field.name}
											onBlur={field.handleBlur}
											onChange={(event) =>
												field.handleChange(event.target.value)
											}
											placeholder="Create a password"
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
						</motion.div>

						<motion.div variants={itemVariants}>
							<form.Subscribe
								selector={(state) => ({
									canSubmit: state.canSubmit,
									isSubmitting: state.isSubmitting,
								})}
							>
								{({ canSubmit, isSubmitting }) => (
									<Button
										className="w-full shadow-lg shadow-primary/20 transition-all duration-300 hover:shadow-primary/30"
										disabled={!canSubmit || isSubmitting}
										type="submit"
									>
										{isSubmitting ? "Creating account..." : "Create account"}
									</Button>
								)}
							</form.Subscribe>
						</motion.div>
					</form>
				</CardContent>
				<CardFooter>
					<motion.div
						className="flex w-full flex-col items-center justify-center gap-1"
						variants={itemVariants}
					>
						<p className="text-muted-foreground text-sm">
							Already have an account?
						</p>
						<Link
							className={buttonVariants({
								className:
									"h-auto px-0 font-semibold text-primary hover:no-underline",
								variant: "link",
							})}
							href={signInRoute}
						>
							Back to sign in
						</Link>
					</motion.div>
				</CardFooter>
			</Card>
		</motion.div>
	);
}
