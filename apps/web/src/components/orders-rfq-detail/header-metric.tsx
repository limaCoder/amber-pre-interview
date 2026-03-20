import type { HeaderMetricProps } from "./types";

export const HeaderMetric = ({ label, value }: HeaderMetricProps) => {
	return (
		<div className="flex min-w-[120px] flex-col border-l pl-4">
			<span className="text-[10px] text-muted-foreground uppercase">
				{label}
			</span>
			<span className="mt-1 font-semibold text-foreground text-sm">
				{value}
			</span>
		</div>
	);
};
