import { formatCurrency } from "@/utils/currency";
import type { HistoricalSectionProps } from "./types";

export const HistoricalSection = ({ product }: HistoricalSectionProps) => {
	return (
		<section className="flex h-full min-h-[360px] flex-1 flex-col overflow-hidden rounded-lg border">
			<header className="border-b bg-muted/30 px-3 py-2 font-semibold text-muted-foreground text-xs uppercase">
				Historical
			</header>
			<div className="grid grid-cols-2 border-b bg-muted/20 px-3 py-2 text-[11px] text-muted-foreground">
				<span>{product.comparisonDates[0]}</span>
				<span className="text-right">{product.comparisonDates[1]}</span>
			</div>
			<table className="h-full w-full flex-1 text-xs">
				<thead className="bg-muted/20 text-muted-foreground">
					<tr>
						{product.historical.columnLabels.map((label) => (
							<th
								className="px-3 py-2 text-left font-medium"
								key={`${product.id}-${label}`}
							>
								{label}
							</th>
						))}
					</tr>
				</thead>
				<tbody>
					{product.historical.rows.map((row, rowIndex) => (
						<tr
							className="border-b"
							key={`${product.id}-historical-${rowIndex}`}
						>
							<td className="px-3 py-2 font-medium">
								{formatCurrency(row.primary)}
							</td>
							<td className="px-3 py-2 font-medium">
								{formatCurrency(row.secondary)}
							</td>
						</tr>
					))}
					<tr className="bg-muted/20 font-semibold">
						<td className="px-3 py-2">
							{formatCurrency(product.historical.totalRow.primary)}
						</td>
						<td className="px-3 py-2">
							{formatCurrency(product.historical.totalRow.secondary)}
						</td>
					</tr>
				</tbody>
			</table>
		</section>
	);
};
