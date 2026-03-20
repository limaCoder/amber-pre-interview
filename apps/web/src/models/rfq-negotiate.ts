export type NegotiationQuoteStatus =
	| "Your Turn"
	| "Draft saved"
	| "Awaiting Supplier"
	| "Completed";

export interface RfqNegotiateFactory {
	id: string;
	name: string;
	rating: number;
	responseType: "Full Quote" | "Per Item";
	shortName: string;
	status: NegotiationQuoteStatus;
}

export interface QuantitiesRow {
	colorName: string;
	disabled?: boolean;
	id: string;
	multiplier: string;
	productCode: string;
	sizeValues: number[];
	total: number;
}

export interface ComparisonRow {
	primary: number | null;
	secondary: number | null;
}

export interface ActiveNegotiationRow {
	values: Array<number | null>;
}

export interface ProductNegotiationSummary {
	agreedFobTotal: number;
	avgPerUnit: number;
	estDuties: number;
	estFreight: number;
	estLandedCost: number;
	marginPercent: number;
}

export interface NegotiationProduct {
	activeNegotiation: {
		columnLabels: string[];
		dateLabels: string[];
		rows: ActiveNegotiationRow[];
		totalRow: ActiveNegotiationRow;
	};
	category: string;
	comparisonDates: string[];
	historical: {
		columnLabels: [string, string];
		rows: ComparisonRow[];
		totalRow: ComparisonRow;
	};
	id: string;
	internalTarget: {
		columnLabels: [string, string];
		dates: [string, string];
		rows: ComparisonRow[];
		totalRow: ComparisonRow;
	};
	noteToSupplier: string;
	quantities: {
		rows: QuantitiesRow[];
		sizeLabels: string[];
		totalsBySize: number[];
		grandTotal: number;
	};
	sku: string;
	status: NegotiationQuoteStatus;
	summary: ProductNegotiationSummary;
	tierLabels: string[];
	title: string;
	variantCount: number;
}

export interface RfqNegotiateTemplate {
	contextMessage: string;
	products: NegotiationProduct[];
	submissionTabs: Array<{
		label: string;
	}>;
}
