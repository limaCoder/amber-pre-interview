"use client";

import { Checkbox } from "@amber-pre-interview/ui/components/checkbox";
import { TableCell, TableRow } from "@amber-pre-interview/ui/components/table";
import { EllipsisIcon } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { COLUMN_OPTIONS } from "./constants";
import { RowCellContent } from "./row-cell-content";
import type { OrdersDataRowProps } from "./types";

const MotionTableRow = motion.create(TableRow);
const MotionTableCell = motion.create(TableCell);

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

	return (
		<MotionTableRow
			animate={{ opacity: 1 }}
			data-state={rowIsSelected ? "selected" : undefined}
			exit={{ opacity: 0 }}
			initial={{ opacity: 0 }}
			layout="position"
			transition={{ duration: 0.2 }}
		>
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

			<AnimatePresence initial={false} mode="popLayout">
				{COLUMN_OPTIONS.map((column) => {
					if (!isColumnVisible(column.key)) {
						return null;
					}

					return (
						<MotionTableCell
							animate={{ opacity: 1, scale: 1 }}
							exit={{ opacity: 0, scale: 0.95 }}
							initial={{ opacity: 0, scale: 0.95 }}
							key={`${item.id}-${column.key}`}
							layout
							transition={{ duration: 0.2 }}
						>
							<RowCellContent
								columnKey={column.key}
								isExpanded={isExpanded}
								item={item}
								leftPadding={leftPadding}
								onToggleExpand={onToggleExpand}
							/>
						</MotionTableCell>
					);
				})}
			</AnimatePresence>

			<TableCell className="pr-3 text-right">
				<button
					aria-label={`Open actions for ${item.row.rfqCode}`}
					className="inline-flex size-6 items-center justify-center rounded-sm text-muted-foreground hover:bg-muted hover:text-foreground"
					type="button"
				>
					<EllipsisIcon className="size-4" />
				</button>
			</TableCell>
		</MotionTableRow>
	);
}

export { OrdersDataRow };
