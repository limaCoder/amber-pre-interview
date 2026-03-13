import { STATUS_OPTIONS } from "./constants";
import type {
	ColumnKey,
	GroupField,
	GroupView,
	OrderRow,
	OrderStatus,
	RowView,
	SortField,
	SortRule,
} from "./types";

const dateFormatter = new Intl.DateTimeFormat("en-US", {
	day: "numeric",
	month: "short",
	year: "numeric",
});

const currencyFormatter = new Intl.NumberFormat("en-US", {
	currency: "USD",
	style: "currency",
});

export const parseDate = (value: string): number => {
	return new Date(`${value}T00:00:00.000Z`).getTime();
};

export const toMonthLabel = (dateIso: string): string => {
	return new Intl.DateTimeFormat("en-US", {
		month: "long",
		year: "numeric",
	}).format(new Date(`${dateIso}T00:00:00.000Z`));
};

const statusSortRank = (status: OrderStatus): number => {
	return STATUS_OPTIONS.indexOf(status);
};

const getComparableValue = (
	row: OrderRow,
	field: SortField
): number | string => {
	if (field === "rfqCode") {
		return row.rfqCode;
	}
	if (field === "status") {
		return statusSortRank(row.status);
	}
	if (field === "startDate") {
		return parseDate(row.startDate);
	}
	if (field === "dueDate") {
		return parseDate(row.dueDate);
	}
	if (field === "suppliers") {
		return row.suppliers[0]?.name ?? "";
	}
	return row.totalCost ?? Number.NEGATIVE_INFINITY;
};

const compareRowsByRules = (
	left: OrderRow,
	right: OrderRow,
	rules: SortRule[]
): number => {
	for (const rule of rules) {
		const leftValue = getComparableValue(left, rule.field);
		const rightValue = getComparableValue(right, rule.field);

		if (leftValue < rightValue) {
			return rule.direction === "asc" ? -1 : 1;
		}

		if (leftValue > rightValue) {
			return rule.direction === "asc" ? 1 : -1;
		}
	}

	return left.rfqCode.localeCompare(right.rfqCode);
};

const normalize = (value: string): string => value.trim().toLowerCase();

const matchesSearch = (row: OrderRow, searchQuery: string): boolean => {
	if (searchQuery.length === 0) {
		return true;
	}

	const query = normalize(searchQuery);
	const supplierNames = row.suppliers
		.map((supplier) => normalize(supplier.name))
		.join(" ");
	return (
		normalize(row.rfqCode).includes(query) ||
		normalize(row.status).includes(query) ||
		supplierNames.includes(query)
	);
};

export const filterRows = (
	rows: OrderRow[],
	searchQuery: string,
	selectedStatuses: Set<OrderStatus>
): OrderRow[] => {
	const result: OrderRow[] = [];
	for (const row of rows) {
		const filteredChildren = filterRows(
			row.children ?? [],
			searchQuery,
			selectedStatuses
		);
		const statusMatch = selectedStatuses.has(row.status);
		const searchMatch = matchesSearch(row, searchQuery);
		const includeRow =
			(statusMatch && searchMatch) || filteredChildren.length > 0;

		if (!includeRow) {
			continue;
		}

		const { children: _children, ...rest } = row;
		result.push({
			...rest,
			...(filteredChildren.length > 0 ? { children: filteredChildren } : {}),
		});
	}
	return result;
};

export const sortRows = (rows: OrderRow[], rules: SortRule[]): OrderRow[] => {
	const sorted = [...rows].sort((left, right) =>
		compareRowsByRules(left, right, rules)
	);
	return sorted.map((row) => ({
		...row,
		children: row.children ? sortRows(row.children, rules) : undefined,
	}));
};

const getGroupKey = (row: OrderRow, groupBy: GroupField): string => {
	if (groupBy === "status") {
		return row.status;
	}

	if (groupBy === "dueMonth") {
		return toMonthLabel(row.dueDate);
	}

	return row.suppliers.length > 1 ? "Multiple Suppliers" : "Single Supplier";
};

export const flattenRows = (rows: OrderRow[], depth = 0): RowView[] => {
	const items: RowView[] = [];
	for (const row of rows) {
		const hasChildren = (row.children?.length ?? 0) > 0;
		items.push({
			depth,
			hasChildren,
			id: row.id,
			isParent: hasChildren,
			row,
		});
		if (hasChildren) {
			items.push(...flattenRows(row.children ?? [], depth + 1));
		}
	}
	return items;
};

