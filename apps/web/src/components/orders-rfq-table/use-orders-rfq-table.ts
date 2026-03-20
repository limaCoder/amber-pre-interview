import { useMemo, useState } from "react";
import { ORDER_ROWS, STATUS_OPTIONS } from "@/data/orders-domain";
import type {
	ColumnKey,
	GroupField,
	OrderRow,
	OrderStatus,
	OrdersViewState,
	RowView,
	SortField,
	UseOrdersRfqTableReturn,
} from "./types";
import {
	buildGroups,
	collectParentByChildId,
	collectRowsById,
	filterRows,
	getChildrenIds,
	getHeaderSelectionState,
	sortRows,
} from "./utils";

export const useOrdersRfqTable = (): UseOrdersRfqTableReturn => {
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

	const filteredRows = useMemo(
		() =>
			filterRows(ORDER_ROWS, viewState.searchQuery, viewState.selectedStatuses),
		[viewState.searchQuery, viewState.selectedStatuses]
	);

	const sortedRows = useMemo(
		() => sortRows(filteredRows, viewState.sortRules),
		[filteredRows, viewState.sortRules]
	);

	const groupedRows = useMemo(
		() => buildGroups(sortedRows, viewState.groupBy),
		[sortedRows, viewState.groupBy]
	);

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

	const isColumnVisible = (column: ColumnKey): boolean =>
		!viewState.hiddenColumns.has(column);

	const clearFilters = () => {
		setViewState((prev) => ({
			...prev,
			selectedStatuses: new Set<OrderStatus>(STATUS_OPTIONS),
		}));
	};

	const setGroupBy = (groupBy: GroupField) => {
		setViewState((prev) => ({ ...prev, groupBy }));
	};

	const setSearchQuery = (searchQuery: string) => {
		setViewState((prev) => ({ ...prev, searchQuery }));
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
			return { ...prev, hiddenColumns: nextHidden };
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

	const toggleRowSelection = (row: OrderRow, shouldSelect: boolean) => {
		setViewState((prev) => {
			const nextSelected = new Set(prev.selectedVisibleRowIds);
			const relatedIds = [row.id, ...getChildrenIds(row)];

			for (const id of relatedIds) {
				if (shouldSelect) {
					nextSelected.add(id);
				} else {
					nextSelected.delete(id);
				}
			}

			propagateParentSelection(nextSelected, parentByChildId.get(row.id));

			return { ...prev, selectedVisibleRowIds: nextSelected };
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
			return { ...prev, selectedVisibleRowIds: nextSelected };
		});
	};

	return {
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
	};
};
