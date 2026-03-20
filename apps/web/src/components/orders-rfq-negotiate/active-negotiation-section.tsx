import { cn } from "@amber-pre-interview/ui/lib/utils";
import { formatCurrency } from "@/utils/currency";
import type { ActiveNegotiationSectionProps } from "./types";
import { formatMultiplier } from "./utils";

export const ActiveNegotiationSection = ({
	product,
}: ActiveNegotiationSectionProps) => {
	return (
		<section className="flex h-full min-h-[360px] flex-[1.2] flex-col overflow-hidden rounded-lg border">
			<header className="border-b bg-muted/30 px-3 py-2 font-semibold text-muted-foreground text-xs uppercase">
				Active Negotiation
			</header>
			<div className="grid grid-cols-3 border-b bg-muted/20 px-3 py-2 text-[11px] text-muted-foreground">
				{product.activeNegotiation.dateLabels.map((dateLabel) => (
					<span className="text-center" key={`${product.id}-${dateLabel}`}>
						{dateLabel}
					</span>
				))}
			</div>
			<div className="grid grid-cols-3 border-b bg-background px-3 py-2 text-[11px] text-muted-foreground">
				{product.activeNegotiation.columnLabels.map((columnLabel) => (
					<span
						className="truncate text-center"
						key={`${product.id}-${columnLabel}`}
					>
						{columnLabel}
					</span>
				))}
			</div>
			<table className="h-full w-full flex-1 text-xs">
				<tbody>
					{product.activeNegotiation.rows.map((row, rowIndex) => (
						<tr className="border-b" key={`${product.id}-active-${rowIndex}`}>
							{row.values.map((value, valueIndex) => {
								const highlight = valueIndex === 2 && rowIndex < 3;

								return (
									<td
										className="px-3 py-2 text-center"
										key={`${product.id}-active-${rowIndex}-${valueIndex}`}
									>
										<p
											className={cn(
												"font-semibold",
												highlight ? "text-emerald-600" : "text-foreground"
											)}
										>
											{formatCurrency(value)}
										</p>
										<p className="text-[11px] text-muted-foreground">
											{formatMultiplier(valueIndex)}
										</p>
									</td>
								);
							})}
						</tr>
					))}
					<tr className="bg-muted/20">
						{product.activeNegotiation.totalRow.values.map(
							(totalValue, valueIndex) => (
								<td
									className="px-3 py-2 text-center font-semibold"
									key={`${product.id}-active-total-${valueIndex}`}
								>
									{formatCurrency(totalValue)}
								</td>
							)
						)}
					</tr>
				</tbody>
			</table>
		</section>
	);
};
