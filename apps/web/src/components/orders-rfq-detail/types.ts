import type { OrderStatus } from "@/data/orders-domain";

export type {
	FactoryQuoteColumn,
	ProductGroup,
	QuoteStatus,
	RfqDetailHeader,
} from "@/data/rfq-detail-template";

export interface OrdersRfqDetailProps {
	orderStatus: OrderStatus;
	rfqCode: string;
}

export type CostView = "FOB" | "Landed";

export type MarginView = "Markup" | "Margin";
