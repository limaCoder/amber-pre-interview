import { moneyFormatter } from "@/utils/currency";

export const iconButtonClassName =
	"inline-flex size-7 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground";

export const formatPerUnit = (value: number): string => {
	return moneyFormatter.format(value);
};

export const getLowestFactoryId = (
	quotesByFactoryId: Record<string, { price: number }>
): string => {
	let lowestFactoryId = "";
	let lowestValue = Number.POSITIVE_INFINITY;

	for (const [factoryId, quote] of Object.entries(quotesByFactoryId)) {
		if (quote.price < lowestValue) {
			lowestValue = quote.price;
			lowestFactoryId = factoryId;
		}
	}

	return lowestFactoryId;
};
