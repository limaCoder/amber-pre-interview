"use client";

import { motion } from "motion/react";
import Image from "next/image";
import type { ReactNode } from "react";

interface AuthLayoutProps {
	children: ReactNode;
	description: string;
	quote?: string;
	title: string;
}

export default function AuthLayout({
	children,
	title,
	description,
	quote = "In AmberOS™ refine specs, prototype with factory partners, issue and adjust POs, book freight, and clear customs. Streamline the path from concept to shelf. Bring best selling products to market fast at higher margins.",
}: AuthLayoutProps) {
	return (
		<main className="grid min-h-svh overflow-hidden lg:grid-cols-2">
			<div className="relative z-10 flex flex-col items-center justify-center bg-background/50 p-6 backdrop-blur-sm lg:bg-background lg:p-12 lg:backdrop-blur-none">
				<motion.div
					animate={{ opacity: 1, y: 0 }}
					className="w-full max-w-md space-y-8"
					initial={{ opacity: 0, y: 20 }}
					transition={{ duration: 0.5, ease: "easeOut" }}
				>
					<div className="flex flex-col space-y-2 text-center lg:text-left">
						<h1 className="font-bold text-3xl tracking-tight">{title}</h1>
						<p className="text-muted-foreground">{description}</p>
					</div>
					{children}
				</motion.div>
			</div>

			<div className="relative hidden overflow-hidden bg-muted lg:block">
				<motion.div
					animate={{ opacity: 1, scale: 1 }}
					className="absolute inset-0 z-0"
					initial={{ opacity: 0, scale: 1.1 }}
					transition={{ duration: 1, ease: "easeOut" }}
				>
					<Image
						alt="Auth Background"
						className="object-cover opacity-80"
						fill
						priority
						src="/auth-bg.png"
					/>
				</motion.div>
				<div className="absolute inset-0 z-10 bg-linear-to-t from-background/20 via-transparent to-transparent" />

				<div className="absolute inset-0 z-15 bg-white/5 backdrop-blur-[1px]" />

				<motion.div
					animate={{ opacity: 1, x: 0 }}
					className="absolute right-12 bottom-12 left-12 z-20 text-foreground drop-shadow-sm"
					initial={{ opacity: 0, x: 20 }}
					transition={{ delay: 0.5, duration: 0.8 }}
				>
					<div className="space-y-4 rounded-2xl border border-white/20 bg-background/40 p-8 shadow-2xl backdrop-blur-md">
						<blockquote className="space-y-2">
							<p className="font-medium text-xl italic leading-relaxed">
								"{quote}"
							</p>
						</blockquote>
					</div>
				</motion.div>
			</div>

			<div className="pointer-events-none fixed inset-0 z-0 overflow-hidden lg:hidden">
				<Image
					alt="Auth Background"
					className="object-cover opacity-10"
					fill
					src="/auth-bg.png"
				/>
			</div>
		</main>
	);
}
