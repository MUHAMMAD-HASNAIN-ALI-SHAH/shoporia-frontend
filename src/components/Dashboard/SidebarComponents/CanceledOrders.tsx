import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

const canceledOrders = [
  {
    invoiceId: "INV101",
    userId: "USR111",
    productId: "PRD101",
    orderDate: "2025-05-01",
    cancelDate: "2025-05-02",
    reason: "Customer requested cancellation",
  },
  {
    invoiceId: "INV102",
    userId: "USR222",
    productId: "PRD102",
    orderDate: "2025-05-03",
    cancelDate: "2025-05-04",
    reason: "Out of stock",
  },
  {
    invoiceId: "INV103",
    userId: "USR333",
    productId: "PRD103",
    orderDate: "2025-05-05",
    cancelDate: "2025-05-06",
    reason: "Payment failure",
  },
];

export function CanceledOrders() {
  return (
    <div className="px-5 py-3">
      <h1 className="font-bold text-2xl py-3">Canceled Orders</h1>
    <Table>
      <TableCaption>A list of all canceled product orders.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Invoice ID</TableHead>
          <TableHead>User ID</TableHead>
          <TableHead>Product ID</TableHead>
          <TableHead>Order Date</TableHead>
          <TableHead>Cancel Date</TableHead>
          <TableHead className="text-center">Reason</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {canceledOrders.map((order) => (
          <TableRow key={order.invoiceId}>
            <TableCell>{order.invoiceId}</TableCell>
            <TableCell>{order.userId}</TableCell>
            <TableCell>{order.productId}</TableCell>
            <TableCell>{order.orderDate}</TableCell>
            <TableCell>{order.cancelDate}</TableCell>
            <TableCell className="flex justify-center">
              <Button
                variant="outline"
                size="sm"
                onClick={() => alert(`Reason: ${order.reason}`)}
              >
                Reason
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={6}>Total Canceled Orders: {canceledOrders.length}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
    </div>
  );
}
