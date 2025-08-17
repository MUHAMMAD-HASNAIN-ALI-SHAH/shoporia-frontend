import { Button } from "@/components/ui/button";
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
import { useAdminStore } from "@/store/useAdminStore";

export function CompletedOrders() {
  const { orders } = useAdminStore();

  const filteredOrders = orders.filter((p) => p.status === "delivered");
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6">
      <h1 className="font-bold text-2xl mb-4">New Orders</h1>

      <div className="overflow-x-auto">
        <Table className="min-w-[600px]">
          <TableCaption className="text-sm text-gray-500">
            A list of all orders.
          </TableCaption>

          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Product Name</TableHead>
              <TableHead>Order Date</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {filteredOrders.map((order, index) => (
              <TableRow key={index}>
                <TableCell>{order.product._id}</TableCell>
                <TableCell>{order.product.name}</TableCell>
                <TableCell>
                  {new Date(order.createdAt).toLocaleString()}
                </TableCell>
                <TableCell className="flex justify-center gap-2 sm:gap-3">
                  <Button size="sm" variant="outline">
                    See Product Details
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>

          <TableFooter>
            <TableRow>
              <TableCell colSpan={5} className="font-semibold">
                Total Orders: {filteredOrders.length}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </div>
  );
}
