"use client";

import { Undo2Icon } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useMemo, useState } from "react";
import { negotiateTemplate } from "./constants";
import { NegotiationHeader } from "./negotiation-header";
import { ProductAccordionContent } from "./product-accordion-content";
import { ProductHeaderRow } from "./product-header-row";
import type { OrdersRfqNegotiateProps } from "./types";

export default function OrdersRfqNegotiate({
	factory,
	rfqCode,
}: OrdersRfqNegotiateProps) {
	const [openAccordionIds, setOpenAccordionIds] = useState<Set<string>>(
		() => new Set()
	);

	const yourTurnProductsCount = useMemo(() => {
		return negotiateTemplate.products.filter(
			(product) => product.status === "Your Turn"
		).length;
	}, []);

	const toggleAccordion = (productId: string) => {
		setOpenAccordionIds((currentIds) => {
			const nextIds = new Set(currentIds);
			if (nextIds.has(productId)) {
				nextIds.delete(productId);
			} else {
				nextIds.add(productId);
			}
			return nextIds;
		});
	};

	return (
		<div className="flex h-full min-h-0 w-full flex-col bg-background">
			<NegotiationHeader factory={factory} rfqCode={rfqCode} />

			<div className="min-h-0 flex-1 overflow-auto px-4 py-4">
				<div className="mb-3 flex items-center gap-3 border-b pb-2">
					<span className="inline-flex items-center gap-1 font-semibold text-cyan-700">
						<Undo2Icon className="size-3.5" />
						Your Turn
					</span>
					<span className="text-muted-foreground text-sm">
						{yourTurnProductsCount} products
					</span>
				</div>

				<div className="space-y-3 pb-4">
					{negotiateTemplate.products.map((product) => {
						const isOpen = openAccordionIds.has(product.id);
						return (
							<article
								className="overflow-hidden rounded-xl border"
								key={product.id}
							>
								<ProductHeaderRow
									isOpen={isOpen}
									onToggle={() => toggleAccordion(product.id)}
									product={product}
								/>
								<AnimatePresence initial={false}>
									{isOpen ? (
										<motion.div
											animate={{ height: "auto", opacity: 1 }}
											className="overflow-hidden"
											exit={{ height: 0, opacity: 0 }}
											initial={{ height: 0, opacity: 0 }}
											transition={{ duration: 0.22, ease: "easeInOut" }}
										>
											<ProductAccordionContent product={product} />
										</motion.div>
									) : null}
								</AnimatePresence>
							</article>
						);
					})}
				</div>
			</div>
		</div>
	);
}
