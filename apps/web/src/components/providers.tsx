"use client";

import { Toaster } from "@amber-pre-interview/ui/components/sonner";
import { TooltipProvider } from "@amber-pre-interview/ui/components/tooltip";

import { ThemeProvider } from "./theme-provider";

export default function Providers({ children }: { children: React.ReactNode }) {
	return (
		<ThemeProvider
			attribute="class"
			defaultTheme="system"
			disableTransitionOnChange
			enableSystem
		>
			<TooltipProvider>
				{children}
				<Toaster richColors />
			</TooltipProvider>
		</ThemeProvider>
	);
}
