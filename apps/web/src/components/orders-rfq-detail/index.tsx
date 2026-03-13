"use client";

import {
	Avatar,
	AvatarFallback,
} from "@amber-pre-interview/ui/components/avatar";
import { Button } from "@amber-pre-interview/ui/components/button";
import { cn } from "@amber-pre-interview/ui/lib/utils";
import {
	CheckIcon,
	EllipsisVerticalIcon,
	FilesIcon,
	MessageSquareIcon,
	StarIcon,
	Undo2Icon,
	XIcon,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useMemo, useState } from "react";
import {
	detailTemplate,
	moneyFormatter,
	orderStatusColors,
	quoteStatusColors,
} from "./constants";
import type {
	CostView,
	FactoryQuoteColumn,
	MarginView,
	OrdersRfqDetailProps,
	ProductGroup,
} from "./types";

const iconButtonClassName =
	"inline-flex size-7 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground";

const formatPerUnit = (value: number): string => {
	return moneyFormatter.format(value);
};

const getLowestFactoryId = (
	quotesByFactoryId: Record<string, { price: number }>
): string => {
	let lowestFactoryId = "";
	let lowestValue = Number.POSITIVE_INFINITY;

	for (const [factoryId, quote] of Object.entries(quotesByFactoryId)) {
		if (quote.price < lowestValue) {
			lowestValue = quote.price;
			lowestFactoryId = factoryId;
		}
	}

	return lowestFactoryId;
};

const ProductGroupRow = ({
	isFactoryHighlighted,
	group,
	onHoverFactory,
	onSelectFactory,
}: {
	isFactoryHighlighted: (factoryId: string) => boolean;
	group: ProductGroup;
	onHoverFactory: (factoryId: string | null) => void;
	onSelectFactory: (factoryId: string) => void;
}) => {
	const lowestGroupFactoryId = getLowestFactoryId(group.quotesByFactoryId);

	return (
		<>
			<tr className="border-b bg-muted/40">
				<td className="sticky left-0 z-10 min-w-72 border-r bg-muted/40 p-4 align-top">
					<div className="flex items-start justify-between gap-3">
						<div>
							<p className="font-medium text-foreground text-sm">
								{group.title}
							</p>
							<div className="mt-2 flex gap-2 text-[11px]">
								<span className="rounded-md bg-background px-2 py-1 text-muted-foreground">
									{group.tierOneLabel}
								</span>
								<span className="rounded-md bg-background px-2 py-1 text-muted-foreground">
									{group.tierTwoLabel}
								</span>
							</div>
						</div>
						<button
							aria-label={`Open options for ${group.title}`}
							className={iconButtonClassName}
							type="button"
						>
							<EllipsisVerticalIcon className="size-4" />
						</button>
					</div>
				</td>
				{detailTemplate.factories.map((factory) => {
					const quote = group.quotesByFactoryId[factory.id];
					const isHighlighted = isFactoryHighlighted(factory.id);
					const isBestPrice = lowestGroupFactoryId === factory.id;

					return (
						<td
							className={cn(
								"min-w-44 border-r p-0 align-top transition-colors",
								isHighlighted ? "bg-sky-50/80" : "bg-background"
							)}
							key={`${group.id}-${factory.id}`}
						>
							<button
								aria-label={`Select ${factory.name} column`}
								className="flex w-full flex-col items-end px-4 py-3 text-right"
								onClick={() => onSelectFactory(factory.id)}
								onMouseEnter={() => onHoverFactory(factory.id)}
								onMouseLeave={() => onHoverFactory(null)}
								type="button"
							>
								<span
									className={cn(
										"font-semibold text-base text-foreground",
										isBestPrice ? "text-emerald-600" : undefined
									)}
								>
									{moneyFormatter.format(quote.price)}
								</span>
								<span className="text-muted-foreground text-xs">
									{quote.multiplier}
								</span>
							</button>
						</td>
					);
				})}
			</tr>
			{group.variants.map((variant) => {
				const lowestVariantFactoryId = getLowestFactoryId(
					variant.quotesByFactoryId
				);

				return (
					<tr className="border-b" key={variant.id}>
						<td className="sticky left-0 z-10 min-w-72 border-r bg-background p-4">
							<div className="flex items-center justify-between gap-3">
								<div className="flex items-center gap-2">
									<span className="size-2 rounded-full bg-slate-200" />
									<div>
										<p className="font-medium text-foreground text-sm">
											{variant.productName}
										</p>
										<p className="text-muted-foreground text-xs">
											({variant.productCode})
										</p>
									</div>
								</div>
								<span className="text-muted-foreground text-xs">
									{variant.units}
								</span>
							</div>
						</td>
						{detailTemplate.factories.map((factory) => {
							const quote = variant.quotesByFactoryId[factory.id];
							const isHighlighted = isFactoryHighlighted(factory.id);
							const isBestPrice = lowestVariantFactoryId === factory.id;

							return (
								<td
									className={cn(
										"min-w-44 border-r p-0 transition-colors",
										isHighlighted ? "bg-sky-50/80" : "bg-background",
										isBestPrice ? "bg-emerald-50" : undefined
									)}
									key={`${variant.id}-${factory.id}`}
								>
									<button
										aria-label={`Select ${factory.name} column`}
										className="flex w-full flex-col items-end px-4 py-3 text-right"
										onClick={() => onSelectFactory(factory.id)}
										onMouseEnter={() => onHoverFactory(factory.id)}
										onMouseLeave={() => onHoverFactory(null)}
										type="button"
									>
										<span
											className={cn(
												"font-medium text-base text-foreground",
												isBestPrice ? "text-emerald-600" : undefined
											)}
										>
											{formatPerUnit(quote.price)}
										</span>
										<span className="text-muted-foreground text-xs">
											{quote.multiplier}
										</span>
										{quote.deltaLabel ? (
											<span className="text-[11px] text-muted-foreground">
												{quote.deltaLabel}
											</span>
										) : null}
									</button>
								</td>
							);
						})}
					</tr>
				);
			})}
		</>
	);
};

