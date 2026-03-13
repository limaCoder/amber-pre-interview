"use client";

import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@amber-pre-interview/ui/components/dropdown-menu";
import { FilterIcon } from "lucide-react";
import { STATUS_OPTIONS } from "@/data/orders-domain";
import type { OrderStatus } from "./types";

interface OrdersRfqTableFilterDropdownProps {
	onClearFilters: () => void;
	onToggleStatus: (status: OrderStatus) => void;
	selectedStatuses: Set<OrderStatus>;
}

export function OrdersRfqTableFilterDropdown({
	onClearFilters,
	onToggleStatus,
	selectedStatuses,
}: OrdersRfqTableFilterDropdownProps) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger className="inline-flex h-7 items-center gap-1 rounded-md px-2 text-muted-foreground text-xs outline-hidden ring-ring/50 hover:bg-muted hover:text-foreground focus-visible:ring-1">
				<FilterIcon />
				Filter by
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<DropdownMenuGroup>
					<DropdownMenuLabel>Status</DropdownMenuLabel>
					{STATUS_OPTIONS.map((status) => (
						<DropdownMenuCheckboxItem
							checked={selectedStatuses.has(status)}
							key={status}
							onCheckedChange={() => onToggleStatus(status)}
						>
							{status}
						</DropdownMenuCheckboxItem>
					))}
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuItem onClick={onClearFilters}>
					Clear filters
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
