"use client";

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
	ChevronRightIcon,
	EllipsisVerticalIcon,
	LockIcon,
	MessageSquareIcon,
	Undo2Icon,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import type { Route } from "next";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import {
	moneyFormatter,
	negotiateTemplate,
	quoteStatusColorMap,
} from "./constants";
import type {
	CostView,
	MarginView,
	NegotiationProduct,
	OrdersRfqNegotiateProps,
} from "./types";

const iconButtonClassName =
	"inline-flex size-8 items-center justify-center rounded-md border border-border bg-background text-muted-foreground transition-colors hover:bg-muted hover:text-foreground";

const formatCurrency = (value: number | null): string => {
	if (value === null) {
		return "-";
	}

	return moneyFormatter.format(value);
};

const formatMultiplier = (index: number): string => {
	if (index === 0) {
		return "2.80x";
	}

	if (index === 1) {
		return "2.90x";
	}

	if (index === 2) {
		return "2.94x";
	}

	return "3.45x";
};

const ProductThumb = () => {
	return (
		<div className="h-12 w-10 overflow-hidden rounded-md border bg-gradient-to-b from-sky-100 via-zinc-50 to-slate-100">
			<div className="h-full w-full bg-[linear-gradient(120deg,#dbeafe_0%,#e2e8f0_45%,#bfdbfe_100%)]" />
		</div>
	);
};

