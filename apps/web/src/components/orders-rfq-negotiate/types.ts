import type { RfqNegotiateFactory } from "@/data/rfq-negotiate-template";

export type {
	NegotiationProduct,
	NegotiationQuoteStatus,
	RfqNegotiateFactory,
} from "@/data/rfq-negotiate-template";

export type CostView = "FOB" | "Landed";
export type MarginView = "Markup" | "Margin";

export interface OrdersRfqNegotiateProps {
	factory: RfqNegotiateFactory;
	rfqCode: string;
}
