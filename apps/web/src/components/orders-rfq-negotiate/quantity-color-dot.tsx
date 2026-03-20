import { cn } from "@amber-pre-interview/ui/lib/utils";
import type { QuantityColorDotProps } from "./types";

export const QuantityColorDot = ({ index }: QuantityColorDotProps) => {
	const colors = [
		"bg-slate-800",
		"bg-sky-500",
		"bg-emerald-500",
		"bg-rose-200",
	];

	return (
		<span
			className={cn("size-2.5 rounded-full", colors[index] ?? "bg-zinc-300")}
		/>
	);
};
