import { cn } from "@amber-pre-interview/ui/lib/utils";
import { moneyFormatter } from "@/utils/currency";
import type { ProductGroupPriceCellProps } from "./types";

export const ProductGroupPriceCell = ({
	factory,
	groupId,
	isBestPrice,
	isHighlighted,
	multiplier,
	onHoverFactory,
	onSelectFactory,
	price,
}: ProductGroupPriceCellProps) => (
	<td
		className={cn(
			"min-w-44 border-r p-0 align-top transition-colors",
			isHighlighted ? "bg-sky-50/80" : "bg-background"
		)}
		key={`${groupId}-${factory.id}`}
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
					"font-semibold text-base text-foreground",
					isBestPrice ? "text-emerald-600" : undefined
				)}
			>
				{moneyFormatter.format(price)}
			</span>
			<span className="text-muted-foreground text-xs">{multiplier}</span>
		</button>
	</td>
);
