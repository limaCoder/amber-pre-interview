"use client";

import {
	Avatar,
	AvatarFallback,
} from "@amber-pre-interview/ui/components/avatar";
import { Button } from "@amber-pre-interview/ui/components/button";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarRail,
} from "@amber-pre-interview/ui/components/sidebar";
import { LayoutDashboardIcon, LogOutIcon } from "lucide-react";
import { useRouter } from "next/navigation";

import { authClient } from "@/lib/auth-client";

const WHITESPACE_REGEX = /\s+/;

const getUserInitials = (fullName: string): string => {
	const words = fullName.trim().split(WHITESPACE_REGEX).filter(Boolean);

	if (words.length === 0) {
		return "U";
	}

	if (words.length === 1) {
		const firstTwoChars = Array.from(words[0]).slice(0, 2);
		return firstTwoChars.join("").toUpperCase();
	}

	const first = Array.from(words[0])[0] ?? "";
	const last = Array.from(words.at(-1) ?? "")[0] ?? "";
	return `${first}${last}`.toUpperCase();
};

export default function AppSidebar({
	userEmail,
	userName,
}: {
	userEmail: string;
	userName: string;
}) {
	const router = useRouter();
	const initials = getUserInitials(userName);

	return (
		<Sidebar collapsible="icon">
			<SidebarHeader>
				<div className="rounded-md border border-sidebar-border/80 px-3 py-2 font-semibold text-sidebar-foreground text-sm tracking-[0.3em] group-data-[collapsible=icon]:flex group-data-[collapsible=icon]:items-center group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0">
					<span className="group-data-[collapsible=icon]:hidden">XPTO</span>
					<span className="hidden group-data-[collapsible=icon]:inline">X</span>
				</div>
			</SidebarHeader>
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupLabel>Navigation</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							<SidebarMenuItem>
								<SidebarMenuButton isActive>
									<LayoutDashboardIcon />
									<span>Dashboard</span>
								</SidebarMenuButton>
							</SidebarMenuItem>
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
				<SidebarGroup>
					<SidebarGroupContent>
						<div className="flex items-center gap-2 px-2 py-1 group-data-[collapsible=icon]:justify-center">
							<Avatar className="size-8 border border-sidebar-border/80">
								<AvatarFallback className="bg-sidebar-accent text-sidebar-accent-foreground">
									{initials}
								</AvatarFallback>
							</Avatar>
							<div className="min-w-0 group-data-[collapsible=icon]:hidden">
								<p className="truncate font-medium text-sidebar-foreground text-xs">
									{userName}
								</p>
								<p className="truncate text-sidebar-foreground/70 text-xs">
									{userEmail}
								</p>
							</div>
						</div>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
			<SidebarFooter>
				<Button
					aria-label="Sign out"
					className="w-full justify-start group-data-[collapsible=icon]:size-8 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0"
					onClick={() => {
						authClient.signOut({
							fetchOptions: {
								onSuccess: () => {
									router.push("/");
									router.refresh();
								},
							},
						});
					}}
					variant="ghost"
				>
					<LogOutIcon data-icon="inline-start" />
					<span className="group-data-[collapsible=icon]:hidden">Sign out</span>
				</Button>
			</SidebarFooter>
			<SidebarRail />
		</Sidebar>
	);
}
