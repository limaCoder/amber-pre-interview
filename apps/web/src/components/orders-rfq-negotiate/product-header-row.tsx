import {
	ChevronDownIcon,
	ChevronRightIcon,
	EllipsisVerticalIcon,
} from "lucide-react";
import { ProductThumb } from "./product-thumb";
import type { ProductHeaderRowProps } from "./types";

export const ProductHeaderRow = ({
	isOpen,
	onToggle,
	product,
}: ProductHeaderRowProps) => {
	return (
		<button
			aria-controls={`accordion-panel-${product.id}`}
			aria-expanded={isOpen}
			className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left transition-colors hover:bg-muted/40"
			onClick={onToggle}
			type="button"
		>
			<div className="flex min-w-0 items-center gap-3">
				<span className="inline-flex size-5 items-center justify-center text-muted-foreground">
					{isOpen ? (
						<ChevronDownIcon className="size-4" />
					) : (
						<ChevronRightIcon className="size-4" />
					)}
				</span>
				<ProductThumb />
				<div className="min-w-0">
					<p className="truncate font-medium text-foreground text-lg">
						{product.title}
					</p>
					<div className="mt-1 flex items-center gap-2">
						<span className="text-muted-foreground text-sm">{product.sku}</span>
						<span className="rounded-md border px-2 py-0.5 text-xs">
							{product.category}
						</span>
					</div>
				</div>
			</div>

			<div className="flex items-center gap-4 text-sm">
				<div className="hidden items-center gap-2 text-muted-foreground lg:flex">
					<span>T1</span>
					<span className="size-2 rounded-full bg-slate-300" />
					<span>T2</span>
					<span className="size-2 rounded-full bg-slate-300" />
					<span>T3</span>
					<span className="size-2 rounded-full bg-slate-300" />
				</div>
				<span className="font-medium text-foreground">
					{product.variantCount} variants
				</span>
				<span className="inline-flex size-6 items-center justify-center text-muted-foreground">
					<EllipsisVerticalIcon className="size-4" />
				</span>
			</div>
		</button>
	);
};
