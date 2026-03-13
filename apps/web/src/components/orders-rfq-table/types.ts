import type {
	OrderRow as DomainOrderRow,
	OrderStatus as DomainOrderStatus,
	Supplier as DomainSupplier,
} from "@/data/orders-domain";

export type OrderRow = DomainOrderRow;
export type OrderStatus = DomainOrderStatus;
export type Supplier = DomainSupplier;

export type ColumnKey =
	| "rfqCode"
	| "status"
	| "startDate"
	| "dueDate"
	| "suppliers"
	| "totalCost";

export type SortField =
	| "rfqCode"
	| "status"
	| "startDate"
	| "dueDate"
	| "suppliers"
	| "totalCost";

export type SortDirection = "asc" | "desc";

export interface SortRule {
	direction: SortDirection;
	field: SortField;
	id: string;
}

export type GroupField = "none" | "status" | "dueMonth" | "supplierCount";

export interface OrdersViewState {
	groupBy: GroupField;
	hiddenColumns: Set<ColumnKey>;
	searchQuery: string;
	selectedStatuses: Set<OrderStatus>;
	selectedVisibleRowIds: Set<string>;
	sortRules: SortRule[];
}

export interface RowView {
	depth: number;
	hasChildren: boolean;
	id: string;
	isParent: boolean;
	row: OrderRow;
}

export interface GroupView {
	items: RowView[];
	key: string;
	label: string;
}

export interface OrdersDataRowProps {
	isColumnVisible: (column: ColumnKey) => boolean;
	isExpanded: boolean;
	item: RowView;
	onToggleExpand: (rowId: string) => void;
	onToggleRowSelection: (row: OrderRow, shouldSelect: boolean) => void;
	rowSelectionState: "checked" | "indeterminate" | "unchecked";
}
