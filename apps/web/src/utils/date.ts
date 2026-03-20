export const dateFormatter = new Intl.DateTimeFormat("en-US", {
	day: "numeric",
	month: "short",
	year: "numeric",
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

export const formatDate = (value: string): string => {
	return dateFormatter.format(new Date(`${value}T00:00:00.000Z`));
};
