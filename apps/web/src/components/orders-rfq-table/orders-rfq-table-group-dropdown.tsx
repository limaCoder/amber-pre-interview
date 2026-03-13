"use client";

import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuLabel,
	DropdownMenuTrigger,
} from "@amber-pre-interview/ui/components/dropdown-menu";
import { FolderTreeIcon } from "lucide-react";
import type { GroupField } from "./types";

interface OrdersRfqTableGroupDropdownProps {
	groupBy: GroupField;
	onGroupByChange: (groupBy: GroupField) => void;
}

export function OrdersRfqTableGroupDropdown({
	groupBy,
	onGroupByChange,
}: OrdersRfqTableGroupDropdownProps) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger className="inline-flex h-7 items-center gap-1 rounded-md px-2 text-muted-foreground text-xs outline-hidden ring-ring/50 hover:bg-muted hover:text-foreground focus-visible:ring-1">
				<FolderTreeIcon />
				Group
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<DropdownMenuGroup>
					<DropdownMenuLabel>Group top-level rows by</DropdownMenuLabel>
					<DropdownMenuCheckboxItem
						checked={groupBy === "none"}
						onCheckedChange={() => onGroupByChange("none")}
					>
						No grouping
					</DropdownMenuCheckboxItem>
					<DropdownMenuCheckboxItem
						checked={groupBy === "status"}
						onCheckedChange={() => onGroupByChange("status")}
					>
						Status
					</DropdownMenuCheckboxItem>
					<DropdownMenuCheckboxItem
						checked={groupBy === "dueMonth"}
						onCheckedChange={() => onGroupByChange("dueMonth")}
					>
						Due month
					</DropdownMenuCheckboxItem>
					<DropdownMenuCheckboxItem
						checked={groupBy === "supplierCount"}
						onCheckedChange={() => onGroupByChange("supplierCount")}
					>
						Supplier count
					</DropdownMenuCheckboxItem>
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
