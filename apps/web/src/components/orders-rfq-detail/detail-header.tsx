import { cn } from "@amber-pre-interview/ui/lib/utils";
import {
	EllipsisVerticalIcon,
	FilesIcon,
	MessageSquareIcon,
} from "lucide-react";
import { moneyFormatter } from "@/utils/currency";
import { detailTemplate, orderStatusColors } from "./constants";
import { HeaderMetric } from "./header-metric";
import type { DetailHeaderProps } from "./types";
import { iconButtonClassName } from "./utils";

export const DetailHeader = ({
	costView,
	marginView,
	onCostViewChange,
	onMarginViewChange,
	orderStatus,
	rfqCode,
}: DetailHeaderProps) => (
	<div className="shrink-0 border-b bg-background">
		<div className="flex min-h-16 flex-wrap items-center justify-between gap-3 px-4 py-2">
			<div className="flex min-w-0 flex-1 flex-wrap items-center gap-4">
				<div className="min-w-[190px]">
					<div className="flex flex-wrap items-center gap-2">
						<h2 className="font-semibold text-xl">{rfqCode}</h2>
						<span
							className={cn(
								"inline-flex h-6 items-center rounded-full border px-2 text-xs",
								orderStatusColors[orderStatus]
							)}
						>
							{orderStatus}
						</span>
					</div>
					<p className="mt-0.5 text-muted-foreground text-sm">
						created {detailTemplate.header.createdAt}
					</p>
				</div>

				<HeaderMetric
					label="Quote Due Date"
					value={detailTemplate.header.quoteDueDate}
				/>
				<HeaderMetric
					label="Target Ship Date"
					value={detailTemplate.header.targetShipDate}
				/>
				<HeaderMetric label="Units" value={detailTemplate.header.unitsRange} />
				<HeaderMetric
					label="Total Target Cost"
					value={`${moneyFormatter.format(detailTemplate.header.totalTargetCost)}+`}
				/>
			</div>

			<div className="flex flex-wrap items-center gap-2">
				<button
					aria-label="Open files"
					className={cn(iconButtonClassName, "relative")}
					type="button"
				>
					<FilesIcon className="size-4" />
					<span className="absolute -top-1 -right-1 text-[10px] text-blue-600">
						2
					</span>
				</button>
				<button
					aria-label="Open messages"
					className={iconButtonClassName}
					type="button"
				>
					<MessageSquareIcon className="size-4" />
				</button>
				<button
					aria-label="More options"
					className={iconButtonClassName}
					type="button"
				>
					<EllipsisVerticalIcon className="size-4" />
				</button>

				<div className="inline-flex rounded-md border bg-muted p-0.5">
					<button
						className={cn(
							"rounded px-2 py-1 font-medium transition-colors hover:text-foreground",
							costView === "FOB"
								? "bg-background text-foreground hover:bg-background"
								: "text-muted-foreground hover:bg-background"
						)}
						onClick={() => onCostViewChange("FOB")}
						type="button"
					>
						FOB
					</button>
					<button
						className={cn(
							"rounded px-2 py-1 font-medium transition-colors hover:text-foreground",
							costView === "Landed"
								? "bg-background text-foreground hover:bg-background"
								: "text-muted-foreground hover:bg-background"
						)}
						onClick={() => onCostViewChange("Landed")}
						type="button"
					>
						~ Landed
					</button>
				</div>

				<div className="inline-flex rounded-md border bg-muted p-0.5">
					<button
						className={cn(
							"rounded px-2 py-1 font-medium transition-colors hover:text-foreground",
							marginView === "Markup"
								? "bg-background text-foreground hover:bg-background"
								: "text-muted-foreground hover:bg-background"
						)}
						onClick={() => onMarginViewChange("Markup")}
						type="button"
					>
						Markup
					</button>
					<button
						className={cn(
							"rounded px-2 py-1 font-medium transition-colors hover:text-foreground",
							marginView === "Margin"
								? "bg-background text-foreground hover:bg-background"
								: "text-muted-foreground hover:bg-background"
						)}
						onClick={() => onMarginViewChange("Margin")}
						type="button"
					>
						Margin
					</button>
				</div>
			</div>
		</div>
	</div>
);
