import { Button } from "@amber-pre-interview/ui/components/button";
import { cn } from "@amber-pre-interview/ui/lib/utils";
import { PlusIcon } from "lucide-react";
import { VIEW_TABS } from "./constants";

export function OrdersRfqTableToolbar() {
	return (
		<div className="flex flex-wrap items-center justify-between gap-2 border-b px-3 py-2">
			<nav
				aria-label="Orders table views"
				className="flex flex-wrap items-center gap-1"
			>
				{VIEW_TABS.map((tab, index) => (
					<button
						className={cn(
							"inline-flex h-7 items-center rounded-md px-2 text-xs transition-colors",
							index === 0
								? "bg-muted text-foreground"
								: "text-muted-foreground hover:bg-muted hover:text-foreground"
						)}
						key={tab}
						type="button"
					>
						{tab}
					</button>
				))}
			</nav>
			<Button size="sm">
				<PlusIcon data-icon="inline-start" />
				New RFQ
			</Button>
		</div>
	);
}
