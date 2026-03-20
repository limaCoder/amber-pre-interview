import type { RfqNegotiateFactory } from "@/models/rfq-negotiate";

export type CostView = "FOB" | "Landed";
export type MarginView = "Markup" | "Margin";

export interface OrdersRfqNegotiateProps {
	factory: RfqNegotiateFactory;
	rfqCode: string;
}
