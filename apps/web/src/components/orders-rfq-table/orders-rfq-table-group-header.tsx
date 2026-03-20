import { TableCell, TableRow } from "@amber-pre-interview/ui/components/table";
import { ListFilterIcon } from "lucide-react";
import { motion } from "motion/react";
import type { OrdersRfqTableGroupHeaderProps } from "./types";

const MotionTableRow = motion.create(TableRow);

export function OrdersRfqTableGroupHeader({
	colSpan,
	label,
	rootItemCount,
}: OrdersRfqTableGroupHeaderProps) {
	return (
		<MotionTableRow
			animate={{ opacity: 1 }}
			className="bg-muted/30 hover:bg-muted/30"
			exit={{ opacity: 0 }}
			initial={{ opacity: 0 }}
			layout="position"
			transition={{ duration: 0.2 }}
		>
			<TableCell
				className="font-medium text-muted-foreground text-xs uppercase tracking-wide"
				colSpan={colSpan}
			>
				<div className="inline-flex items-center gap-2">
					<ListFilterIcon className="size-3.5" />
					<span>{label}</span>
					<span className="text-muted-foreground/70">({rootItemCount})</span>
				</div>
			</TableCell>
		</MotionTableRow>
	);
}
