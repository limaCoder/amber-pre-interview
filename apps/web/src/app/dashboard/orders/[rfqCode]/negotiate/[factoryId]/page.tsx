import { notFound } from "next/navigation";
import OrdersRfqNegotiate from "@/components/orders-rfq-negotiate";
import { getOrderByRfqCode } from "@/data/orders-domain";
import { getRfqNegotiateFactoryById } from "@/data/rfq-negotiate-template";

export default async function DashboardOrderNegotiatePage({
	params,
}: {
	params: Promise<{ factoryId: string; rfqCode: string }>;
}) {
	const { factoryId, rfqCode } = await params;
	const decodedRfqCode = decodeURIComponent(rfqCode);
	const decodedFactoryId = decodeURIComponent(factoryId);

	const order = getOrderByRfqCode(decodedRfqCode);
	const factory = getRfqNegotiateFactoryById(decodedFactoryId);

	if (!(order && factory)) {
		notFound();
	}

	return (
		<div className="flex h-full w-full self-stretch">
			<OrdersRfqNegotiate factory={factory} rfqCode={order.rfqCode} />
		</div>
	);
}
