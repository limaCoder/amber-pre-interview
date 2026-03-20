"use client";

import { Checkbox } from "@amber-pre-interview/ui/components/checkbox";
import { TableHead, TableRow } from "@amber-pre-interview/ui/components/table";
import { COLUMN_OPTIONS } from "./constants";
import type { OrdersRfqTableHeaderProps } from "./types";

export function OrdersRfqTableHeader({
	headerSelectionState,
	isColumnVisible,
	onToggleSelectAll,
}: OrdersRfqTableHeaderProps) {
	return (
		<TableRow>
			<TableHead className="w-10 px-3">
				<Checkbox
					aria-label="Select all visible rows"
					checked={headerSelectionState === "checked"}
					indeterminate={headerSelectionState === "indeterminate"}
					onCheckedChange={(checked) => onToggleSelectAll(Boolean(checked))}
				/>
			</TableHead>
			{COLUMN_OPTIONS.map((column) =>
				isColumnVisible(column.key) ? (
					<TableHead className={column.headerClassName} key={column.key}>
						{"headerLabel" in column ? column.headerLabel : column.label}
					</TableHead>
				) : null
			)}
			<TableHead aria-label="Actions" className="w-12 pr-3 text-right" />
		</TableRow>
	);
}
