"use client";

import { OrdersRfqTableColumnsDropdown } from "./orders-rfq-table-columns-dropdown";
import { OrdersRfqTableFilterDropdown } from "./orders-rfq-table-filter-dropdown";
import { OrdersRfqTableGroupDropdown } from "./orders-rfq-table-group-dropdown";
import { OrdersRfqTableSearch } from "./orders-rfq-table-search";
import { OrdersRfqTableSortDropdown } from "./orders-rfq-table-sort-dropdown";
import type {
	ColumnKey,
	GroupField,
	OrderStatus,
	SortField,
	SortRule,
} from "./types";

interface OrdersRfqTableFiltersBarProps {
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

export function OrdersRfqTableFiltersBar({
	groupBy,
	groupedByCount,
	isColumnVisible,
	onClearFilters,
	onGroupByChange,
	onSearchChange,
	onSetSortField,
	onToggleColumn,
	onToggleDirection,
	onToggleStatus,
	searchQuery,
	selectedStatuses,
	sortRules,
	sortedByCount,
}: OrdersRfqTableFiltersBarProps) {
	return (
		<div className="flex flex-wrap items-center justify-between gap-2 border-b bg-background px-3 py-1.5">
			<div className="flex flex-wrap items-center gap-1.5">
				<span className="inline-flex h-6 items-center gap-1.5 rounded-md border border-violet-200 bg-violet-100/70 px-2 text-violet-700 text-xs">
					<span className="size-1.5 rounded-full bg-violet-500" />
					Grouped by {groupedByCount} fields
				</span>
				<span className="inline-flex h-6 items-center gap-1.5 rounded-md border border-sky-200 bg-sky-100/70 px-2 text-sky-700 text-xs">
					<span className="size-1.5 rounded-full bg-sky-500" />
					Sorted by {sortedByCount} fields
				</span>
			</div>

			<div className="flex flex-wrap items-center gap-0.5">
				<OrdersRfqTableSortDropdown
					onSetSortField={onSetSortField}
					onToggleDirection={onToggleDirection}
					sortRules={sortRules}
				/>
				<OrdersRfqTableColumnsDropdown
					isColumnVisible={isColumnVisible}
					onToggleColumn={onToggleColumn}
				/>
				<OrdersRfqTableGroupDropdown
					groupBy={groupBy}
					onGroupByChange={onGroupByChange}
				/>
				<OrdersRfqTableFilterDropdown
					onClearFilters={onClearFilters}
					onToggleStatus={onToggleStatus}
					selectedStatuses={selectedStatuses}
				/>
				<OrdersRfqTableSearch
					aria-label="Search RFQs"
					onChange={onSearchChange}
					placeholder="Search"
					value={searchQuery}
				/>
			</div>
		</div>
	);
}
