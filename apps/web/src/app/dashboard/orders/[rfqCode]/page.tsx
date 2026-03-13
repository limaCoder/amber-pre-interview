import { notFound } from "next/navigation";
import OrdersRfqDetail from "@/components/orders-rfq-detail";
import { getOrderByRfqCode } from "@/data/orders-domain";

export default async function DashboardOrderDetailPage({
	params,
}: {
	params: Promise<{ rfqCode: string }>;
}) {
	const { rfqCode } = await params;
	const decodedRfqCode = decodeURIComponent(rfqCode);
	const order = getOrderByRfqCode(decodedRfqCode);

	if (!order) {
		notFound();
	}

	return (
		<div className="flex h-full w-full self-stretch">
			<OrdersRfqDetail orderStatus={order.status} rfqCode={order.rfqCode} />
		</div>
	);
}
