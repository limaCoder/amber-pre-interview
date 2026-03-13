import type { LucideIcon } from "lucide-react";
import {
	BotIcon,
	BoxesIcon,
	CircleHelpIcon,
	LayoutDashboardIcon,
	MessageSquareTextIcon,
	PackageIcon,
	SettingsIcon,
	ShoppingCartIcon,
	WorkflowIcon,
	WrenchIcon,
} from "lucide-react";

export interface SidebarNavigationItem {
	icon: LucideIcon;
	label: string;
	matchers: string[];
}

export interface SidebarNavigationGroup {
	items: SidebarNavigationItem[];
	label?: string;
	placement: "content" | "footer";
	style: "default" | "commerce";
}

export const SIDEBAR_NAVIGATION_GROUPS: SidebarNavigationGroup[] = [
	{
		placement: "content",
		style: "default",
		items: [
			{
				icon: PackageIcon,
				label: "Inbox",
				matchers: ["/dashboard/inbox"],
			},
			{
				icon: BotIcon,
				label: "Assistant",
				matchers: ["/dashboard/assistant"],
			},
			{
				icon: LayoutDashboardIcon,
				label: "Dashboard",
				matchers: ["/dashboard"],
			},
			{
				icon: WorkflowIcon,
				label: "Workflows",
				matchers: ["/dashboard/workflows"],
			},
		],
	},
	{
		label: "Commerce",
		placement: "content",
		style: "commerce",
		items: [
			{
				icon: BoxesIcon,
				label: "Products",
				matchers: ["/dashboard", "/dashboard/products"],
			},
			{
				icon: ShoppingCartIcon,
				label: "Orders",
				matchers: ["/dashboard/orders"],
			},
			{
				icon: MessageSquareTextIcon,
				label: "Quotes",
				matchers: ["/dashboard/quotes"],
			},
			{
				icon: WrenchIcon,
				label: "Suppliers",
				matchers: ["/dashboard/suppliers"],
			},
			{
				icon: PackageIcon,
				label: "Shipments",
				matchers: ["/dashboard/shipments"],
			},
		],
	},
	{
		placement: "footer",
		style: "default",
		items: [
			{
				icon: SettingsIcon,
				label: "Settings",
				matchers: ["/dashboard/settings"],
			},
			{
				icon: CircleHelpIcon,
				label: "Support",
				matchers: ["/dashboard/support"],
			},
		],
	},
];

export const isSidebarItemActive = (
	pathname: string,
	item: SidebarNavigationItem
): boolean =>
	item.matchers.some((matcher) => {
		if (matcher === "/dashboard") {
			return pathname === "/dashboard";
		}

		return pathname.startsWith(matcher);
	});
