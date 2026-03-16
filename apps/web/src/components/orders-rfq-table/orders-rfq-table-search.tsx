"use client";

import { Input } from "@amber-pre-interview/ui/components/input";
import { SearchIcon } from "lucide-react";

interface OrdersRfqTableSearchProps {
	"aria-label": string;
	onChange: (value: string) => void;
	placeholder?: string;
	value: string;
}

export function OrdersRfqTableSearch({
	"aria-label": ariaLabel,
	onChange,
	placeholder = "Search",
	value,
}: OrdersRfqTableSearchProps) {
	return (
		<div className="relative flex w-64 min-w-48 items-center">
			<SearchIcon className="pointer-events-none absolute top-1/2 left-2 size-3.5 -translate-y-1/2 text-muted-foreground" />
			<Input
				aria-label={ariaLabel}
				className="h-8 rounded-md border-border/80 pl-7 text-sm"
				onChange={(event) => onChange(event.target.value)}
				placeholder={placeholder}
				value={value}
			/>
		</div>
	);
}
