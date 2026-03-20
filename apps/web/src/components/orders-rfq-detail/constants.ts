import { rfqDetailTemplate } from "@/data/rfq-detail-template";
import type { OrderStatus } from "@/models/orders-domain";
import type { QuoteStatus } from "./types";

export const orderStatusColors: Record<OrderStatus, string> = {
	Draft: "border-zinc-200 bg-zinc-100 text-zinc-700",
	Requested: "border-sky-200 bg-sky-100 text-sky-700",
	"In Progress": "border-amber-200 bg-amber-100 text-amber-700",
	Completed: "border-emerald-200 bg-emerald-100 text-emerald-700",
	"Your Turn": "border-yellow-200 bg-yellow-100 text-yellow-700",
	"Awaiting Supplier": "border-cyan-200 bg-cyan-100 text-cyan-700",
	Awarded: "border-green-200 bg-green-100 text-green-700",
	Ordered: "border-violet-200 bg-violet-100 text-violet-700",
	Cancelled: "border-zinc-200 bg-zinc-100 text-zinc-700",
	Paused: "border-indigo-200 bg-indigo-100 text-indigo-700",
};

export const quoteStatusColors: Record<QuoteStatus, string> = {
	Draft: "border-amber-200 bg-amber-100 text-amber-700",
	"Your Turn": "border-cyan-200 bg-cyan-100 text-cyan-700",
	"Awaiting Supplier": "border-orange-200 bg-orange-100 text-orange-700",
	Completed: "border-emerald-200 bg-emerald-100 text-emerald-700",
	Cancelled: "border-zinc-200 bg-zinc-100 text-zinc-700",
};

export const detailTemplate = rfqDetailTemplate;