const FactoryCard = ({
	factory,
	isSelected,
	onSelect,
}: {
	factory: FactoryQuoteColumn;
	isSelected: boolean;
	onSelect: (factoryId: string) => void;
}) => {
	const selectFactory = () => {
		onSelect(factory.id);
	};

	return (
		<button
			aria-label={`Select ${factory.name} column`}
			aria-pressed={isSelected}
			className={cn(
				"flex h-full w-full flex-col rounded-xl border border-border bg-background text-left transition-colors",
				isSelected ? "border-sky-300 bg-sky-50" : "hover:bg-muted/40"
			)}
			onClick={selectFactory}
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

			<div className="mt-3 flex gap-1.5 border-t p-2.5 pt-2">
				<span className="inline-flex h-8 w-8 items-center justify-center rounded-md border bg-background text-foreground text-xs transition-colors hover:bg-muted">
					<MessageSquareIcon size={16} />
				</span>
				<span className="inline-flex h-8 flex-1 items-center justify-center gap-1 rounded-md border bg-background font-medium text-foreground text-xs transition-colors hover:bg-muted">
					<Undo2Icon className="size-3.5" />
					Negotiate
				</span>
			</div>
		</button>
	);
};

const HeaderMetric = ({ label, value }: { label: string; value: string }) => {
	return (
		<div className="flex min-w-[120px] flex-col border-l pl-4">
			<span className="text-[10px] text-muted-foreground uppercase">
				{label}
			</span>
			<span className="mt-1 font-semibold text-foreground text-sm">
				{value}
			</span>
		</div>
	);
};

export default function OrdersRfqDetail({
	orderStatus,
	rfqCode,
}: OrdersRfqDetailProps) {
	const [costView, setCostView] = useState<CostView>("FOB");
	const [hoveredFactoryId, setHoveredFactoryId] = useState<string | null>(null);
	const [marginView, setMarginView] = useState<MarginView>("Markup");
	const [selectedFactoryId, setSelectedFactoryId] = useState<string | null>(
		null
	);

	const selectedFactory = useMemo(() => {
		return detailTemplate.factories.find(
			(factory) => factory.id === selectedFactoryId
		);
	}, [selectedFactoryId]);
	const hasSelectedFactory = Boolean(selectedFactory);
	const toggleFactorySelection = (factoryId: string) => {
		setSelectedFactoryId((currentFactoryId) =>
			currentFactoryId === factoryId ? null : factoryId
		);
	};
	const isFactoryHighlighted = (factoryId: string): boolean => {
		return selectedFactoryId === factoryId || hoveredFactoryId === factoryId;
	};

	return (
		<div className="relative flex h-full min-h-0 w-full flex-col bg-background">
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
						<HeaderMetric
							label="Units"
							value={detailTemplate.header.unitsRange}
						/>
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
								onClick={() => setCostView("FOB")}
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
								onClick={() => setCostView("Landed")}
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
								onClick={() => setMarginView("Markup")}
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
								onClick={() => setMarginView("Margin")}
								type="button"
							>
								Margin
							</button>
						</div>
					</div>
				</div>
			</div>

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
								{detailTemplate.factories.map((factory) => {
									const isSelected = selectedFactoryId === factory.id;
									const isHighlighted = isFactoryHighlighted(factory.id);

									return (
										<th
											className={cn(
												"min-w-44 border-r p-3 align-top transition-colors",
												isHighlighted ? "bg-sky-50/70" : "bg-muted/20"
											)}
											key={factory.id}
											onMouseEnter={() => setHoveredFactoryId(factory.id)}
											onMouseLeave={() => setHoveredFactoryId(null)}
										>
											<FactoryCard
												factory={factory}
												isSelected={isSelected}
												onSelect={toggleFactorySelection}
											/>
										</th>
									);
								})}
							</tr>
						</thead>
						<tbody>
							{detailTemplate.productGroups.map((group) => (
								<ProductGroupRow
									group={group}
									isFactoryHighlighted={isFactoryHighlighted}
									key={group.id}
									onHoverFactory={setHoveredFactoryId}
									onSelectFactory={toggleFactorySelection}
								/>
							))}
						</tbody>
					</table>
				</div>
			</div>

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
									Avg. {moneyFormatter.format(selectedFactory.avgPerUnit)}/unit
									• 42.5% margin
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
								<Button size="sm" variant="outline">
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
									onClick={() => setSelectedFactoryId(null)}
									type="button"
								>
									<XIcon className="size-4" />
								</button>
							</div>
						</div>
					</motion.div>
				) : null}
			</AnimatePresence>
		</div>
	);
}
