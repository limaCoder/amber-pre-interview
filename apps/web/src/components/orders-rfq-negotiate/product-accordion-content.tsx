import { ChevronDownIcon, MessageSquareIcon } from "lucide-react";
import { ActiveNegotiationSection } from "./active-negotiation-section";
import { HistoricalSection } from "./historical-section";
import { InternalTargetSection } from "./internal-target-section";
import { ProductSummaryInfo } from "./product-summary-info";
import { QuantitiesSection } from "./quantities-section";
import type { ProductAccordionContentProps } from "./types";

export const ProductAccordionContent = ({
	product,
}: ProductAccordionContentProps) => {
	return (
		<div
			className="space-y-4 border-t bg-background px-4 py-4"
			id={`accordion-panel-${product.id}`}
		>
			<div className="flex flex-wrap items-center gap-3 border-b pb-3 text-muted-foreground text-xs">
				{product.tierLabels.map((tierLabel, index) => (
					<div
						className="flex items-center gap-2"
						key={`${product.id}-${tierLabel}`}
					>
						<span>{tierLabel}</span>
						<span className="size-1.5 rounded-full bg-emerald-500" />
						{index < product.tierLabels.length - 1 ? (
							<span className="text-muted-foreground/70">...</span>
						) : null}
					</div>
				))}
			</div>

			<div className="overflow-x-auto">
				<div className="flex min-w-[1180px] items-stretch gap-3">
					<QuantitiesSection product={product} />
					<HistoricalSection product={product} />
					<InternalTargetSection product={product} />
					<ActiveNegotiationSection product={product} />
				</div>
			</div>

			<ProductSummaryInfo product={product} />

			<button
				aria-label={`Open ${product.noteToSupplier.toLowerCase()}`}
				className="inline-flex items-center gap-2 text-muted-foreground text-sm transition-colors hover:text-foreground"
				type="button"
			>
				<MessageSquareIcon className="size-4" />
				{product.noteToSupplier}
				<ChevronDownIcon className="size-3.5" />
			</button>
		</div>
	);
};
