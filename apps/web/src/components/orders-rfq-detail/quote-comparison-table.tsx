import { cn } from "@amber-pre-interview/ui/lib/utils";
import { detailTemplate } from "./constants";
import { FactoryCard } from "./factory-card";
import { ProductGroupRow } from "./product-group-row";
import type { QuoteComparisonTableProps } from "./types";

export const QuoteComparisonTable = ({
	hasSelectedFactory,
	isFactoryHighlighted,
	onHoverFactory,
	onNegotiate,
	onSelectFactory,
	selectedFactoryId,
}: QuoteComparisonTableProps) => (
	<div
		className={cn(
			"min-h-0 flex-1 overflow-auto",
			hasSelectedFactory ? "pb-20" : undefined
		)}
	>
		<div className="m-3 overflow-x-auto rounded-xl border bg-background">
			<table className="w-full min-w-[1120px] text-xs">
				<thead>
					<tr className="border-b bg-muted/20">
						<th className="sticky left-0 z-20 min-w-72 border-r bg-muted/20 p-3 text-left" />
						{detailTemplate.factories.map((factory) => (
							<th
								className={cn(
									"min-w-44 border-r p-3 align-top transition-colors",
									isFactoryHighlighted(factory.id)
										? "bg-sky-50/70"
										: "bg-muted/20"
								)}
								key={factory.id}
								onMouseEnter={() => onHoverFactory(factory.id)}
								onMouseLeave={() => onHoverFactory(null)}
							>
								<FactoryCard
									factory={factory}
									isSelected={selectedFactoryId === factory.id}
									onNegotiate={onNegotiate}
									onSelect={onSelectFactory}
								/>
							</th>
						))}
					</tr>
				</thead>
				<tbody>
					{detailTemplate.productGroups.map((group) => (
						<ProductGroupRow
							group={group}
							isFactoryHighlighted={isFactoryHighlighted}
							key={group.id}
							onHoverFactory={onHoverFactory}
							onSelectFactory={onSelectFactory}
						/>
					))}
				</tbody>
			</table>
		</div>
	</div>
);
