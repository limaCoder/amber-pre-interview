export type QuoteStatus =
	| "Draft"
	| "Your Turn"
	| "Awaiting Supplier"
	| "Completed"
	| "Cancelled";

export interface RfqDetailHeader {
	createdAt: string;
	createdBy: string;
	quoteDueDate: string;
	targetShipDate: string;
	totalTargetCost: number;
	unitsRange: string;
}

export interface FactoryQuoteColumn {
	avgPerUnit: number;
	fobTotal: number;
	id: string;
	multiplier: string;
	name: string;
	rating: number;
	responseType: string;
	shortName: string;
	status: QuoteStatus;
}

export interface QuoteCell {
	deltaLabel?: string;
	multiplier: string;
	price: number;
}

export interface ProductLine {
	id: string;
	productCode: string;
	productName: string;
	quotesByFactoryId: Record<string, QuoteCell>;
	units: number;
}

export interface ProductGroup {
	id: string;
	quotesByFactoryId: Record<string, QuoteCell>;
	tierOneLabel: string;
	tierTwoLabel: string;
	title: string;
	variants: ProductLine[];
}

export interface RfqDetailTemplate {
	factories: FactoryQuoteColumn[];
	header: RfqDetailHeader;
	productGroups: ProductGroup[];
}
