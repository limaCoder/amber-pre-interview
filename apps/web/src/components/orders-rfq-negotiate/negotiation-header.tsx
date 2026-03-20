import {
	Avatar,
	AvatarFallback,
} from "@amber-pre-interview/ui/components/avatar";
import { Button } from "@amber-pre-interview/ui/components/button";
import { cn } from "@amber-pre-interview/ui/lib/utils";
import {
	BarChart3Icon,
	ChevronDownIcon,
	ChevronLeftIcon,
	LockIcon,
	Undo2Icon,
} from "lucide-react";
import type { Route } from "next";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { negotiateTemplate, quoteStatusColorMap } from "./constants";
import type { CostView, MarginView, NegotiationHeaderProps } from "./types";
import { iconButtonClassName } from "./utils";

export const NegotiationHeader = ({
	factory,
	rfqCode,
}: NegotiationHeaderProps) => {
	const router = useRouter();
	const [costView, setCostView] = useState<CostView>("FOB");
	const [marginView, setMarginView] = useState<MarginView>("Markup");

	return (
		<div className="shrink-0 border-b bg-background">
			<div className="flex min-h-14 items-center justify-between gap-3 px-4 py-2">
				<div className="flex min-w-0 items-center gap-2">
					<button
						aria-label="Go back to RFQ detail"
						className={iconButtonClassName}
						onClick={() =>
							router.push(
								`/dashboard/orders/${encodeURIComponent(rfqCode)}` as Route
							)
						}
						type="button"
					>
						<ChevronLeftIcon className="size-4" />
					</button>
					<Avatar className="size-8" size="sm">
						<AvatarFallback className="bg-blue-600 font-semibold text-white">
							{factory.shortName}
						</AvatarFallback>
					</Avatar>
					<div className="min-w-0">
						<p className="truncate font-semibold text-base">{factory.name}</p>
					</div>
				</div>

				<div className="flex items-center gap-2">
					<Button size="sm" variant="outline">
						<BarChart3Icon data-icon="inline-start" />
						Compare Bids
						<ChevronDownIcon data-icon="inline-end" />
					</Button>
					<div className="inline-flex rounded-md border bg-muted p-0.5">
						<button
							className={cn(
								"rounded px-2 py-1 font-medium text-xs transition-colors hover:text-foreground",
								costView === "FOB"
									? "bg-background text-foreground"
									: "text-muted-foreground hover:bg-background"
							)}
							onClick={() => setCostView("FOB")}
							type="button"
						>
							FOB
						</button>
						<button
							className={cn(
								"rounded px-2 py-1 font-medium text-xs transition-colors hover:text-foreground",
								costView === "Landed"
									? "bg-background text-foreground"
									: "text-muted-foreground hover:bg-background"
							)}
							onClick={() => setCostView("Landed")}
							type="button"
						>
							~ Landed
						</button>
					</div>
					<div className="inline-flex rounded-md border bg-muted p-0.5">
						<button
							className={cn(
								"rounded px-2 py-1 font-medium text-xs transition-colors hover:text-foreground",
								marginView === "Markup"
									? "bg-background text-foreground"
									: "text-muted-foreground hover:bg-background"
							)}
							onClick={() => setMarginView("Markup")}
							type="button"
						>
							Markup
						</button>
						<button
							className={cn(
								"rounded px-2 py-1 font-medium text-xs transition-colors hover:text-foreground",
								marginView === "Margin"
									? "bg-background text-foreground"
									: "text-muted-foreground hover:bg-background"
							)}
							onClick={() => setMarginView("Margin")}
							type="button"
						>
							Margin
						</button>
					</div>
				</div>
			</div>

			<div className="flex flex-wrap items-center gap-3 border-t px-4 py-2">
				{negotiateTemplate.submissionTabs.map((tab) => (
					<span
						className="inline-flex h-6 items-center gap-1 rounded-md border bg-muted/50 px-2 text-xs"
						key={tab.label}
					>
						<LockIcon className="size-3" />
						{tab.label}
					</span>
				))}
				<span
					className={cn(
						"inline-flex h-6 items-center rounded-full border px-2 text-xs",
						quoteStatusColorMap[factory.status]
					)}
				>
					<Undo2Icon className="mr-1 size-3" />
					{factory.status}
				</span>
				<p className="text-muted-foreground text-sm">
					{negotiateTemplate.contextMessage}
				</p>
			</div>
		</div>
	);
};
