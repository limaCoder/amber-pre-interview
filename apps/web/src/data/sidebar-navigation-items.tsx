import type { LucideIcon } from "lucide-react";
import {
	BotIcon,
	BoxesIcon,
	CircleHelpIcon,
	CreditCardIcon,
	LayoutDashboardIcon,
	MessageSquareTextIcon,
	PackageIcon,
	SettingsIcon,
	ShoppingCartIcon,
	TrendingUpIcon,
	WorkflowIcon,
	WrenchIcon,
} from "lucide-react";

export interface SidebarNavigationItem {
	href: string;
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
				href: "/dashboard/inbox",
				icon: PackageIcon,
				label: "Inbox",
				matchers: ["/dashboard/inbox"],
			},
			{
				href: "/dashboard/assistant",
				icon: BotIcon,
				label: "Assistant",
				matchers: ["/dashboard/assistant"],
			},
			{
				href: "/dashboard",
				icon: LayoutDashboardIcon,
				label: "Dashboard",
				matchers: ["/dashboard"],
			},
			{
				href: "/dashboard/workflows",
				icon: WorkflowIcon,
				label: "Workflows",
				matchers: ["/dashboard/workflows"],
			},
		],
	},
	{
		placement: "content",
		style: "commerce",
		items: [
			{
				href: "/dashboard",
				icon: BoxesIcon,
				label: "Products",
				matchers: ["/dashboard", "/dashboard/products"],
			},
			{
				href: "/dashboard/orders",
				icon: ShoppingCartIcon,
				label: "Orders",
				matchers: ["/dashboard/orders"],
			},
			{
				href: "/dashboard/quotes",
				icon: MessageSquareTextIcon,
				label: "Quotes",
				matchers: ["/dashboard/quotes"],
			},
			{
				href: "/dashboard/suppliers",
				icon: WrenchIcon,
				label: "Suppliers",
				matchers: ["/dashboard/suppliers"],
			},
			{
				href: "/dashboard/payments",
				icon: CreditCardIcon,
				label: "Payments",
				matchers: ["/dashboard/payments"],
			},
			{
				href: "/dashboard/shipments",
				icon: PackageIcon,
				label: "Shipments",
				matchers: ["/dashboard/shipments"],
			},
			{
				href: "/dashboard/forecast",
				icon: TrendingUpIcon,
				label: "Forecast",
				matchers: ["/dashboard/forecast"],
			},
		],
	},
	{
		placement: "footer",
		style: "default",
		items: [
			{
				href: "/dashboard/settings",
				icon: SettingsIcon,
				label: "Settings",
				matchers: ["/dashboard/settings"],
			},
			{
				href: "/dashboard/support",
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
