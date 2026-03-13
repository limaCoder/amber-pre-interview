export type OrderStatus =
	| "Draft"
	| "Requested"
	| "In Progress"
	| "Completed"
	| "Your Turn"
	| "Awaiting Supplier"
	| "Awarded"
	| "Ordered"
	| "Cancelled"
	| "Paused";

export interface Supplier {
	flag: string;
	id: string;
	name: string;
}

export interface OrderRow {
	children?: OrderRow[];
	dueDate: string;
	id: string;
	rfqCode: string;
	startDate: string;
	status: OrderStatus;
	suppliers: Supplier[];
	totalCost: number | null;
}

export const ORDER_ROWS: OrderRow[] = [
	{
		dueDate: "2026-03-15",
		id: "rfq-272",
		rfqCode: "RFQ-2026-272",
		startDate: "2026-02-20",
		status: "Draft",
		suppliers: [
			{ flag: "🇺🇸", id: "apex", name: "Apex Furnishings Co." },
			{ flag: "🇨🇦", id: "global", name: "Global Comfort Ltd." },
			{ flag: "🇮🇹", id: "italia", name: "Linea Italia Studio" },
		],
		totalCost: 0,
	},
	{
		dueDate: "2026-03-22",
		id: "rfq-273",
		rfqCode: "RFQ-2026-273",
		startDate: "2026-02-25",
		status: "Requested",
		suppliers: [
			{ flag: "🇸🇪", id: "nordic", name: "Nordic Wood Works" },
			{ flag: "🇺🇸", id: "craftline", name: "Craftline Industries" },
			{ flag: "🇯🇵", id: "takumi", name: "Takumi Craft Labs" },
		],
		totalCost: 0,
	},
	{
		dueDate: "2026-04-12",
		id: "rfq-276",
		rfqCode: "RFQ-2026-276",
		startDate: "2026-03-10",
		status: "Requested",
		suppliers: [
			{ flag: "🇺🇸", id: "woodcraft", name: "WoodCraft Designs" },
			{ flag: "🇩🇪", id: "storagemax", name: "StorageMax Co." },
		],
		totalCost: 0,
	},
	{
		children: [
			{
				dueDate: "2026-02-28",
				id: "rfq-274-01",
				rfqCode: "RFQ-2026-274-01",
				startDate: "2026-01-15",
				status: "Completed",
				suppliers: [
					{ flag: "🇨🇳", id: "brightpath", name: "BrightPath Lighting" },
				],
				totalCost: 15_600,
			},
			{
				dueDate: "2026-02-25",
				id: "rfq-274-02",
				rfqCode: "RFQ-2026-274-02",
				startDate: "2026-01-18",
				status: "Your Turn",
				suppliers: [{ flag: "🇰🇷", id: "lumina", name: "Lumina Design Co." }],
				totalCost: 7800,
			},
			{
				dueDate: "2026-02-20",
				id: "rfq-274-03",
				rfqCode: "RFQ-2026-274-03",
				startDate: "2026-01-20",
				status: "Awaiting Supplier",
				suppliers: [{ flag: "🇹🇭", id: "volt", name: "Volt Manufacturing" }],
				totalCost: null,
			},
		],
		dueDate: "2026-02-28",
		id: "rfq-274",
		rfqCode: "RFQ-2026-274",
		startDate: "2026-01-15",
		status: "In Progress",
		suppliers: [
			{ flag: "🇨🇳", id: "brightpath", name: "BrightPath Lighting" },
			{ flag: "🇰🇷", id: "lumina", name: "Lumina Design Co." },
			{ flag: "🇹🇭", id: "volt", name: "Volt Manufacturing" },
		],
		totalCost: 23_400,
	},
	{
		dueDate: "2026-04-05",
		id: "rfq-275",
		rfqCode: "RFQ-2026-275",
		startDate: "2026-02-10",
		status: "In Progress",
		suppliers: [
			{ flag: "🇩🇪", id: "ergotech", name: "ErgoTech Seating" },
			{ flag: "🇺🇸", id: "comfortpro", name: "ComfortPro Inc." },
			{ flag: "🇪🇸", id: "madera", name: "Madera Forma SA" },
			{ flag: "🇫🇷", id: "atelier", name: "Atelier Loft Paris" },
		],
		totalCost: 38_750,
	},
	{
		children: [
			{
				dueDate: "2026-03-01",
				id: "rfq-277-01",
				rfqCode: "RFQ-2026-277-01",
				startDate: "2026-01-05",
				status: "Ordered",
				suppliers: [
					{ flag: "🇨🇳", id: "brightpath", name: "BrightPath Lighting" },
				],
				totalCost: 22_400,
			},
			{
				dueDate: "2026-02-28",
				id: "rfq-277-02",
				rfqCode: "RFQ-2026-277-02",
				startDate: "2026-01-08",
				status: "Cancelled",
				suppliers: [{ flag: "🇯🇵", id: "arclight", name: "ArcLight Studios" }],
				totalCost: 18_300,
			},
			{
				dueDate: "2026-02-25",
				id: "rfq-277-03",
				rfqCode: "RFQ-2026-277-03",
				startDate: "2026-01-06",
				status: "Cancelled",
				suppliers: [{ flag: "🇰🇷", id: "lumina", name: "Lumina Design Co." }],
				totalCost: 14_500,
			},
			{
				dueDate: "2026-03-02",
				id: "rfq-277-04",
				rfqCode: "RFQ-2026-277-04",
				startDate: "2026-01-10",
				status: "Cancelled",
				suppliers: [{ flag: "🇹🇭", id: "volt", name: "Volt Manufacturing" }],
				totalCost: 12_000,
			},
		],
		dueDate: "2026-03-01",
		id: "rfq-277",
		rfqCode: "RFQ-2026-277",
		startDate: "2026-01-05",
		status: "Awarded",
		suppliers: [
			{ flag: "🇨🇳", id: "brightpath", name: "BrightPath Lighting" },
			{ flag: "🇯🇵", id: "arclight", name: "ArcLight Studios" },
			{ flag: "🇰🇷", id: "lumina", name: "Lumina Design Co." },
		],
		totalCost: 67_200,
	},
	{
		dueDate: "2026-04-20",
		id: "rfq-279",
		rfqCode: "RFQ-2026-279",
		startDate: "2026-03-01",
		status: "Paused",
		suppliers: [
			{ flag: "🇮🇳", id: "softtouch", name: "SoftTouch Textiles" },
			{ flag: "🇵🇹", id: "cozyhome", name: "CozyHome Fabrics" },
		],
		totalCost: 8900,
	},
	{
		dueDate: "2026-02-10",
		id: "rfq-278",
		rfqCode: "RFQ-2026-278",
		startDate: "2026-01-10",
		status: "Cancelled",
		suppliers: [
			{ flag: "🇺🇸", id: "timepiece", name: "TimePiece Global" },
			{ flag: "🇮🇹", id: "decorcraft", name: "DecorCraft Ltd." },
		],
		totalCost: 0,
	},
];

export const STATUS_OPTIONS = Array.from(
	new Set(
		ORDER_ROWS.flatMap((row) => [
			row.status,
			...(row.children?.map((child) => child.status) ?? []),
		])
	)
) as OrderStatus[];

const findByRfqCode = (
	rows: OrderRow[],
	rfqCode: string
): OrderRow | undefined => {
	for (const row of rows) {
		if (row.rfqCode === rfqCode) {
			return row;
		}
		const foundChild = row.children
			? findByRfqCode(row.children, rfqCode)
			: undefined;
		if (foundChild) {
			return foundChild;
		}
	}
	return undefined;
};

export const getOrderByRfqCode = (rfqCode: string): OrderRow | undefined => {
	return findByRfqCode(ORDER_ROWS, rfqCode);
};
