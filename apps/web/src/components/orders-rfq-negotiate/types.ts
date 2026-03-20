import type {
	NegotiationProduct,
	RfqNegotiateFactory,
} from "@/models/rfq-negotiate";

export type CostView = "FOB" | "Landed";
export type MarginView = "Markup" | "Margin";

export interface OrdersRfqNegotiateProps {
	factory: RfqNegotiateFactory;
	rfqCode: string;
}

export interface ProductHeaderRowProps {
	isOpen: boolean;
	onToggle: () => void;
	product: NegotiationProduct;
}

export interface QuantityColorDotProps {
	index: number;
}

export interface ProductAccordionContentProps {
	product: NegotiationProduct;
}

export interface NegotiationHeaderProps {
	factory: RfqNegotiateFactory;
	rfqCode: string;
}

export interface QuantitiesSectionProps {
	product: NegotiationProduct;
}

export interface HistoricalSectionProps {
	product: NegotiationProduct;
}

export interface InternalTargetSectionProps {
	product: NegotiationProduct;
}

export interface ActiveNegotiationSectionProps {
	product: NegotiationProduct;
}

export interface ProductSummaryInfoProps {
	product: NegotiationProduct;
}
