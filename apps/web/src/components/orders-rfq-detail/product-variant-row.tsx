import { cn } from "@amber-pre-interview/ui/lib/utils";
import { detailTemplate } from "./constants";
import type { ProductVariantRowProps } from "./types";
import { formatPerUnit, getLowestFactoryId } from "./utils";

export const ProductVariantRow = ({
	isFactoryHighlighted,
	onHoverFactory,
	onSelectFactory,
	variant,
}: ProductVariantRowProps) => {
	const lowestVariantFactoryId = getLowestFactoryId(variant.quotesByFactoryId);

	return (
		<tr className="border-b" key={variant.id}>
			<td className="sticky left-0 z-10 min-w-72 border-r bg-background p-4">
				<div className="flex items-center justify-between gap-3">
					<div className="flex items-center gap-2">
						<span className="size-2 rounded-full bg-slate-200" />
						<div>
							<p className="font-medium text-foreground text-sm">
								{variant.productName}
							</p>
							<p className="text-muted-foreground text-xs">
								({variant.productCode})
							</p>
						</div>
					</div>
					<span className="text-muted-foreground text-xs">{variant.units}</span>
				</div>
			</td>
			{detailTemplate.factories.map((factory) => {
				const quote = variant.quotesByFactoryId[factory.id];
				const isHighlighted = isFactoryHighlighted(factory.id);
				const isBestPrice = lowestVariantFactoryId === factory.id;

				return (
					<td
						className={cn(
							"min-w-44 border-r p-0 transition-colors",
							isHighlighted ? "bg-sky-50/80" : "bg-background",
							isBestPrice ? "bg-emerald-50" : undefined
						)}
						key={`${variant.id}-${factory.id}`}
					>
						<button
							aria-label={`Select ${factory.name} column`}
							className="flex w-full flex-col items-end px-4 py-3 text-right"
							onClick={() => onSelectFactory(factory.id)}
							onMouseEnter={() => onHoverFactory(factory.id)}
							onMouseLeave={() => onHoverFactory(null)}
							type="button"
						>
							<span
								className={cn(
									"font-medium text-base text-foreground",
									isBestPrice ? "text-emerald-600" : undefined
								)}
							>
								{formatPerUnit(quote.price)}
							</span>
							<span className="text-muted-foreground text-xs">
								{quote.multiplier}
							</span>
							{quote.deltaLabel ? (
								<span className="text-[11px] text-muted-foreground">
									{quote.deltaLabel}
								</span>
							) : null}
						</button>
					</td>
				);
			})}
		</tr>
	);
};
