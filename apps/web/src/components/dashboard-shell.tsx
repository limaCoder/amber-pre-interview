"use client";

import {
	SidebarInset,
	SidebarProvider,
} from "@amber-pre-interview/ui/components/sidebar";
import { cn } from "@amber-pre-interview/ui/lib/utils";
import { usePathname } from "next/navigation";

import AppSidebar from "@/components/app-sidebar";

const PAGE_TITLES_BY_PATH: Record<string, string> = {
	"/dashboard": "Products",
	"/dashboard/assistant": "Assistant",
	"/dashboard/forecast": "Forecast",
	"/dashboard/inbox": "Inbox",
	"/dashboard/orders": "Orders",
	"/dashboard/payments": "Payments",
	"/dashboard/products": "Products",
	"/dashboard/quotes": "Quotes",
	"/dashboard/settings": "Settings",
	"/dashboard/shipments": "Shipments",
	"/dashboard/suppliers": "Suppliers",
	"/dashboard/support": "Support",
	"/dashboard/workflows": "Workflows",
};

const getPageTitle = (pathname: string): string => {
	if (pathname.startsWith("/dashboard/orders/")) {
		return "Orders";
	}

	return PAGE_TITLES_BY_PATH[pathname] ?? "Dashboard";
};

export default function DashboardShell({
	children,
	userEmail,
	userName,
}: {
	children: React.ReactNode;
	userEmail: string;
	userName: string;
}) {
	const pathname = usePathname();
	const title = getPageTitle(pathname);
	const isOrdersDetailRoute = pathname.startsWith("/dashboard/orders/");

	return (
		<div className="min-h-svh bg-muted/25 py-2 pr-2 pl-0 md:py-3 md:pr-3 md:pl-0">
			<SidebarProvider className="rounded-2xl bg-sidebar/60 shadow-sm">
				<AppSidebar userEmail={userEmail} userName={userName} />
				<SidebarInset className="overflow-hidden rounded-xl border border-border/70 bg-background">
					<header className="flex h-14 items-center border-b bg-background px-4">
						<h1 className="font-medium text-sm">{title}</h1>
					</header>
					<section
						className={cn(
							"flex min-h-0 flex-1",
							isOrdersDetailRoute
								? "h-full w-full overflow-hidden p-0"
								: "items-center justify-center p-6"
						)}
					>
						{children}
					</section>
				</SidebarInset>
			</SidebarProvider>
		</div>
	);
}