const ProductHeaderRow = ({
	isOpen,
	onToggle,
	product,
}: {
	isOpen: boolean;
	onToggle: () => void;
	product: NegotiationProduct;
}) => {
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

const QuantityColorDot = ({ index }: { index: number }) => {
	const colors = [
		"bg-slate-800",
		"bg-sky-500",
		"bg-emerald-500",
		"bg-rose-200",
	];
	return (
		<span
			className={cn("size-2.5 rounded-full", colors[index] ?? "bg-zinc-300")}
		/>
	);
};

const ProductAccordionContent = ({
	product,
}: {
	product: NegotiationProduct;
}) => {
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
					<section className="flex h-full min-h-[360px] flex-[2.2] flex-col overflow-hidden rounded-lg border">
						<header className="border-b bg-muted/30 px-3 py-2 font-semibold text-muted-foreground text-xs uppercase">
							Quantities
						</header>
						<table className="h-full w-full flex-1 text-xs">
							<thead>
								<tr className="border-b bg-muted/20 text-muted-foreground">
									<th className="px-3 py-2 text-left font-medium">Variant</th>
									{product.quantities.sizeLabels.map((label) => (
										<th
											className="px-2 py-2 font-medium"
											key={`${product.id}-${label}`}
										>
											{label}
										</th>
									))}
									<th className="px-2 py-2 font-medium">Total</th>
								</tr>
							</thead>
							<tbody>
								{product.quantities.rows.map((row, rowIndex) => (
									<tr className="border-b" key={row.id}>
										<td className="px-3 py-2">
											<div
												className={cn(
													"flex items-center gap-2",
													row.disabled
														? "text-muted-foreground/40"
														: "text-foreground"
												)}
											>
												<QuantityColorDot index={rowIndex} />
												<div>
													<p className="font-medium text-xs">{row.colorName}</p>
													<p className="text-[11px] text-muted-foreground">
														{row.productCode}
													</p>
												</div>
											</div>
										</td>
										{row.sizeValues.map((value, valueIndex) => (
											<td
												className="px-2 py-2 text-center"
												key={`${row.id}-${valueIndex}`}
											>
												<span
													className={cn(
														"inline-flex min-w-8 items-center justify-center rounded-md px-2 py-1 font-medium",
														row.disabled
															? "bg-muted/40 text-muted-foreground/50"
															: "bg-emerald-100 text-emerald-700"
													)}
												>
													{value}
												</span>
											</td>
										))}
										<td className="px-2 py-2 text-center font-semibold">
											{row.total}
										</td>
									</tr>
								))}
								<tr className="bg-muted/20 font-semibold">
									<td className="px-3 py-2">Total</td>
									{product.quantities.totalsBySize.map((value, valueIndex) => (
										<td
											className="px-2 py-2 text-center"
											key={`${product.id}-total-${valueIndex}`}
										>
											{value}
										</td>
									))}
									<td className="px-2 py-2 text-center">
										{product.quantities.grandTotal}
									</td>
								</tr>
							</tbody>
						</table>
					</section>

					<section className="flex h-full min-h-[360px] flex-1 flex-col overflow-hidden rounded-lg border">
						<header className="border-b bg-muted/30 px-3 py-2 font-semibold text-muted-foreground text-xs uppercase">
							Historical
						</header>
						<div className="grid grid-cols-2 border-b bg-muted/20 px-3 py-2 text-[11px] text-muted-foreground">
							<span>{product.comparisonDates[0]}</span>
							<span className="text-right">{product.comparisonDates[1]}</span>
						</div>
						<table className="h-full w-full flex-1 text-xs">
							<thead className="bg-muted/20 text-muted-foreground">
								<tr>
									{product.historical.columnLabels.map((label) => (
										<th
											className="px-3 py-2 text-left font-medium"
											key={`${product.id}-${label}`}
										>
											{label}
										</th>
									))}
								</tr>
							</thead>
							<tbody>
								{product.historical.rows.map((row, rowIndex) => (
									<tr
										className="border-b"
										key={`${product.id}-historical-${rowIndex}`}
									>
										<td className="px-3 py-2 font-medium">
											{formatCurrency(row.primary)}
										</td>
										<td className="px-3 py-2 font-medium">
											{formatCurrency(row.secondary)}
										</td>
									</tr>
								))}
								<tr className="bg-muted/20 font-semibold">
									<td className="px-3 py-2">
										{formatCurrency(product.historical.totalRow.primary)}
									</td>
									<td className="px-3 py-2">
										{formatCurrency(product.historical.totalRow.secondary)}
									</td>
								</tr>
							</tbody>
						</table>
					</section>

					<section className="flex h-full min-h-[360px] flex-1 flex-col overflow-hidden rounded-lg border">
						<header className="border-b bg-muted/30 px-3 py-2 font-semibold text-muted-foreground text-xs uppercase">
							Internal Target
						</header>
						<div className="grid grid-cols-2 border-b bg-muted/20 px-3 py-2 text-[11px] text-muted-foreground">
							<span>{product.internalTarget.dates[0]}</span>
							<span className="text-right">
								{product.internalTarget.dates[1]}
							</span>
						</div>
						<table className="h-full w-full flex-1 text-xs">
							<thead className="bg-muted/20 text-muted-foreground">
								<tr>
									{product.internalTarget.columnLabels.map((label) => (
										<th
											className="px-3 py-2 text-left font-medium"
											key={`${product.id}-${label}`}
										>
											{label}
										</th>
									))}
								</tr>
							</thead>
							<tbody>
								{product.internalTarget.rows.map((row, rowIndex) => (
									<tr
										className="border-b"
										key={`${product.id}-internal-${rowIndex}`}
									>
										<td className="px-3 py-2 font-medium">
											{formatCurrency(row.primary)}
										</td>
										<td className="px-3 py-2">
											<p className="font-semibold text-foreground">
												{formatCurrency(row.secondary)}
											</p>
											<p className="text-[11px] text-muted-foreground">
												{formatMultiplier(rowIndex)}
											</p>
										</td>
									</tr>
								))}
								<tr className="bg-muted/20 font-semibold">
									<td className="px-3 py-2">
										{formatCurrency(product.internalTarget.totalRow.primary)}
									</td>
									<td className="px-3 py-2">
										{formatCurrency(product.internalTarget.totalRow.secondary)}
									</td>
								</tr>
							</tbody>
						</table>
					</section>

					<section className="flex h-full min-h-[360px] flex-[1.2] flex-col overflow-hidden rounded-lg border">
						<header className="border-b bg-muted/30 px-3 py-2 font-semibold text-muted-foreground text-xs uppercase">
							Active Negotiation
						</header>
						<div className="grid grid-cols-3 border-b bg-muted/20 px-3 py-2 text-[11px] text-muted-foreground">
							{product.activeNegotiation.dateLabels.map((dateLabel) => (
								<span
									className="text-center"
									key={`${product.id}-${dateLabel}`}
								>
									{dateLabel}
								</span>
							))}
						</div>
						<div className="grid grid-cols-3 border-b bg-background px-3 py-2 text-[11px] text-muted-foreground">
							{product.activeNegotiation.columnLabels.map((columnLabel) => (
								<span
									className="truncate text-center"
									key={`${product.id}-${columnLabel}`}
								>
									{columnLabel}
								</span>
							))}
						</div>
						<table className="h-full w-full flex-1 text-xs">
							<tbody>
								{product.activeNegotiation.rows.map((row, rowIndex) => (
									<tr
										className="border-b"
										key={`${product.id}-active-${rowIndex}`}
									>
										{row.values.map((value, valueIndex) => {
											const highlight = valueIndex === 2 && rowIndex < 3;

											return (
												<td
													className="px-3 py-2 text-center"
													key={`${product.id}-active-${rowIndex}-${valueIndex}`}
												>
													<p
														className={cn(
															"font-semibold",
															highlight ? "text-emerald-600" : "text-foreground"
														)}
													>
														{formatCurrency(value)}
													</p>
													<p className="text-[11px] text-muted-foreground">
														{formatMultiplier(valueIndex)}
													</p>
												</td>
											);
										})}
									</tr>
								))}
								<tr className="bg-muted/20">
									{product.activeNegotiation.totalRow.values.map(
										(totalValue, valueIndex) => (
											<td
												className="px-3 py-2 text-center font-semibold"
												key={`${product.id}-active-total-${valueIndex}`}
											>
												{formatCurrency(totalValue)}
											</td>
										)
									)}
								</tr>
							</tbody>
						</table>
					</section>
				</div>
			</div>

			<div className="grid grid-cols-[auto_16px_auto_16px_auto_16px_auto] items-end gap-2 text-sm">
				<div>
					<p className="font-semibold text-muted-foreground text-xs uppercase">
						Agreed FOB Total
					</p>
					<p className="font-semibold text-emerald-600 text-xl">
						{formatCurrency(product.summary.agreedFobTotal)}
					</p>
					<p className="text-muted-foreground text-xs">
						Avg. {moneyFormatter.format(product.summary.avgPerUnit)}/unit •{" "}
						{product.summary.marginPercent}% margin
					</p>
				</div>
				<span className="pb-1 text-muted-foreground text-xl">+</span>
				<div>
					<p className="font-semibold text-muted-foreground text-xs uppercase">
						Est. Freight
					</p>
					<p className="font-semibold text-lg">
						~{formatCurrency(product.summary.estFreight)}
					</p>
				</div>
				<span className="pb-1 text-muted-foreground text-xl">+</span>
				<div>
					<p className="font-semibold text-muted-foreground text-xs uppercase">
						Est. Duties
					</p>
					<p className="font-semibold text-lg">
						~{formatCurrency(product.summary.estDuties)}
					</p>
				</div>
				<span className="pb-1 text-muted-foreground text-xl">=</span>
				<div>
					<p className="font-semibold text-muted-foreground text-xs uppercase">
						Est. Landed Cost
					</p>
					<p className="font-semibold text-[26px] text-blue-600 leading-none">
						~{formatCurrency(product.summary.estLandedCost)}
					</p>
					<p className="text-muted-foreground text-xs">
						Avg. {moneyFormatter.format(product.summary.avgPerUnit)}/unit •{" "}
						{product.summary.marginPercent}% margin
					</p>
				</div>
			</div>

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

export default function OrdersRfqNegotiate({
	factory,
	rfqCode,
}: OrdersRfqNegotiateProps) {
	const [costView, setCostView] = useState<CostView>("FOB");
	const [marginView, setMarginView] = useState<MarginView>("Markup");
	const [openAccordionIds, setOpenAccordionIds] = useState<Set<string>>(
		() => new Set()
	);
	const router = useRouter();

	const yourTurnProductsCount = useMemo(() => {
		return negotiateTemplate.products.filter(
			(product) => product.status === "Your Turn"
		).length;
	}, []);

	const toggleAccordion = (productId: string) => {
		setOpenAccordionIds((currentIds) => {
			const nextIds = new Set(currentIds);
			if (nextIds.has(productId)) {
				nextIds.delete(productId);
			} else {
				nextIds.add(productId);
			}
			return nextIds;
		});
	};

	return (
		<div className="flex h-full min-h-0 w-full flex-col bg-background">
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

			<div className="min-h-0 flex-1 overflow-auto px-4 py-4">
				<div className="mb-3 flex items-center gap-3 border-b pb-2">
					<span className="inline-flex items-center gap-1 font-semibold text-cyan-700">
						<Undo2Icon className="size-3.5" />
						Your Turn
					</span>
					<span className="text-muted-foreground text-sm">
						{yourTurnProductsCount} products
					</span>
				</div>

				<div className="space-y-3 pb-4">
					{negotiateTemplate.products.map((product) => {
						const isOpen = openAccordionIds.has(product.id);
						return (
							<article
								className="overflow-hidden rounded-xl border"
								key={product.id}
							>
								<ProductHeaderRow
									isOpen={isOpen}
									onToggle={() => toggleAccordion(product.id)}
									product={product}
								/>
								<AnimatePresence initial={false}>
									{isOpen ? (
										<motion.div
											animate={{ height: "auto", opacity: 1 }}
											className="overflow-hidden"
											exit={{ height: 0, opacity: 0 }}
											initial={{ height: 0, opacity: 0 }}
											transition={{ duration: 0.22, ease: "easeInOut" }}
										>
											<ProductAccordionContent product={product} />
										</motion.div>
									) : null}
								</AnimatePresence>
							</article>
						);
					})}
				</div>
			</div>
		</div>
	);
}
