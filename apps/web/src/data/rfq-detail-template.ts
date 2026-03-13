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

export const rfqDetailTemplate: RfqDetailTemplate = {
	header: {
		createdAt: "Oct 17, 2025",
		createdBy: "Mario Augusto",
		quoteDueDate: "Jan 18, 2026",
		targetShipDate: "Feb 18, 2026",
		totalTargetCost: 590_375,
		unitsRange: "6,200 - 7,800",
	},
	factories: [
		{
			avgPerUnit: 43.39,
			fobTotal: 495_115,
			id: "apex-trading",
			multiplier: "2.00x",
			name: "Apex Trading",
			rating: 4.4,
			responseType: "Full Quote",
			shortName: "AT",
			status: "Your Turn",
		},
		{
			avgPerUnit: 43.39,
			fobTotal: 495_115,
			id: "apex-trading-lite",
			multiplier: "2.00x",
			name: "Apex Trading",
			rating: 4.4,
			responseType: "Per Item",
			shortName: "AT",
			status: "Your Turn",
		},
		{
			avgPerUnit: 41.4,
			fobTotal: 472_300,
			id: "meridian-corp",
			multiplier: "2.00x",
			name: "Meridian Corp",
			rating: 4.4,
			responseType: "Full Quote",
			shortName: "MC",
			status: "Awaiting Supplier",
		},
		{
			avgPerUnit: 44.72,
			fobTotal: 510_240,
			id: "nova-supply",
			multiplier: "2.00x",
			name: "Nova Supply",
			rating: 4.4,
			responseType: "Full Quote",
			shortName: "NS",
			status: "Completed",
		},
		{
			avgPerUnit: 46.51,
			fobTotal: 530_800,
			id: "greenleaf-factory",
			multiplier: "2.00x",
			name: "GreenLeaf Factory",
			rating: 4.4,
			responseType: "Full Quote",
			shortName: "GF",
			status: "Cancelled",
		},
	],
	productGroups: [
		{
			id: "lightweight-nano-probe",
			quotesByFactoryId: {
				"apex-trading": { multiplier: "2.00x", price: 28_160 },
				"apex-trading-lite": { multiplier: "2.00x", price: 28_160 },
				"greenleaf-factory": { multiplier: "2.00x", price: 30_860 },
				"meridian-corp": { multiplier: "2.00x", price: 29_100 },
				"nova-supply": { multiplier: "2.00x", price: 30_520 },
			},
			tierOneLabel: "Tier 1 (1,100)",
			tierTwoLabel: "Tier 2 (1,600)",
			title: "Lightweight Nano Probe",
			variants: [
				{
					id: "lightweight-nano-probe-glacier-01",
					productCode: "PRB-001-WHT",
					productName: "Glacier White",
					quotesByFactoryId: {
						"apex-trading": { multiplier: "2.00x", price: 18.5 },
						"apex-trading-lite": { multiplier: "2.00x", price: 18.5 },
						"greenleaf-factory": { multiplier: "2.00x", price: 18.5 },
						"meridian-corp": { multiplier: "2.00x", price: 18.5 },
						"nova-supply": { multiplier: "2.00x", price: 18 },
					},
					units: 400,
				},
				{
					id: "lightweight-nano-probe-glacier-02",
					productCode: "PRB-001-WHT",
					productName: "Glacier White",
					quotesByFactoryId: {
						"apex-trading": {
							deltaLabel: "41.5% • -33.5%",
							multiplier: "2.00x",
							price: 18.5,
						},
						"apex-trading-lite": {
							deltaLabel: "41.5% • -33.5%",
							multiplier: "2.00x",
							price: 19,
						},
						"greenleaf-factory": {
							deltaLabel: "41.5% • -33.5%",
							multiplier: "2.00x",
							price: 19.5,
						},
						"meridian-corp": {
							deltaLabel: "41.5% • -33.5%",
							multiplier: "2.00x",
							price: 19,
						},
						"nova-supply": {
							deltaLabel: "41.5% • -33.5%",
							multiplier: "2.00x",
							price: 19,
						},
					},
					units: 400,
				},
				{
					id: "lightweight-nano-probe-glacier-03",
					productCode: "PRB-001-WHT",
					productName: "Glacier White",
					quotesByFactoryId: {
						"apex-trading": {
							deltaLabel: "41.5% • -33.5%",
							multiplier: "2.00x",
							price: 19,
						},
						"apex-trading-lite": {
							deltaLabel: "41.5% • -33.5%",
							multiplier: "2.00x",
							price: 19.2,
						},
						"greenleaf-factory": {
							deltaLabel: "41.5% • -33.5%",
							multiplier: "2.00x",
							price: 19.7,
						},
						"meridian-corp": {
							deltaLabel: "41.5% • -33.5%",
							multiplier: "2.00x",
							price: 19.2,
						},
						"nova-supply": {
							deltaLabel: "41.5% • -33.5%",
							multiplier: "2.00x",
							price: 19.2,
						},
					},
					units: 400,
				},
			],
		},
		{
			id: "lightweight-nano-probe-2",
			quotesByFactoryId: {
				"apex-trading": { multiplier: "2.00x", price: 31_760 },
				"apex-trading-lite": { multiplier: "2.00x", price: 32_000 },
				"greenleaf-factory": { multiplier: "2.00x", price: 34_250 },
				"meridian-corp": { multiplier: "2.00x", price: 31_940 },
				"nova-supply": { multiplier: "2.00x", price: 33_120 },
			},
			tierOneLabel: "Tier 1 (1,500)",
			tierTwoLabel: "Tier 2 (2,400)",
			title: "Lightweight Nano Probe 2",
			variants: [
				{
					id: "lightweight-nano-probe-2-glacier-01",
					productCode: "PRB-002-WHT",
					productName: "Glacier White",
					quotesByFactoryId: {
						"apex-trading": { multiplier: "2.00x", price: 20.4 },
						"apex-trading-lite": { multiplier: "2.00x", price: 20.8 },
						"greenleaf-factory": { multiplier: "2.00x", price: 21.6 },
						"meridian-corp": { multiplier: "2.00x", price: 20.6 },
						"nova-supply": { multiplier: "2.00x", price: 20.9 },
					},
					units: 520,
				},
				{
					id: "lightweight-nano-probe-2-glacier-02",
					productCode: "PRB-002-WHT",
					productName: "Glacier White",
					quotesByFactoryId: {
						"apex-trading": {
							deltaLabel: "38.2% • -28.4%",
							multiplier: "2.00x",
							price: 22.1,
						},
						"apex-trading-lite": {
							deltaLabel: "38.2% • -28.4%",
							multiplier: "2.00x",
							price: 22.4,
						},
						"greenleaf-factory": {
							deltaLabel: "38.2% • -28.4%",
							multiplier: "2.00x",
							price: 23.2,
						},
						"meridian-corp": {
							deltaLabel: "38.2% • -28.4%",
							multiplier: "2.00x",
							price: 22.3,
						},
						"nova-supply": {
							deltaLabel: "38.2% • -28.4%",
							multiplier: "2.00x",
							price: 22.8,
						},
					},
					units: 520,
				},
			],
		},
	],
};
