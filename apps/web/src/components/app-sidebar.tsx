"use client";

import {
	Avatar,
	AvatarFallback,
} from "@amber-pre-interview/ui/components/avatar";
import { Button } from "@amber-pre-interview/ui/components/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@amber-pre-interview/ui/components/dropdown-menu";
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
	SidebarSeparator,
	SidebarTrigger,
} from "@amber-pre-interview/ui/components/sidebar";
import { cn } from "@amber-pre-interview/ui/lib/utils";
import {
	ChevronRightIcon,
	CircleIcon,
	LogOutIcon,
	PlusIcon,
} from "lucide-react";
import type { Route } from "next";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import {
	isSidebarItemActive,
	SIDEBAR_NAVIGATION_GROUPS,
	type SidebarNavigationGroup,
} from "@/data/sidebar-navigation-items";
import { authClient } from "@/lib/auth-client";
import { getUserInitials } from "@/utils/get-user-initials";

export default function AppSidebar({
	userEmail,
	userName,
}: {
	userEmail: string;
	userName: string;
}) {
	const router = useRouter();
	const pathname = usePathname();
	const initials = getUserInitials(userName);

	const collapsedIconCenterClassName =
		"group-data-[collapsible=icon]:justify-center";
	const collapsedMenuItemCenterClassName =
		"group-data-[collapsible=icon]:flex group-data-[collapsible=icon]:justify-center";
	const contentNavigationGroups = SIDEBAR_NAVIGATION_GROUPS.filter(
		(group) => group.placement === "content"
	);
	const footerNavigationGroups = SIDEBAR_NAVIGATION_GROUPS.filter(
		(group) => group.placement === "footer"
	);

	const getNavigationItemClassName = (
		isActive: boolean,
		groupStyle: SidebarNavigationGroup["style"]
	): string =>
		cn(
			collapsedMenuItemCenterClassName,
			groupStyle === "commerce" &&
				isActive &&
				"before:absolute before:inset-y-1 before:-left-2 before:z-10 before:w-[3px] before:rounded-r-full before:bg-red-500 before:content-['']"
		);

	const getNavigationButtonClassName = (
		isActive: boolean,
		groupStyle: SidebarNavigationGroup["style"]
	): string =>
		cn(
			collapsedIconCenterClassName,
			groupStyle === "commerce" &&
				isActive &&
				"relative border border-sidebar-border/90 bg-sidebar-accent/35"
		);

	const getNavigationIconClassName = (
		isActive: boolean,
		groupStyle: SidebarNavigationGroup["style"]
	): string =>
		cn(groupStyle === "commerce" && isActive && "text-orange-500") ?? "";

	const handleSignOut = () => {
		authClient.signOut({
			fetchOptions: {
				onSuccess: () => {
					router.push("/");
					router.refresh();
				},
			},
		});
	};

	return (
		<Sidebar className="pl-0" collapsible="icon" variant="inset">
			<SidebarHeader>
				<div className="flex items-center justify-between gap-2 rounded-md px-1 py-1.5 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0">
					<div className="flex min-w-0 items-center gap-2">
						<div className="flex size-7 shrink-0 items-center justify-center rounded-full border border-sidebar-border bg-background">
							<CircleIcon className="size-3 fill-current text-sidebar-foreground" />
						</div>
						<div className="font-semibold text-sidebar-foreground text-sm group-data-[collapsible=icon]:hidden">
							XPTO
						</div>
					</div>
					<SidebarTrigger className="shrink-0 group-data-[collapsible=icon]:hidden" />
				</div>
				<div className="hidden justify-center group-data-[collapsible=icon]:flex">
					<SidebarTrigger />
				</div>
				<SidebarSeparator className="mx-0" />
				<Button
					className="mt-1 w-full items-center justify-center rounded-sm bg-neutral-300/30 text-center hover:bg-slate-300/60 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:gap-0 group-data-[collapsible=icon]:px-0"
					size="sm"
					variant="ghost"
				>
					<PlusIcon />
					<span className="font-medium text-xs group-data-[collapsible=icon]:hidden">
						Create New
					</span>
				</Button>
			</SidebarHeader>
			<SidebarContent className="overflow-x-visible">
				{contentNavigationGroups.map((group) => (
					<SidebarGroup
						key={`${group.placement}-${group.label ?? group.style}`}
					>
						{group.label ? (
							<SidebarGroupLabel>{group.label}</SidebarGroupLabel>
						) : null}
						<SidebarGroupContent>
							<SidebarMenu>
								{group.items.map((item) => {
									const Icon = item.icon;
									const isActive = isSidebarItemActive(pathname, item);

									return (
										<SidebarMenuItem
											className={getNavigationItemClassName(
												isActive,
												group.style
											)}
											key={item.label}
										>
											<SidebarMenuButton
												className={getNavigationButtonClassName(
													isActive,
													group.style
												)}
												isActive={isActive}
												render={<Link href={item.href as Route} />}
											>
												<Icon
													className={getNavigationIconClassName(
														isActive,
														group.style
													)}
												/>
												<span className="group-data-[collapsible=icon]:hidden">
													{item.label}
												</span>
												{group.style === "commerce" && isActive ? (
													<ChevronRightIcon className="ml-auto group-data-[collapsible=icon]:hidden" />
												) : null}
											</SidebarMenuButton>
										</SidebarMenuItem>
									);
								})}
							</SidebarMenu>
						</SidebarGroupContent>
					</SidebarGroup>
				))}
			</SidebarContent>
			<SidebarFooter>
				{footerNavigationGroups.map((group) => (
					<SidebarMenu key={`${group.placement}-${group.label ?? group.style}`}>
						{group.items.map((item) => {
							const Icon = item.icon;
							const isActive = isSidebarItemActive(pathname, item);

							return (
								<SidebarMenuItem
									className={getNavigationItemClassName(isActive, group.style)}
									key={item.label}
								>
									<SidebarMenuButton
										className={getNavigationButtonClassName(
											isActive,
											group.style
										)}
										isActive={isActive}
										render={<Link href={item.href as Route} />}
									>
										<Icon
											className={getNavigationIconClassName(
												isActive,
												group.style
											)}
										/>
										<span className="group-data-[collapsible=icon]:hidden">
											{item.label}
										</span>
									</SidebarMenuButton>
								</SidebarMenuItem>
							);
						})}
					</SidebarMenu>
				))}
				<SidebarSeparator className="mx-0" />
				<DropdownMenu>
					<DropdownMenuTrigger className="w-full rounded-md outline-hidden ring-sidebar-ring transition-colors hover:bg-sidebar-accent focus-visible:ring-2 data-popup-open:bg-sidebar-accent">
						<div className="flex w-full items-center gap-2 px-2 py-1.5 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0">
							<Avatar className="size-8 border border-sidebar-border/80">
								<AvatarFallback className="bg-sidebar-accent text-sidebar-accent-foreground">
									{initials}
								</AvatarFallback>
							</Avatar>
							<div className="min-w-0 text-left group-data-[collapsible=icon]:hidden">
								<p className="truncate font-medium text-sidebar-foreground text-xs">
									{userName}
								</p>
								<p className="truncate text-sidebar-foreground/70 text-xs">
									{userEmail}
								</p>
							</div>
						</div>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end" side="top">
						<DropdownMenuGroup>
							<DropdownMenuLabel>
								<div className="flex min-w-0 items-center gap-2">
									<Avatar className="size-8 border border-sidebar-border/80">
										<AvatarFallback className="bg-sidebar-accent text-sidebar-accent-foreground">
											{initials}
										</AvatarFallback>
									</Avatar>
									<div className="min-w-0">
										<p className="truncate font-medium text-foreground text-xs">
											{userName}
										</p>
										<p className="truncate text-muted-foreground text-xs">
											{userEmail}
										</p>
									</div>
								</div>
							</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<DropdownMenuItem onClick={handleSignOut} variant="destructive">
								<LogOutIcon />
								Sign out
							</DropdownMenuItem>
						</DropdownMenuGroup>
					</DropdownMenuContent>
				</DropdownMenu>
			</SidebarFooter>
			<SidebarRail />
		</Sidebar>
	);
}
