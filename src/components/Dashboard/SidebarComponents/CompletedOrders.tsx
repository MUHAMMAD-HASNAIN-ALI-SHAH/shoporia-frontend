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

const orders = [
  {
    invoiceId: "INV001",
    userId: "USR123",
    productId: "PRD001",
    orderDate: "2025-05-01",
    deliveryDate: "2025-05-05",
  },
  {
    invoiceId: "INV002",
    userId: "USR456",
    productId: "PRD002",
    orderDate: "2025-05-02",
    deliveryDate: "2025-05-06",
  },
  {
    invoiceId: "INV003",
    userId: "USR789",
    productId: "PRD003",
    orderDate: "2025-05-03",
    deliveryDate: "2025-05-07",
  },
  {
    invoiceId: "INV004",
    userId: "USR321",
    productId: "PRD004",
    orderDate: "2025-05-04",
    deliveryDate: "2025-05-08",
  },
  {
    invoiceId: "INV005",
    userId: "USR654",
    productId: "PRD005",
    orderDate: "2025-05-05",
    deliveryDate: "2025-05-09",
  },
];

export function CompletedOrders() {
  return (
    <div className="px-5 py-3">
      <h1 className="font-bold text-2xl py-3">Completed Orders</h1>
      <Table>
        <TableCaption>A list of all completed product orders.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Invoice ID</TableHead>
            <TableHead>User ID</TableHead>
            <TableHead>Product ID</TableHead>
            <TableHead>Order Date</TableHead>
            <TableHead>Delivery Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.invoiceId}>
              <TableCell>{order.invoiceId}</TableCell>
              <TableCell>{order.userId}</TableCell>
              <TableCell>{order.productId}</TableCell>
              <TableCell>{order.orderDate}</TableCell>
              <TableCell>{order.deliveryDate}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={5}>Total Orders: {orders.length}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}
