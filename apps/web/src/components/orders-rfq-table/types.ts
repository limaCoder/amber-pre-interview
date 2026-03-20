import type {
	OrderRow as DomainOrderRow,
	OrderStatus as DomainOrderStatus,
	Supplier as DomainSupplier,
} from "@/models/orders-domain";

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

export interface OrdersRfqTableColumnsDropdownProps {
	isColumnVisible: (column: ColumnKey) => boolean;
	onToggleColumn: (column: ColumnKey) => void;
}

export interface OrdersRfqTableFilterDropdownProps {
	onClearFilters: () => void;
	onToggleStatus: (status: OrderStatus) => void;
	selectedStatuses: Set<OrderStatus>;
}

export interface OrdersRfqTableFiltersBarProps {
	groupBy: GroupField;
	groupedByCount: number;
	isColumnVisible: (column: ColumnKey) => boolean;
	onClearFilters: () => void;
	onGroupByChange: (groupBy: GroupField) => void;
	onSearchChange: (value: string) => void;
	onSetSortField: (id: string, field: SortField) => void;
	onToggleColumn: (column: ColumnKey) => void;
	onToggleDirection: (id: string) => void;
	onToggleStatus: (status: OrderStatus) => void;
	searchQuery: string;
	selectedStatuses: Set<OrderStatus>;
	sortedByCount: number;
	sortRules: SortRule[];
}

export interface OrdersRfqTableGroupDropdownProps {
	groupBy: GroupField;
	onGroupByChange: (groupBy: GroupField) => void;
}

export interface OrdersRfqTableGroupHeaderProps {
	colSpan: number;
	label: string;
	rootItemCount: number;
}

export interface OrdersRfqTableHeaderProps {
	headerSelectionState: "checked" | "indeterminate" | "unchecked";
	isColumnVisible: (column: ColumnKey) => boolean;
	onToggleSelectAll: (shouldSelect: boolean) => void;
}

export interface OrdersRfqTableSearchProps {
	"aria-label": string;
	onChange: (value: string) => void;
	placeholder?: string;
	value: string;
}

export interface OrdersRfqTableSortDropdownProps {
	onSetSortField: (id: string, field: SortField) => void;
	onToggleDirection: (id: string) => void;
	sortRules: SortRule[];
}

export interface SuppliersCellProps {
	suppliers: Supplier[];
}

export interface UseOrdersRfqTableReturn {
	clearFilters: () => void;
	expandedRowIds: Set<string>;
	groupedRows: GroupView[];
	headerSelectionState: "checked" | "indeterminate" | "unchecked";
	isColumnVisible: (column: ColumnKey) => boolean;
	parentByChildId: Map<string, string | undefined>;
	setGroupBy: (groupBy: GroupField) => void;
	setSearchQuery: (value: string) => void;
	setSortField: (id: string, field: SortField) => void;
	toggleColumn: (column: ColumnKey) => void;
	toggleExpand: (rowId: string) => void;
	toggleRowSelection: (row: OrderRow, shouldSelect: boolean) => void;
	toggleSelectAllVisible: (shouldSelect: boolean) => void;
	toggleSortDirection: (id: string) => void;
	toggleStatusFilter: (status: OrderStatus) => void;
	viewState: OrdersViewState;
}

export interface RowCellContentProps {
	columnKey: string;
	isExpanded: boolean;
	item: RowView;
	leftPadding: string;
	onToggleExpand: (id: string) => void;
}
