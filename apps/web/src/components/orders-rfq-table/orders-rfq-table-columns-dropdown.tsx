"use client";

import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuLabel,
	DropdownMenuTrigger,
} from "@amber-pre-interview/ui/components/dropdown-menu";
import { SlidersHorizontalIcon } from "lucide-react";
import { COLUMN_OPTIONS } from "./constants";
import type { ColumnKey } from "./types";

interface OrdersRfqTableColumnsDropdownProps {
	isColumnVisible: (column: ColumnKey) => boolean;
	onToggleColumn: (column: ColumnKey) => void;
}

export function OrdersRfqTableColumnsDropdown({
	isColumnVisible,
	onToggleColumn,
}: OrdersRfqTableColumnsDropdownProps) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger className="inline-flex h-7 items-center gap-1 rounded-md px-2 text-muted-foreground text-xs outline-hidden ring-ring/50 hover:bg-muted hover:text-foreground focus-visible:ring-1">
				<SlidersHorizontalIcon />
				Hide fields
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<DropdownMenuGroup>
					<DropdownMenuLabel>Visible columns</DropdownMenuLabel>
					{COLUMN_OPTIONS.map((column) => (
						<DropdownMenuCheckboxItem
							checked={isColumnVisible(column.key)}
							key={column.key}
							onCheckedChange={() => onToggleColumn(column.key)}
						>
							{column.label}
						</DropdownMenuCheckboxItem>
					))}
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
