import { formatCurrency, moneyFormatter } from "@/utils/currency";
import type { ProductSummaryInfoProps } from "./types";

export const ProductSummaryInfo = ({ product }: ProductSummaryInfoProps) => {
	return (
		<div className="grid grid-cols-[auto_16px_auto_16px_auto_16px_auto] items-end gap-2 text-sm">
			<div>
				<p className="font-semibold text-muted-foreground text-xs uppercase">
					Agreed FOB Total
				</p>
				<p className="font-semibold text-emerald-600 text-xl">
					{formatCurrency(product.summary.agreedFobTotal)}
				</p>
				<p className="text-muted-foreground text-xs">
					Avg. {moneyFormatter.format(product.summary.avgPerUnit)}/unit •{" "}
					{product.summary.marginPercent}% margin
				</p>
			</div>
			<span className="pb-1 text-muted-foreground text-xl">+</span>
			<div>
				<p className="font-semibold text-muted-foreground text-xs uppercase">
					Est. Freight
				</p>
				<p className="font-semibold text-lg">
					~{formatCurrency(product.summary.estFreight)}
				</p>
			</div>
			<span className="pb-1 text-muted-foreground text-xl">+</span>
			<div>
				<p className="font-semibold text-muted-foreground text-xs uppercase">
					Est. Duties
				</p>
				<p className="font-semibold text-lg">
					~{formatCurrency(product.summary.estDuties)}
				</p>
			</div>
			<span className="pb-1 text-muted-foreground text-xl">=</span>
			<div>
				<p className="font-semibold text-muted-foreground text-xs uppercase">
					Est. Landed Cost
				</p>
				<p className="font-semibold text-[26px] text-blue-600 leading-none">
					~{formatCurrency(product.summary.estLandedCost)}
				</p>
				<p className="text-muted-foreground text-xs">
					Avg. {moneyFormatter.format(product.summary.avgPerUnit)}/unit •{" "}
					{product.summary.marginPercent}% margin
				</p>
			</div>
		</div>
	);
};
