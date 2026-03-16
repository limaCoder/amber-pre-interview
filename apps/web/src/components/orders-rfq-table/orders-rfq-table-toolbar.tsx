import { Button } from "@amber-pre-interview/ui/components/button";
import { cn } from "@amber-pre-interview/ui/lib/utils";
import { ChevronDownIcon, PlusIcon, Table2Icon } from "lucide-react";
import type { ReactNode } from "react";
import { VIEW_TABS } from "./constants";

export function OrdersRfqTableToolbar() {
	return (
		<div className="flex flex-wrap items-center justify-between gap-2 border-b px-3 py-1.5">
			<nav
				aria-label="Orders table views"
				className="flex flex-wrap items-center gap-1.5"
			>
				{VIEW_TABS.map((tab, index) => {
					const isFirst = index === 0;
					const isLast = index === VIEW_TABS.length - 1;
					let tabContent: ReactNode = tab;

					if (isFirst) {
						tabContent = (
							<>
								<Table2Icon className="mr-1.5 size-3.5 text-blue-600" />
								{tab}
								<ChevronDownIcon className="ml-1 size-3.5 text-muted-foreground" />
							</>
						);
					}

					if (isLast) {
						tabContent = (
							<>
								<span>{tab.replace(" +9", "")}</span>
								<span className="ml-1 inline-flex h-4 items-center rounded-full border border-border bg-muted px-1.5 text-[10px] text-foreground">
									+9
								</span>
								<ChevronDownIcon className="ml-1 size-3.5 text-muted-foreground" />
							</>
						);
					}

					return (
						<button
							className={cn(
								"inline-flex h-7 items-center rounded-md px-2.5 font-medium text-xs transition-colors",
								isFirst
									? "border border-border bg-background text-foreground shadow-xs"
									: "text-muted-foreground hover:text-foreground"
							)}
							key={tab}
							type="button"
						>
							{tabContent}
						</button>
					);
				})}
			</nav>
			<Button className="bg-zinc-950 text-white hover:bg-zinc-800" size="sm">
				<PlusIcon data-icon="inline-start" />
				New RFQ
			</Button>
		</div>
	);
}
