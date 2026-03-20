"use client";

import { Checkbox } from "@amber-pre-interview/ui/components/checkbox";
import { TableHead, TableRow } from "@amber-pre-interview/ui/components/table";
import { AnimatePresence, motion } from "motion/react";
import { COLUMN_OPTIONS } from "./constants";
import type { OrdersRfqTableHeaderProps } from "./types";

const MotionTableRow = motion.create(TableRow);
const MotionTableHead = motion.create(TableHead);

export function OrdersRfqTableHeader({
	headerSelectionState,
	isColumnVisible,
	onToggleSelectAll,
}: OrdersRfqTableHeaderProps) {
	return (
		<MotionTableRow transition={{ duration: 0.2 }}>
			<TableHead className="w-10 px-3">
				<Checkbox
					aria-label="Select all visible rows"
					checked={headerSelectionState === "checked"}
					indeterminate={headerSelectionState === "indeterminate"}
					onCheckedChange={(checked) => onToggleSelectAll(Boolean(checked))}
				/>
			</TableHead>

			<AnimatePresence initial={false} mode="popLayout">
				{COLUMN_OPTIONS.map((column) => {
					if (!isColumnVisible(column.key)) {
						return null;
					}

					return (
						<MotionTableHead
							animate={{ opacity: 1, scale: 1 }}
							className={column.headerClassName}
							exit={{ opacity: 0, scale: 0.95 }}
							initial={{ opacity: 0, scale: 0.95 }}
							key={column.key}
							layout
							transition={{ duration: 0.2 }}
						>
							{"headerLabel" in column ? column.headerLabel : column.label}
						</MotionTableHead>
					);
				})}
			</AnimatePresence>

			<TableHead aria-label="Actions" className="w-12 pr-3 text-right" />
		</MotionTableRow>
	);
}
