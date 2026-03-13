const WHITESPACE_REGEX = /\s+/;

export const getUserInitials = (fullName: string): string => {
	const words = fullName.trim().split(WHITESPACE_REGEX).filter(Boolean);

	if (words.length === 0) {
		return "U";
	}

	if (words.length === 1) {
		const firstTwoChars = Array.from(words[0]).slice(0, 2);
		return firstTwoChars.join("").toUpperCase();
	}

	const first = Array.from(words[0])[0] ?? "";
	const last = Array.from(words.at(-1) ?? "")[0] ?? "";
	return `${first}${last}`.toUpperCase();
};
