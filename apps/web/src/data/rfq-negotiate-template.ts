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

export const RFQ_NEGOTIATE_FACTORIES: RfqNegotiateFactory[] = [
	{
		id: "apex-trading",
		name: "Apex Trading",
		rating: 4.4,
		responseType: "Full Quote",
		shortName: "AT",
		status: "Your Turn",
	},
	{
		id: "apex-trading-lite",
		name: "Apex Trading",
		rating: 4.4,
		responseType: "Per Item",
		shortName: "AT",
		status: "Your Turn",
	},
	{
		id: "meridian-corp",
		name: "Meridian Corp",
		rating: 4.4,
		responseType: "Full Quote",
		shortName: "MC",
		status: "Awaiting Supplier",
	},
	{
		id: "nova-supply",
		name: "Nova Supply",
		rating: 4.4,
		responseType: "Full Quote",
		shortName: "NS",
		status: "Completed",
	},
	{
		id: "greenleaf-factory",
		name: "GreenLeaf Factory",
		rating: 4.4,
		responseType: "Full Quote",
		shortName: "GF",
		status: "Completed",
	},
];

export const RFQ_NEGOTIATE_TEMPLATE: RfqNegotiateTemplate = {
	contextMessage: "All products must be quoted before submitting",
	submissionTabs: [{ label: "Full Quote" }, { label: "Per Item" }],
	products: [
		{
			activeNegotiation: {
				columnLabels: ["Dom", "Apex Tr...", "Nanai..."],
				dateLabels: ["Jan 05", "Jan 10", "Jan 12"],
				rows: [
					{ values: [12, 14.5, 14.5] },
					{ values: [14.5, 17, 17] },
					{ values: [18, 24, 21] },
					{ values: [14, null, null] },
				],
				totalRow: { values: [14.86, 18.61, 17.54] },
			},
			category: "Equipment",
			comparisonDates: ["Jun 15, 2025", "Oct 20, 2025"],
			historical: {
				columnLabels: ["Best Order", "Last Order"],
				rows: [
					{ primary: 14.5, secondary: 16 },
					{ primary: 17.8, secondary: 19.5 },
					{ primary: 22, secondary: 24.5 },
					{ primary: 18.5, secondary: 20 },
				],
				totalRow: { primary: 18.12, secondary: 20.04 },
			},
			id: "heritage-classic-axe",
			internalTarget: {
				columnLabels: ["Retail Price", "Cost"],
				dates: ["Jan 05", "Jan 05"],
				rows: [
					{ primary: 42, secondary: 14 },
					{ primary: 50, secondary: 17 },
					{ primary: 62, secondary: 21 },
					{ primary: 48, secondary: 16.5 },
				],
				totalRow: { primary: 51.43, secondary: 17.36 },
			},
			noteToSupplier: "Note to supplier",
			quantities: {
				grandTotal: 140,
				rows: [
					{
						colorName: "Carbon Black",
						id: "variant-1",
						multiplier: "2.00x",
						productCode: "SKI-AXE-001",
						sizeValues: [30, 5, 5, 5, 5],
						total: 50,
					},
					{
						colorName: "Ocean Blue",
						id: "variant-2",
						multiplier: "2.00x",
						productCode: "SKI-AXE-001",
						sizeValues: [20, 5, 5, 5, 5],
						total: 40,
					},
					{
						colorName: "Forest Green",
						id: "variant-3",
						multiplier: "2.00x",
						productCode: "SKI-AXE-001",
						sizeValues: [30, 5, 5, 5, 5],
						total: 50,
					},
					{
						colorName: "Sunset Red",
						disabled: true,
						id: "variant-4",
						multiplier: "2.00x",
						productCode: "SKI-AXE-001",
						sizeValues: [30, 5, 5, 5, 5],
						total: 50,
					},
				],
				sizeLabels: ["XS", "S", "M", "L", "XL"],
				totalsBySize: [80, 15, 15, 15, 15],
			},
			sku: "SKI-AXE-001",
			status: "Your Turn",
			summary: {
				agreedFobTotal: 1250,
				avgPerUnit: 51.75,
				estDuties: 3075,
				estFreight: 5000,
				estLandedCost: 90_375,
				marginPercent: 42.5,
			},
			tierLabels: ["Tier 1 (800 un)", "Tier 2 (800 un)", "Tier 3 (800 un)"],
			title: "Heritage Classic Axe",
			variantCount: 3,
		},
		{
			activeNegotiation: {
				columnLabels: ["Dom", "Apex Tr...", "Nanai..."],
				dateLabels: ["Jan 07", "Jan 11", "Jan 13"],
				rows: [{ values: [10.8, 13.2, 13.6] }, { values: [11.3, 13.8, 14.1] }],
				totalRow: { values: [11.05, 13.5, 13.85] },
			},
			category: "Equipment",
			comparisonDates: ["Jun 28, 2025", "Nov 01, 2025"],
			historical: {
				columnLabels: ["Best Order", "Last Order"],
				rows: [
					{ primary: 12.4, secondary: 13.8 },
					{ primary: 13.2, secondary: 14.6 },
				],
				totalRow: { primary: 12.8, secondary: 14.2 },
			},
			id: "heritage-classic-axe-02",
			internalTarget: {
				columnLabels: ["Retail Price", "Cost"],
				dates: ["Jan 07", "Jan 07"],
				rows: [
					{ primary: 39, secondary: 12.5 },
					{ primary: 44, secondary: 14 },
				],
				totalRow: { primary: 41.5, secondary: 13.25 },
			},
			noteToSupplier: "Note to supplier",
			quantities: {
				grandTotal: 120,
				rows: [
					{
						colorName: "Carbon Black",
						id: "variant-5",
						multiplier: "2.00x",
						productCode: "SKI-AXE-002",
						sizeValues: [25, 5, 5, 5, 5],
						total: 45,
					},
					{
						colorName: "Ocean Blue",
						id: "variant-6",
						multiplier: "2.00x",
						productCode: "SKI-AXE-002",
						sizeValues: [20, 5, 5, 5, 5],
						total: 40,
					},
					{
						colorName: "Forest Green",
						id: "variant-7",
						multiplier: "2.00x",
						productCode: "SKI-AXE-002",
						sizeValues: [20, 5, 5, 5, 0],
						total: 35,
					},
				],
				sizeLabels: ["XS", "S", "M", "L", "XL"],
				totalsBySize: [65, 15, 15, 15, 10],
			},
			sku: "SKI-AXE-002",
			status: "Draft saved",
			summary: {
				agreedFobTotal: 980,
				avgPerUnit: 48.2,
				estDuties: 2550,
				estFreight: 4200,
				estLandedCost: 75_610,
				marginPercent: 39.8,
			},
			tierLabels: ["Tier 1 (600 un)", "Tier 2 (800 un)", "Tier 3 (600 un)"],
			title: "Heritage Classic Axe",
			variantCount: 3,
		},
	],
};

export const getRfqNegotiateFactoryById = (
	factoryId: string
): RfqNegotiateFactory | undefined => {
	return RFQ_NEGOTIATE_FACTORIES.find((factory) => factory.id === factoryId);
};
