import type { Route } from "next";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { detailTemplate } from "./constants";
import type { CostView, MarginView, UseRfqDetailReturn } from "./types";

export const useRfqDetail = (rfqCode: string): UseRfqDetailReturn => {
	const router = useRouter();
	const [costView, setCostView] = useState<CostView>("FOB");
	const [hoveredFactoryId, setHoveredFactoryId] = useState<string | null>(null);
	const [marginView, setMarginView] = useState<MarginView>("Markup");
	const [selectedFactoryId, setSelectedFactoryId] = useState<string | null>(
		null
	);

	const selectedFactory = useMemo(
		() => detailTemplate.factories.find((f) => f.id === selectedFactoryId),
		[selectedFactoryId]
	);

	const toggleFactorySelection = (factoryId: string) => {
		setSelectedFactoryId((current) =>
			current === factoryId ? null : factoryId
		);
	};

	const isFactoryHighlighted = (factoryId: string): boolean =>
		selectedFactoryId === factoryId || hoveredFactoryId === factoryId;

	const navigateToNegotiation = (factoryId: string): void => {
		router.push(
			`/dashboard/orders/${encodeURIComponent(rfqCode)}/negotiate/${encodeURIComponent(factoryId)}` as Route
		);
	};

	return {
		costView,
		hoveredFactoryId,
		isFactoryHighlighted,
		marginView,
		navigateToNegotiation,
		selectedFactory,
		selectedFactoryId,
		setCostView,
		setHoveredFactoryId,
		setMarginView,
		setSelectedFactoryId,
		toggleFactorySelection,
	};
};
