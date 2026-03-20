import { EllipsisVerticalIcon } from "lucide-react";
import { detailTemplate } from "./constants";
import { ProductGroupPriceCell } from "./product-group-price-cell";
import { ProductVariantRow } from "./product-variant-row";
import type { ProductGroupRowProps } from "./types";
import { getLowestFactoryId, iconButtonClassName } from "./utils";

export const ProductGroupRow = ({
	isFactoryHighlighted,
	group,
	onHoverFactory,
	onSelectFactory,
}: ProductGroupRowProps) => {
	const lowestGroupFactoryId = getLowestFactoryId(group.quotesByFactoryId);

	return (
		<>
			<tr className="border-b bg-muted/40">
				<td className="sticky left-0 z-10 min-w-72 border-r bg-muted/40 p-4 align-top">
					<div className="flex items-start justify-between gap-3">
						<div>
							<p className="font-medium text-foreground text-sm">
								{group.title}
							</p>
							<div className="mt-2 flex gap-2 text-[11px]">
								<span className="rounded-md bg-background px-2 py-1 text-muted-foreground">
									{group.tierOneLabel}
								</span>
								<span className="rounded-md bg-background px-2 py-1 text-muted-foreground">
									{group.tierTwoLabel}
								</span>
							</div>
						</div>
						<button
							aria-label={`Open options for ${group.title}`}
							className={iconButtonClassName}
							type="button"
						>
							<EllipsisVerticalIcon className="size-4" />
						</button>
					</div>
				</td>
				{detailTemplate.factories.map((factory) => (
					<ProductGroupPriceCell
						factory={factory}
						groupId={group.id}
						isBestPrice={lowestGroupFactoryId === factory.id}
						isHighlighted={isFactoryHighlighted(factory.id)}
						key={`${group.id}-${factory.id}`}
						multiplier={group.quotesByFactoryId[factory.id].multiplier}
						onHoverFactory={onHoverFactory}
						onSelectFactory={onSelectFactory}
						price={group.quotesByFactoryId[factory.id].price}
					/>
				))}
			</tr>
			{group.variants.map((variant) => (
				<ProductVariantRow
					isFactoryHighlighted={isFactoryHighlighted}
					key={variant.id}
					onHoverFactory={onHoverFactory}
					onSelectFactory={onSelectFactory}
					variant={variant}
				/>
			))}
		</>
	);
};
