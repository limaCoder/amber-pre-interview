import { TableCell, TableRow } from "@amber-pre-interview/ui/components/table";
import { ListFilterIcon } from "lucide-react";

interface OrdersRfqTableGroupHeaderProps {
	colSpan: number;
	label: string;
	rootItemCount: number;
}

export function OrdersRfqTableGroupHeader({
	colSpan,
	label,
	rootItemCount,
}: OrdersRfqTableGroupHeaderProps) {
	return (
		<TableRow className="bg-muted/30 hover:bg-muted/30">
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
		</TableRow>
	);
}
