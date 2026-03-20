export const moneyFormatter = new Intl.NumberFormat("en-US", {
	currency: "USD",
	style: "currency",
});

export const formatCurrency = (value: number | null): string => {
	if (value === null) {
		return "-";
	}

	return moneyFormatter.format(value);
};
