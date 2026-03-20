import {
	Avatar,
	AvatarFallback,
} from "@amber-pre-interview/ui/components/avatar";
import { cn } from "@amber-pre-interview/ui/lib/utils";
import {
	EllipsisVerticalIcon,
	MessageSquareIcon,
	StarIcon,
	Undo2Icon,
} from "lucide-react";
import { moneyFormatter } from "@/utils/currency";
import { quoteStatusColors } from "./constants";
import type { FactoryCardProps } from "./types";

export const FactoryCard = ({
	factory,
	isSelected,
	onNegotiate,
	onSelect,
}: FactoryCardProps) => {
	return (
		<div
			className={cn(
				"flex h-full w-full flex-col rounded-xl border border-border bg-background text-left transition-colors",
				isSelected ? "border-sky-300 bg-sky-50" : "hover:bg-muted/40"
			)}
		>
			<button
				aria-label={`Select ${factory.name} column`}
				aria-pressed={isSelected}
				className="flex flex-1 flex-col rounded-t-xl"
				onClick={() => onSelect(factory.id)}
				type="button"
			>
				<div className="flex w-full items-start bg-neutral-100/70 py-2 text-[11px] text-muted-foreground">
					<div className="flex w-full items-center justify-center gap-1.5">
						<span>{factory.responseType}</span>
						<span className="size-1.5 rounded-full bg-amber-400" />
						<span>Draft</span>
					</div>
					<EllipsisVerticalIcon className="mr-1 size-3.5 text-muted-foreground/80" />
				</div>

				<div className="mt-2 flex flex-col items-center p-2.5 text-center">
					<Avatar className="size-10" size="default">
						<AvatarFallback className="bg-blue-500 font-semibold text-white">
							{factory.shortName}
						</AvatarFallback>
					</Avatar>
					<p className="mt-2 font-medium text-[22px] leading-tight">
						{factory.name}
					</p>
					<div className="mt-1 flex items-center gap-0.5 text-xs">
						<StarIcon className="size-3 fill-amber-400 text-amber-400" />
						<StarIcon className="size-3 fill-amber-400 text-amber-400" />
						<StarIcon className="size-3 fill-amber-400 text-amber-400" />
						<StarIcon className="size-3 fill-amber-400 text-amber-400" />
						<StarIcon className="size-3 fill-amber-200 text-amber-300" />
						<span className="ml-1 font-semibold text-foreground">
							{factory.rating.toFixed(1)}
						</span>
					</div>
					<span
						className={cn(
							"mt-2 inline-flex h-6 items-center rounded-full border px-2 text-xs",
							quoteStatusColors[factory.status]
						)}
					>
						{factory.status === "Your Turn" ? "Your Turn (2)" : factory.status}
					</span>
				</div>

				<div className="mt-3 border-t pt-3 text-center">
					<p className="font-semibold text-xl">
						{moneyFormatter.format(factory.fobTotal)}
					</p>
					<p className="text-muted-foreground text-xs">
						Avg. {moneyFormatter.format(factory.avgPerUnit)}/unit
					</p>
					<p className="font-semibold text-foreground text-sm">
						{factory.multiplier}
					</p>
				</div>
			</button>

			<div className="flex gap-1.5 border-t p-2.5 pt-2">
				<button
					aria-label={`Message ${factory.name}`}
					className="inline-flex h-8 w-8 items-center justify-center rounded-md border bg-background text-foreground text-xs transition-colors hover:bg-muted"
					onClick={(event) => {
						event.preventDefault();
					}}
					type="button"
				>
					<MessageSquareIcon size={16} />
				</button>
				<button
					aria-label={`Negotiate with ${factory.name}`}
					className="inline-flex h-8 flex-1 items-center justify-center gap-1 rounded-md border bg-background font-medium text-foreground text-xs transition-colors hover:bg-muted"
					onClick={(event) => {
						event.preventDefault();
						onNegotiate(factory.id);
					}}
					type="button"
				>
					<Undo2Icon className="size-3.5" />
					Negotiate
				</button>
			</div>
		</div>
	);
};
