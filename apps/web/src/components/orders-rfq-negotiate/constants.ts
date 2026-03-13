import { RFQ_NEGOTIATE_TEMPLATE } from "@/data/rfq-negotiate-template";
import type { NegotiationQuoteStatus } from "./types";

export const negotiateTemplate = RFQ_NEGOTIATE_TEMPLATE;

export const moneyFormatter = new Intl.NumberFormat("en-US", {
	currency: "USD",
	style: "currency",
});

export const quoteStatusColorMap: Record<NegotiationQuoteStatus, string> = {
	"Awaiting Supplier": "border-orange-200 bg-orange-100 text-orange-700",
	Completed: "border-emerald-200 bg-emerald-100 text-emerald-700",
	"Draft saved": "border-amber-200 bg-amber-100 text-amber-700",
	"Your Turn": "border-cyan-200 bg-cyan-100 text-cyan-700",
};
