"use client";

import { Checkbox } from "@amber-pre-interview/ui/components/checkbox";
import { TableCell, TableRow } from "@amber-pre-interview/ui/components/table";
import { cn } from "@amber-pre-interview/ui/lib/utils";
import { ChevronDownIcon, ChevronRightIcon, EllipsisIcon } from "lucide-react";
import type { Route } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { formatDate } from "@/utils/date";
import { STATUS_COLORS } from "./constants";
import { SuppliersCell } from "./suppliers-cell";
import type { OrdersDataRowProps } from "./types";
import { formatCurrency } from "./utils";

function OrdersDataRow({
	isColumnVisible,
	isExpanded,
	item,
	onToggleExpand,
	onToggleRowSelection,
	rowSelectionState,
}: OrdersDataRowProps) {
	const rowIsSelected =
		rowSelectionState === "checked" || rowSelectionState === "indeterminate";
	const leftPadding = item.depth === 0 ? "pl-0" : "pl-6";
	const cells: ReactNode[] = [];

	if (isColumnVisible("rfqCode")) {
		cells.push(
			<TableCell key={`${item.id}-rfq`}>
				<div className={cn("flex items-center gap-1.5", leftPadding)}>
					{item.hasChildren ? (
						<button
							aria-label={
								isExpanded
									? `Collapse ${item.row.rfqCode}`
									: `Expand ${item.row.rfqCode}`
							}
							className="inline-flex size-5 items-center justify-center rounded-sm text-muted-foreground hover:bg-muted hover:text-foreground"
							onClick={() => onToggleExpand(item.id)}
							type="button"
						>
							{isExpanded ? (
								<ChevronDownIcon className="size-3.5" />
							) : (
								<ChevronRightIcon className="size-3.5" />
							)}
						</button>
					) : (
						<span className="inline-flex size-5 items-center justify-center text-muted-foreground">
							·
						</span>
					)}
					<Link
						className="font-medium text-blue-600 underline-offset-4 hover:underline"
						href={
							`/dashboard/orders/${encodeURIComponent(item.row.rfqCode)}` as Route
						}
					>
						{item.row.rfqCode}
					</Link>
				</div>
			</TableCell>
		);
	}

	if (isColumnVisible("status")) {
		cells.push(
			<TableCell key={`${item.id}-status`}>
				<span
					className={cn(
						"inline-flex h-6 items-center rounded-full border px-2 text-xs",
						STATUS_COLORS[item.row.status]
					)}
				>
					{item.row.status}
				</span>
			</TableCell>
		);
	}

	if (isColumnVisible("startDate")) {
		cells.push(
			<TableCell className="text-muted-foreground" key={`${item.id}-start`}>
				{formatDate(item.row.startDate)}
			</TableCell>
		);
	}

	if (isColumnVisible("dueDate")) {
		cells.push(
			<TableCell className="text-muted-foreground" key={`${item.id}-due`}>
				{formatDate(item.row.dueDate)}
			</TableCell>
		);
	}

	if (isColumnVisible("suppliers")) {
		cells.push(
			<TableCell key={`${item.id}-suppliers`}>
				<SuppliersCell suppliers={item.row.suppliers} />
			</TableCell>
		);
	}

	if (isColumnVisible("totalCost")) {
		cells.push(
			<TableCell className="font-medium" key={`${item.id}-cost`}>
				{formatCurrency(item.row.totalCost)}
			</TableCell>
		);
	}

	return (
		<TableRow data-state={rowIsSelected ? "selected" : undefined}>
			<TableCell className="px-3">
				<Checkbox
					aria-label={`Select ${item.row.rfqCode}`}
					checked={rowSelectionState === "checked"}
					indeterminate={rowSelectionState === "indeterminate"}
					onCheckedChange={(checked) =>
						onToggleRowSelection(item.row, Boolean(checked))
					}
				/>
			</TableCell>
			{cells}
			<TableCell className="pr-3 text-right">
				<button
					aria-label={`Open actions for ${item.row.rfqCode}`}
					className="inline-flex size-6 items-center justify-center rounded-sm text-muted-foreground hover:bg-muted hover:text-foreground"
					type="button"
				>
					<EllipsisIcon className="size-4" />
				</button>
			</TableCell>
		</TableRow>
	);
}

export { OrdersDataRow };
