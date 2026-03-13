import type { Supplier } from "./types";

interface SuppliersCellProps {
	suppliers: Supplier[];
}

export function SuppliersCell({ suppliers }: SuppliersCellProps) {
	if (suppliers.length === 0) {
		return <span className="text-muted-foreground">—</span>;
	}

	if (suppliers.length === 1) {
		return (
			<span className="inline-flex items-center gap-2 font-medium text-foreground">
				<span aria-hidden>{suppliers[0]?.flag}</span>
				{suppliers[0]?.name}
			</span>
		);
	}

	const visibleSuppliers = suppliers.slice(0, 2);
	const remainingCount = suppliers.length - visibleSuppliers.length;

	return (
		<div className="flex items-center gap-1.5">
			{visibleSuppliers.map((supplier) => (
				<span
					className="inline-flex items-center rounded-full border border-border bg-muted px-2 py-0.5 text-[11px] text-foreground"
					key={supplier.id}
				>
					{supplier.name}
				</span>
			))}
			{remainingCount > 0 ? (
				<span className="inline-flex items-center rounded-full border border-border bg-muted px-2 py-0.5 text-[11px] text-muted-foreground">
					+{remainingCount}
				</span>
			) : null}
		</div>
	);
}
