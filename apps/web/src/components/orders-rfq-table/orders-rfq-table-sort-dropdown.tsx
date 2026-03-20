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
import { ArrowUpNarrowWideIcon } from "lucide-react";
import { SORT_OPTIONS } from "./constants";
import type { OrdersRfqTableSortDropdownProps } from "./types";

export function OrdersRfqTableSortDropdown({
	onSetSortField,
	onToggleDirection,
	sortRules,
}: OrdersRfqTableSortDropdownProps) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger className="inline-flex h-8 items-center gap-1 rounded-md px-2 text-muted-foreground text-xs outline-hidden ring-ring/50 hover:bg-muted hover:text-foreground focus-visible:ring-1">
				<ArrowUpNarrowWideIcon className="size-3.5" />
				Sorted by
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end" className="min-w-64">
				<DropdownMenuGroup>
					<DropdownMenuLabel>Primary sort</DropdownMenuLabel>
					{SORT_OPTIONS.map((option) => (
						<DropdownMenuCheckboxItem
							checked={sortRules[0]?.field === option.field}
							key={option.field}
							onCheckedChange={() => onSetSortField("primary", option.field)}
						>
							{option.label}
						</DropdownMenuCheckboxItem>
					))}
				</DropdownMenuGroup>
				<DropdownMenuItem onClick={() => onToggleDirection("primary")}>
					Toggle direction (
					{sortRules[0]?.direction === "asc" ? "ascending" : "descending"})
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<DropdownMenuLabel>Secondary sort</DropdownMenuLabel>
					{SORT_OPTIONS.map((option) => (
						<DropdownMenuCheckboxItem
							checked={sortRules[1]?.field === option.field}
							key={`secondary-${option.field}`}
							onCheckedChange={() => onSetSortField("secondary", option.field)}
						>
							{option.label}
						</DropdownMenuCheckboxItem>
					))}
				</DropdownMenuGroup>
				<DropdownMenuItem onClick={() => onToggleDirection("secondary")}>
					Toggle direction (
					{sortRules[1]?.direction === "asc" ? "ascending" : "descending"})
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
