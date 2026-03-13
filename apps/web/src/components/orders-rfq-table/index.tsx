"use client";

import {
	Table,
	TableBody,
	TableHeader,
} from "@amber-pre-interview/ui/components/table";
import { Fragment, useMemo, useState } from "react";
import { ORDER_ROWS, STATUS_OPTIONS } from "./constants";
import { OrdersDataRow } from "./orders-data-row";
import { OrdersRfqTableFiltersBar } from "./orders-rfq-table-filters-bar";
import { OrdersRfqTableGroupHeader } from "./orders-rfq-table-group-header";
import { OrdersRfqTableHeader } from "./orders-rfq-table-header";
import { OrdersRfqTableToolbar } from "./orders-rfq-table-toolbar";
import type {
	ColumnKey,
	OrderRow,
	OrderStatus,
	OrdersViewState,
	RowView,
	SortField,
} from "./types";
import {
	buildGroups,
	collectParentByChildId,
	collectRowsById,
	filterRows,
	getChildrenIds,
	getGroupHeaderColSpan,
	getGroupVisibleItems,
	getHeaderSelectionState,
	getRowSelectionState,
	sortRows,
} from "./utils";

export default function OrdersRfqTable() {
	const [viewState, setViewState] = useState<OrdersViewState>({
		groupBy: "status",
		hiddenColumns: new Set<ColumnKey>(),
		searchQuery: "",
		selectedStatuses: new Set<OrderStatus>(STATUS_OPTIONS),
		selectedVisibleRowIds: new Set<string>(),
		sortRules: [
			{ direction: "asc", field: "dueDate", id: "primary" },
			{ direction: "asc", field: "rfqCode", id: "secondary" },
		],
	});
	const [expandedRowIds, setExpandedRowIds] = useState<Set<string>>(
		new Set(["rfq-274", "rfq-277"])
	);

	const rowsById = useMemo(() => collectRowsById(ORDER_ROWS), []);
	const parentByChildId = useMemo(() => collectParentByChildId(ORDER_ROWS), []);

	const filteredRows = useMemo(() => {
		return filterRows(
			ORDER_ROWS,
			viewState.searchQuery,
			viewState.selectedStatuses
		);
	}, [viewState.searchQuery, viewState.selectedStatuses]);

	const sortedRows = useMemo(() => {
		return sortRows(filteredRows, viewState.sortRules);
	}, [filteredRows, viewState.sortRules]);

	const groupedRows = useMemo(() => {
		return buildGroups(sortedRows, viewState.groupBy);
	}, [sortedRows, viewState.groupBy]);

	const visibleRows = useMemo((): RowView[] => {
		const rows: RowView[] = [];
		for (const group of groupedRows) {
			for (const item of group.items) {
				if (item.depth > 0) {
					const parentId = parentByChildId.get(item.id);
					const isExpandedParent = parentId
						? expandedRowIds.has(parentId)
						: false;
					if (!isExpandedParent) {
						continue;
					}
				}
				rows.push(item);
			}
		}
		return rows;
	}, [expandedRowIds, groupedRows, parentByChildId]);

	const visibleRowIds = useMemo(
		() => visibleRows.map((item) => item.id),
		[visibleRows]
	);

	const headerSelectionState = useMemo(
		() =>
			getHeaderSelectionState(visibleRowIds, viewState.selectedVisibleRowIds),
		[viewState.selectedVisibleRowIds, visibleRowIds]
	);

	const groupedByCount = viewState.groupBy === "none" ? 0 : 1;
	const sortedByCount = viewState.sortRules.length;

	const isColumnVisible = (column: ColumnKey): boolean => {
		return !viewState.hiddenColumns.has(column);
	};

	const toggleStatusFilter = (status: OrderStatus) => {
		setViewState((prev) => {
			const nextStatuses = new Set(prev.selectedStatuses);
			if (nextStatuses.has(status)) {
				nextStatuses.delete(status);
			} else {
				nextStatuses.add(status);
			}
			return {
				...prev,
				selectedStatuses: nextStatuses,
				selectedVisibleRowIds: new Set<string>(),
			};
		});
	};

	const toggleColumn = (column: ColumnKey) => {
		setViewState((prev) => {
			const nextHidden = new Set(prev.hiddenColumns);
			if (nextHidden.has(column)) {
				nextHidden.delete(column);
			} else {
				nextHidden.add(column);
			}
			return {
				...prev,
				hiddenColumns: nextHidden,
			};
		});
	};

	const setSortField = (id: string, field: SortField) => {
		setViewState((prev) => ({
			...prev,
			sortRules: prev.sortRules.map((rule) =>
				rule.id === id ? { ...rule, field } : rule
			),
		}));
	};

	const toggleSortDirection = (id: string) => {
		setViewState((prev) => ({
			...prev,
			sortRules: prev.sortRules.map((rule) => {
				if (rule.id !== id) {
					return rule;
				}
				return {
					...rule,
					direction: rule.direction === "asc" ? "desc" : "asc",
				};
			}),
		}));
	};

	const toggleExpand = (rowId: string) => {
		setExpandedRowIds((prev) => {
			const next = new Set(prev);
			if (next.has(rowId)) {
				next.delete(rowId);
			} else {
				next.add(rowId);
			}
			return next;
		});
	};

	const propagateParentSelection = (
		nextSelected: Set<string>,
		startParentId: string | undefined
	) => {
		let currentParentId = startParentId;

		while (currentParentId) {
			const parentRow = rowsById.get(currentParentId);
			if (!parentRow) {
				break;
			}

			const childIds = getChildrenIds(parentRow);
			let selectedChildren = 0;
			for (const childId of childIds) {
				if (nextSelected.has(childId)) {
					selectedChildren += 1;
				}
			}

			if (selectedChildren === 0) {
				nextSelected.delete(currentParentId);
			} else {
				nextSelected.add(currentParentId);
			}

			currentParentId = parentByChildId.get(currentParentId);
		}
	};

	const getAllRelatedIds = (row: OrderRow): string[] => {
		return [row.id, ...getChildrenIds(row)];
	};

	const toggleRowSelection = (row: OrderRow, shouldSelect: boolean) => {
		setViewState((prev) => {
			const nextSelected = new Set(prev.selectedVisibleRowIds);
			const relatedIds = getAllRelatedIds(row);

			for (const id of relatedIds) {
				if (shouldSelect) {
					nextSelected.add(id);
				} else {
					nextSelected.delete(id);
				}
			}

			propagateParentSelection(nextSelected, parentByChildId.get(row.id));

			return {
				...prev,
				selectedVisibleRowIds: nextSelected,
			};
		});
	};

	const toggleSelectAllVisible = (shouldSelect: boolean) => {
		setViewState((prev) => {
			const nextSelected = new Set(prev.selectedVisibleRowIds);
			for (const rowId of visibleRowIds) {
				if (shouldSelect) {
					nextSelected.add(rowId);
				} else {
					nextSelected.delete(rowId);
				}
			}
			return {
				...prev,
				selectedVisibleRowIds: nextSelected,
			};
		});
	};

	return (
		<div className="flex h-full w-full flex-col self-stretch rounded-xl border border-border/80 bg-background">
			<OrdersRfqTableToolbar />

			<OrdersRfqTableFiltersBar
				groupBy={viewState.groupBy}
				groupedByCount={groupedByCount}
				isColumnVisible={isColumnVisible}
				onClearFilters={() =>
					setViewState((prev) => ({
						...prev,
						selectedStatuses: new Set<OrderStatus>(STATUS_OPTIONS),
					}))
				}
				onGroupByChange={(groupBy) =>
					setViewState((prev) => ({ ...prev, groupBy }))
				}
				onSearchChange={(searchQuery) =>
					setViewState((prev) => ({ ...prev, searchQuery }))
				}
				onSetSortField={setSortField}
				onToggleColumn={toggleColumn}
				onToggleDirection={toggleSortDirection}
				onToggleStatus={toggleStatusFilter}
				searchQuery={viewState.searchQuery}
				selectedStatuses={viewState.selectedStatuses}
				sortedByCount={sortedByCount}
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
									{groupVisibleItems.map((item) => {
										const rowSelectionState = getRowSelectionState(
											item.row,
											viewState.selectedVisibleRowIds
										);

										return (
											<OrdersDataRow
												isColumnVisible={isColumnVisible}
												isExpanded={expandedRowIds.has(item.id)}
												item={item}
												key={item.id}
												onToggleExpand={toggleExpand}
												onToggleRowSelection={toggleRowSelection}
												rowSelectionState={rowSelectionState}
											/>
										);
									})}
								</Fragment>
							);
						})}
					</TableBody>
				</Table>
			</div>
		</div>
	);
}
