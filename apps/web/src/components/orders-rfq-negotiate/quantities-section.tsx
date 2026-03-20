import { cn } from "@amber-pre-interview/ui/lib/utils";
import { QuantityColorDot } from "./quantity-color-dot";
import type { QuantitiesSectionProps } from "./types";

export const QuantitiesSection = ({ product }: QuantitiesSectionProps) => {
	return (
		<section className="flex h-full min-h-[360px] flex-[2.2] flex-col overflow-hidden rounded-lg border">
			<header className="border-b bg-muted/30 px-3 py-2 font-semibold text-muted-foreground text-xs uppercase">
				Quantities
			</header>
			<table className="h-full w-full flex-1 text-xs">
				<thead>
					<tr className="border-b bg-muted/20 text-muted-foreground">
						<th className="px-3 py-2 text-left font-medium">Variant</th>
						{product.quantities.sizeLabels.map((label) => (
							<th
								className="px-2 py-2 font-medium"
								key={`${product.id}-${label}`}
							>
								{label}
							</th>
						))}
						<th className="px-2 py-2 font-medium">Total</th>
					</tr>
				</thead>
				<tbody>
					{product.quantities.rows.map((row, rowIndex) => (
						<tr className="border-b" key={row.id}>
							<td className="px-3 py-2">
								<div
									className={cn(
										"flex items-center gap-2",
										row.disabled
											? "text-muted-foreground/40"
											: "text-foreground"
									)}
								>
									<QuantityColorDot index={rowIndex} />
									<div>
										<p className="font-medium text-xs">{row.colorName}</p>
										<p className="text-[11px] text-muted-foreground">
											{row.productCode}
										</p>
									</div>
								</div>
							</td>
							{row.sizeValues.map((value, valueIndex) => (
								<td
									className="px-2 py-2 text-center"
									key={`${row.id}-${valueIndex}`}
								>
									<span
										className={cn(
											"inline-flex min-w-8 items-center justify-center rounded-md px-2 py-1 font-medium",
											row.disabled
												? "bg-muted/40 text-muted-foreground/50"
												: "bg-emerald-100 text-emerald-700"
										)}
									>
										{value}
									</span>
								</td>
							))}
							<td className="px-2 py-2 text-center font-semibold">
								{row.total}
							</td>
						</tr>
					))}
					<tr className="bg-muted/20 font-semibold">
						<td className="px-3 py-2">Total</td>
						{product.quantities.totalsBySize.map((value, valueIndex) => (
							<td
								className="px-2 py-2 text-center"
								key={`${product.id}-total-${valueIndex}`}
							>
								{value}
							</td>
						))}
						<td className="px-2 py-2 text-center">
							{product.quantities.grandTotal}
						</td>
					</tr>
				</tbody>
			</table>
		</section>
	);
};
