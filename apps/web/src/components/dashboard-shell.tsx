"use client";

import { Separator } from "@amber-pre-interview/ui/components/separator";
import {
	SidebarInset,
	SidebarProvider,
	SidebarTrigger,
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
		<SidebarProvider>
			<AppSidebar userEmail={userEmail} userName={userName} />
			<SidebarInset>
				<header className="flex h-14 items-center gap-3 border-b px-4">
					<SidebarTrigger />
					<Separator className="h-4" orientation="vertical" />
					<h1 className="font-medium text-sm">Dashboard</h1>
				</header>
				<section className="flex flex-1 items-center justify-center p-6">
					<div className="flex flex-col items-center gap-2 text-center">
						<h2 className="font-semibold text-3xl tracking-tight">
							Hello World
						</h2>
						<p className="text-muted-foreground text-sm">Welcome, {userName}</p>
					</div>
				</section>
			</SidebarInset>
		</SidebarProvider>
	);
}
