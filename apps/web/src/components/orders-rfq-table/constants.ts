import type { OrderStatus } from "@/models/orders-domain";

export const STATUS_COLORS: Record<OrderStatus, string> = {
	Draft: "border-border bg-muted text-muted-foreground",
	Requested: "border-sky-200 bg-sky-100 text-sky-700",
	"In Progress": "border-amber-200 bg-amber-100 text-amber-700",
	Completed: "border-emerald-200 bg-emerald-100 text-emerald-700",
	"Your Turn": "border-yellow-200 bg-yellow-100 text-yellow-700",
	"Awaiting Supplier": "border-cyan-200 bg-cyan-100 text-cyan-700",
	Awarded: "border-green-200 bg-green-100 text-green-700",
	Ordered: "border-violet-200 bg-violet-100 text-violet-700",
	Cancelled: "border-zinc-200 bg-zinc-100 text-zinc-700",
	Paused: "border-indigo-200 bg-indigo-100 text-indigo-700",
};

export const SORT_OPTIONS = [
	{ field: "rfqCode" as const, label: "RFQ Code" },
	{ field: "status" as const, label: "Status" },
	{ field: "startDate" as const, label: "Start Date" },
	{ field: "dueDate" as const, label: "Due Date" },
	{ field: "suppliers" as const, label: "Suppliers" },
	{ field: "totalCost" as const, label: "Total Cost" },
];

export const COLUMN_OPTIONS = [
	{ key: "rfqCode" as const, label: "RFQ Code", headerClassName: "min-w-44" },
	{ key: "status" as const, label: "Status", headerClassName: "min-w-40" },
	{
		key: "startDate" as const,
		label: "Start Date",
		headerClassName: "min-w-32",
	},
	{ key: "dueDate" as const, label: "Due Date", headerClassName: "min-w-32" },
	{
		key: "suppliers" as const,
		label: "Suppliers",
		headerClassName: "min-w-72",
	},
	{
		key: "totalCost" as const,
		label: "Total Cost",
		headerLabel: "$ Total Cost",
		headerClassName: "min-w-32",
	},
] as const;

export const VIEW_TABS = [
	"Table view 01",
	"Table view 05",
	"Table view 02",
	"Table view 03",
	"Table view 04",
	"More view created +9",
] as const;
