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
