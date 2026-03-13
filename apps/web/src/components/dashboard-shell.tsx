"use client";

import {
	SidebarInset,
	SidebarProvider,
} from "@amber-pre-interview/ui/components/sidebar";

import AppSidebar from "@/components/app-sidebar";

export default function DashboardShell({
	userEmail,
	userName,
}: {
	userEmail: string;
	userName: string;
}) {
	return (
		<div className="min-h-svh bg-muted/25 py-2 pr-2 pl-0 md:py-3 md:pr-3 md:pl-0">
			<SidebarProvider className="rounded-2xl bg-sidebar/60 shadow-sm">
				<AppSidebar userEmail={userEmail} userName={userName} />
				<SidebarInset className="overflow-hidden rounded-xl border border-border/70 bg-background">
					<header className="flex h-14 items-center border-b bg-background px-4">
						<h1 className="font-medium text-sm">Products</h1>
					</header>
					<section className="flex flex-1 items-center justify-center p-6">
						<div className="flex flex-col items-center gap-2 text-center">
							<h2 className="font-semibold text-3xl tracking-tight">
								Hello World
							</h2>
							<p className="text-muted-foreground text-sm">
								Welcome, {userName}
							</p>
						</div>
					</section>
				</SidebarInset>
			</SidebarProvider>
		</div>
	);
}
