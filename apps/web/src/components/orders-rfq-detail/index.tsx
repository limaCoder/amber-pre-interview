"use client";

import { DetailHeader } from "./detail-header";
import { QuoteComparisonTable } from "./quote-comparison-table";
import { SelectedFactoryBanner } from "./selected-factory-banner";
import type { OrdersRfqDetailProps } from "./types";
import { useRfqDetail } from "./use-rfq-detail";

export default function OrdersRfqDetail({
	orderStatus,
	rfqCode,
}: OrdersRfqDetailProps) {
	const {
		costView,
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
	} = useRfqDetail(rfqCode);

	return (
		<div className="relative flex h-full min-h-0 w-full flex-col bg-background">
			<DetailHeader
				costView={costView}
				marginView={marginView}
				onCostViewChange={setCostView}
				onMarginViewChange={setMarginView}
				orderStatus={orderStatus}
				rfqCode={rfqCode}
			/>

			<QuoteComparisonTable
				hasSelectedFactory={Boolean(selectedFactory)}
				isFactoryHighlighted={isFactoryHighlighted}
				onHoverFactory={setHoveredFactoryId}
				onNegotiate={navigateToNegotiation}
				onSelectFactory={toggleFactorySelection}
				selectedFactoryId={selectedFactoryId}
			/>

			<SelectedFactoryBanner
				onClose={() => setSelectedFactoryId(null)}
				onNegotiate={navigateToNegotiation}
				selectedFactory={selectedFactory}
			/>
		</div>
	);
}