export const buildGroups = (
	rows: OrderRow[],
	groupBy: GroupField
): GroupView[] => {
	if (groupBy === "none") {
		return [{ items: flattenRows(rows), key: "all", label: "All RFQs" }];
	}

	const groupedMap = new Map<string, OrderRow[]>();

	for (const row of rows) {
		const key = getGroupKey(row, groupBy);

		const list = groupedMap.get(key) ?? [];
		list.push(row);
		groupedMap.set(key, list);
	}

	return Array.from(groupedMap.entries())
		.sort(([left], [right]) => left.localeCompare(right))
		.map(([key, groupRows]) => ({
			items: flattenRows(groupRows),
			key,
			label: key,
		}));
};

export const formatDate = (value: string): string => {
	return dateFormatter.format(new Date(`${value}T00:00:00.000Z`));
};

export const formatCurrency = (value: number | null): string => {
	if (value === null) {
		return "—";
	}

	return currencyFormatter.format(value);
};

export const getChildrenIds = (row: OrderRow): string[] => {
	return (
		row.children?.flatMap((child) => [child.id, ...getChildrenIds(child)]) ?? []
	);
};

export const collectRowsById = (rows: OrderRow[]): Map<string, OrderRow> => {
	const map = new Map<string, OrderRow>();

	const walk = (items: OrderRow[]) => {
		for (const item of items) {
			map.set(item.id, item);
			if (item.children) {
				walk(item.children);
			}
		}
	};

	walk(rows);
	return map;
};

export const collectParentByChildId = (
	rows: OrderRow[],
	parentId?: string
): Map<string, string | undefined> => {
	const map = new Map<string, string | undefined>();

	const walk = (items: OrderRow[], directParent?: string) => {
		for (const item of items) {
			map.set(item.id, directParent);
			if (item.children) {
				walk(item.children, item.id);
			}
		}
	};

	walk(rows, parentId);
	return map;
};

export const getAllRelatedIds = (row: OrderRow): string[] => {
	return [row.id, ...getChildrenIds(row)];
};

export const getHeaderSelectionState = (
	allVisibleIds: string[],
	selectedIds: Set<string>
): "checked" | "indeterminate" | "unchecked" => {
	if (allVisibleIds.length === 0) {
		return "unchecked";
	}

	let selectedCount = 0;
	for (const id of allVisibleIds) {
		if (selectedIds.has(id)) {
			selectedCount += 1;
		}
	}

	if (selectedCount === 0) {
		return "unchecked";
	}

	if (selectedCount === allVisibleIds.length) {
		return "checked";
	}

	return "indeterminate";
};

export const getRowSelectionState = (
	row: OrderRow,
	selectedIds: Set<string>
): "checked" | "indeterminate" | "unchecked" => {
	if (!row.children || row.children.length === 0) {
		return selectedIds.has(row.id) ? "checked" : "unchecked";
	}

	const relatedChildrenIds = getChildrenIds(row);
	if (relatedChildrenIds.length === 0) {
		return selectedIds.has(row.id) ? "checked" : "unchecked";
	}

	let selectedCount = 0;
	for (const childId of relatedChildrenIds) {
		if (selectedIds.has(childId)) {
			selectedCount += 1;
		}
	}

	if (selectedCount === 0) {
		return selectedIds.has(row.id) ? "checked" : "unchecked";
	}

	if (selectedCount === relatedChildrenIds.length) {
		return "checked";
	}

	return "indeterminate";
};

export const getGroupVisibleItems = (
	group: GroupView,
	parentByChildId: Map<string, string | undefined>,
	expandedRowIds: Set<string>
): RowView[] => {
	return group.items.filter((item) => {
		if (item.depth === 0) {
			return true;
		}

		const parentId = parentByChildId.get(item.id);
		return parentId ? expandedRowIds.has(parentId) : false;
	});
};

export const getGroupHeaderColSpan = (
	isColumnVisible: (column: ColumnKey) => boolean
): number => {
	return (
		2 +
		Number(isColumnVisible("rfqCode")) +
		Number(isColumnVisible("status")) +
		Number(isColumnVisible("startDate")) +
		Number(isColumnVisible("dueDate")) +
		Number(isColumnVisible("suppliers")) +
		Number(isColumnVisible("totalCost"))
	);
};
