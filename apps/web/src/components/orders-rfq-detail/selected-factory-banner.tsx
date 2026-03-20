import {
	Avatar,
	AvatarFallback,
} from "@amber-pre-interview/ui/components/avatar";
import { Button } from "@amber-pre-interview/ui/components/button";
import {
	CheckIcon,
	MessageSquareIcon,
	StarIcon,
	Undo2Icon,
	XIcon,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { moneyFormatter } from "@/utils/currency";
import type { SelectedFactoryBannerProps } from "./types";

export const SelectedFactoryBanner = ({
	onClose,
	onNegotiate,
	selectedFactory,
}: SelectedFactoryBannerProps) => {
	return (
		<AnimatePresence>
			{selectedFactory ? (
				<motion.div
					animate={{ opacity: 1, y: 0 }}
					className="fixed right-2 bottom-2 left-2 z-40 border border-sky-300 bg-sky-100/95 px-4 py-2 shadow-sm backdrop-blur md:right-3 md:left-[calc(var(--sidebar-width)+0.75rem)]"
					exit={{ opacity: 0, y: 16 }}
					initial={{ opacity: 0, y: 20 }}
					key="selected-factory-banner"
					transition={{
						damping: 28,
						mass: 0.9,
						stiffness: 360,
						type: "spring",
					}}
				>
					<div className="flex flex-wrap items-center justify-between gap-4">
						<div className="flex min-w-[220px] items-center gap-2">
							<Avatar className="size-8" size="sm">
								<AvatarFallback className="bg-blue-600 font-semibold text-white">
									{selectedFactory.shortName}
								</AvatarFallback>
							</Avatar>
							<div>
								<p className="font-medium text-foreground text-sm">
									{selectedFactory.name}
								</p>
								<div className="flex items-center gap-1 text-[11px] text-muted-foreground">
									<StarIcon className="size-3 fill-amber-400 text-amber-400" />
									<StarIcon className="size-3 fill-amber-400 text-amber-400" />
									<StarIcon className="size-3 fill-amber-400 text-amber-400" />
									<StarIcon className="size-3 fill-amber-400 text-amber-400" />
									<StarIcon className="size-3 fill-amber-200 text-amber-300" />
									<span className="ml-1 font-medium text-foreground text-xs">
										{selectedFactory.rating.toFixed(1)}
									</span>
									<StarIcon className="ml-1 size-3 text-amber-500" />
								</div>
							</div>
						</div>

						<div className="min-w-[210px]">
							<p className="text-[11px] text-muted-foreground uppercase">
								FOB Total
							</p>
							<p className="font-semibold text-foreground text-xl">
								{moneyFormatter.format(selectedFactory.fobTotal)}
							</p>
							<p className="text-[11px] text-muted-foreground">
								Avg. {moneyFormatter.format(selectedFactory.avgPerUnit)}/unit •
								42.5% margin
							</p>
						</div>

						<div className="ml-auto flex items-center gap-2">
							<button
								aria-label="Open message panel"
								className="relative inline-flex size-8 items-center justify-center rounded-md border border-border bg-background text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
								type="button"
							>
								<MessageSquareIcon className="size-4" />
								<span className="absolute -top-0.5 -right-0.5 size-2 rounded-full bg-blue-500" />
							</button>
							<Button
								onClick={() => onNegotiate(selectedFactory.id)}
								size="sm"
								variant="outline"
							>
								<Undo2Icon data-icon="inline-start" />
								Negotiate
							</Button>
							<Button
								className="bg-zinc-950 text-white hover:bg-zinc-800"
								size="sm"
							>
								<CheckIcon data-icon="inline-start" />
								Create Draft Order
							</Button>
							<button
								aria-label="Close supplier selection banner"
								className="inline-flex size-7 items-center justify-center rounded-md text-muted-foreground hover:text-foreground"
								onClick={onClose}
								type="button"
							>
								<XIcon className="size-4" />
							</button>
						</div>
					</div>
				</motion.div>
			) : null}
		</AnimatePresence>
	);
};
