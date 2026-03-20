import type { OrderStatus } from "@/models/orders-domain";
import type {
	FactoryQuoteColumn,
	ProductGroup,
	ProductLine,
} from "@/models/rfq-detail";

export type {
	FactoryQuoteColumn,
	ProductGroup,
	ProductLine,
	QuoteStatus,
	RfqDetailHeader,
} from "@/models/rfq-detail";

export interface OrdersRfqDetailProps {
	orderStatus: OrderStatus;
	rfqCode: string;
}

export type CostView = "FOB" | "Landed";

export type MarginView = "Markup" | "Margin";

export interface DetailHeaderProps {
	costView: CostView;
	marginView: MarginView;
	onCostViewChange: (view: CostView) => void;
	onMarginViewChange: (view: MarginView) => void;
	orderStatus: OrderStatus;
	rfqCode: string;
}

export interface FactoryCardProps {
	factory: FactoryQuoteColumn;
	isSelected: boolean;
	onNegotiate: (factoryId: string) => void;
	onSelect: (factoryId: string) => void;
}

export interface HeaderMetricProps {
	label: string;
	value: string;
}

export interface ProductGroupPriceCellProps {
	factory: FactoryQuoteColumn;
	groupId: string;
	isBestPrice: boolean;
	isHighlighted: boolean;
	multiplier: string;
	onHoverFactory: (factoryId: string | null) => void;
	onSelectFactory: (factoryId: string) => void;
	price: number;
}

export interface ProductGroupRowProps {
	group: ProductGroup;
	isFactoryHighlighted: (factoryId: string) => boolean;
	onHoverFactory: (factoryId: string | null) => void;
	onSelectFactory: (factoryId: string) => void;
}

export interface ProductVariantRowProps {
	isFactoryHighlighted: (factoryId: string) => boolean;
	onHoverFactory: (factoryId: string | null) => void;
	onSelectFactory: (factoryId: string) => void;
	variant: ProductLine;
}

export interface QuoteComparisonTableProps {
	hasSelectedFactory: boolean;
	isFactoryHighlighted: (factoryId: string) => boolean;
	onHoverFactory: (factoryId: string | null) => void;
	onNegotiate: (factoryId: string) => void;
	onSelectFactory: (factoryId: string) => void;
	selectedFactoryId: string | null;
}

export interface SelectedFactoryBannerProps {
	onClose: () => void;
	onNegotiate: (factoryId: string) => void;
	selectedFactory: FactoryQuoteColumn | undefined;
}

export interface UseRfqDetailReturn {
	costView: CostView;
	hoveredFactoryId: string | null;
	isFactoryHighlighted: (factoryId: string) => boolean;
	marginView: MarginView;
	navigateToNegotiation: (factoryId: string) => void;
	selectedFactory: FactoryQuoteColumn | undefined;
	selectedFactoryId: string | null;
	setCostView: (view: CostView) => void;
	setHoveredFactoryId: (factoryId: string | null) => void;
	setMarginView: (view: MarginView) => void;
	setSelectedFactoryId: (factoryId: string | null) => void;
	toggleFactorySelection: (factoryId: string) => void;
}
