"use client";

import {
	Table,
	TableBody,
	TableHeader,
} from "@amber-pre-interview/ui/components/table";
import { Fragment } from "react";
import { OrdersDataRow } from "./orders-data-row";
import { OrdersRfqTableFiltersBar } from "./orders-rfq-table-filters-bar";
import { OrdersRfqTableGroupHeader } from "./orders-rfq-table-group-header";
import { OrdersRfqTableHeader } from "./orders-rfq-table-header";
import { OrdersRfqTableToolbar } from "./orders-rfq-table-toolbar";
import { useOrdersRfqTable } from "./use-orders-rfq-table";
import {
	getGroupHeaderColSpan,
	getGroupVisibleItems,
	getRowSelectionState,
} from "./utils";

export default function OrdersRfqTable() {
	const {
		clearFilters,
		expandedRowIds,
		groupedRows,
		headerSelectionState,
		isColumnVisible,
		parentByChildId,
		setGroupBy,
		setSearchQuery,
		setSortField,
		toggleColumn,
		toggleExpand,
		toggleRowSelection,
		toggleSelectAllVisible,
		toggleSortDirection,
		toggleStatusFilter,
		viewState,
	} = useOrdersRfqTable();

	return (
		<div className="flex h-full w-full flex-col self-stretch rounded-xl border border-border/80 bg-background">
			<OrdersRfqTableToolbar />

			<OrdersRfqTableFiltersBar
				groupBy={viewState.groupBy}
				groupedByCount={viewState.groupBy === "none" ? 0 : 1}
				isColumnVisible={isColumnVisible}
				onClearFilters={clearFilters}
				onGroupByChange={setGroupBy}
				onSearchChange={setSearchQuery}
				onSetSortField={setSortField}
				onToggleColumn={toggleColumn}
				onToggleDirection={toggleSortDirection}
				onToggleStatus={toggleStatusFilter}
				searchQuery={viewState.searchQuery}
				selectedStatuses={viewState.selectedStatuses}
				sortedByCount={viewState.sortRules.length}
				sortRules={viewState.sortRules}
			/>

			<div className="flex-1 overflow-auto">
				<Table className="text-sm">
					<TableHeader>
						<OrdersRfqTableHeader
							headerSelectionState={headerSelectionState}
							isColumnVisible={isColumnVisible}
							onToggleSelectAll={toggleSelectAllVisible}
						/>
					</TableHeader>
					<TableBody>
						{groupedRows.map((group) => {
							const groupVisibleItems = getGroupVisibleItems(
								group,
								parentByChildId,
								expandedRowIds
							);
							const rootItemCount = groupVisibleItems.filter(
								(item) => item.depth === 0
							).length;

							return (
								<Fragment key={group.key}>
									{viewState.groupBy !== "none" ? (
										<OrdersRfqTableGroupHeader
											colSpan={getGroupHeaderColSpan(isColumnVisible)}
											label={group.label}
											rootItemCount={rootItemCount}
										/>
									) : null}
									{groupVisibleItems.map((item) => (
										<OrdersDataRow
											isColumnVisible={isColumnVisible}
											isExpanded={expandedRowIds.has(item.id)}
											item={item}
											key={item.id}
											onToggleExpand={toggleExpand}
											onToggleRowSelection={toggleRowSelection}
											rowSelectionState={getRowSelectionState(
												item.row,
												viewState.selectedVisibleRowIds
											)}
										/>
									))}
								</Fragment>
							);
						})}
					</TableBody>
				</Table>
			</div>
		</div>
	);
}
