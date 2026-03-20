"use client";

import { cn } from "@amber-pre-interview/ui/lib/utils";
import { ChevronDownIcon, ChevronRightIcon } from "lucide-react";
import type { Route } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { formatCurrency } from "@/utils/currency";
import { formatDate } from "@/utils/date";
import { STATUS_COLORS } from "./constants";
import { SuppliersCell } from "./suppliers-cell";
import type { OrderStatus, RowCellContentProps } from "./types";

export function RowCellContent({
	columnKey,
	item,
	leftPadding,
	isExpanded,
	onToggleExpand,
}: RowCellContentProps): ReactNode {
	if (columnKey === "rfqCode") {
		return (
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
		);
	}

	if (columnKey === "status") {
		const status = item.row.status as OrderStatus;
		return (
			<span
				className={cn(
					"inline-flex h-6 items-center rounded-full border px-2 text-xs",
					STATUS_COLORS[status]
				)}
			>
				{item.row.status}
			</span>
		);
	}

	if (columnKey === "startDate") {
		return (
			<span className="text-muted-foreground">
				{formatDate(item.row.startDate)}
			</span>
		);
	}

	if (columnKey === "dueDate") {
		return (
			<span className="text-muted-foreground">
				{formatDate(item.row.dueDate)}
			</span>
		);
	}

	if (columnKey === "suppliers") {
		return <SuppliersCell suppliers={item.row.suppliers} />;
	}

	if (columnKey === "totalCost") {
		return (
			<span className="font-medium">{formatCurrency(item.row.totalCost)}</span>
		);
	}

	return null;
}
