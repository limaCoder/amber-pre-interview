import { formatCurrency } from "@/utils/currency";
import type { InternalTargetSectionProps } from "./types";
import { formatMultiplier } from "./utils";

export const InternalTargetSection = ({
	product,
}: InternalTargetSectionProps) => {
	return (
		<section className="flex h-full min-h-[360px] flex-1 flex-col overflow-hidden rounded-lg border">
			<header className="border-b bg-muted/30 px-3 py-2 font-semibold text-muted-foreground text-xs uppercase">
				Internal Target
			</header>
			<div className="grid grid-cols-2 border-b bg-muted/20 px-3 py-2 text-[11px] text-muted-foreground">
				<span>{product.internalTarget.dates[0]}</span>
				<span className="text-right">{product.internalTarget.dates[1]}</span>
			</div>
			<table className="h-full w-full flex-1 text-xs">
				<thead className="bg-muted/20 text-muted-foreground">
					<tr>
						{product.internalTarget.columnLabels.map((label) => (
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
					{product.internalTarget.rows.map((row, rowIndex) => (
						<tr className="border-b" key={`${product.id}-internal-${rowIndex}`}>
							<td className="px-3 py-2 font-medium">
								{formatCurrency(row.primary)}
							</td>
							<td className="px-3 py-2">
								<p className="font-semibold text-foreground">
									{formatCurrency(row.secondary)}
								</p>
								<p className="text-[11px] text-muted-foreground">
									{formatMultiplier(rowIndex)}
								</p>
							</td>
						</tr>
					))}
					<tr className="bg-muted/20 font-semibold">
						<td className="px-3 py-2">
							{formatCurrency(product.internalTarget.totalRow.primary)}
						</td>
						<td className="px-3 py-2">
							{formatCurrency(product.internalTarget.totalRow.secondary)}
						</td>
					</tr>
				</tbody>
			</table>
		</section>
	);
};
