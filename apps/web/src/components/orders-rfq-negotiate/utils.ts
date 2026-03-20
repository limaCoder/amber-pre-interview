export const iconButtonClassName =
	"inline-flex size-8 items-center justify-center rounded-md border border-border bg-background text-muted-foreground transition-colors hover:bg-muted hover:text-foreground";

export const formatMultiplier = (index: number): string => {
	if (index === 0) {
		return "2.80x";
	}

	if (index === 1) {
		return "2.90x";
	}

	if (index === 2) {
		return "2.94x";
	}

	return "3.45x";
};
