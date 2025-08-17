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
import { useAdminStore } from "@/store/useAdminStore";
import { useEffect } from "react";

export function NewOrders() {
  const { orders, getAllOrders } = useAdminStore();

  useEffect(() => {
    getAllOrders();
  }, [getAllOrders]);

  const filteredOrders = orders.filter((p) => p.status === "pending");
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
              <TableHead>Cart ID</TableHead>
              <TableHead>Product Name</TableHead>
              <TableHead>Order Date</TableHead>
              <TableHead className="text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {filteredOrders.map((order, index) => (
              <TableRow key={index}>
                <TableCell>{order.cartId}</TableCell>
                <TableCell>{order.product.name}</TableCell>
                <TableCell>
                  {new Date(order.createdAt).toLocaleString()}
                </TableCell>
                <TableCell className="flex justify-center gap-2 sm:gap-3">
                  <Button size="sm" variant="outline">
                    Placed
                  </Button>
                  <Button variant="destructive" size="sm">
                    Canceled
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>

          <TableFooter>
            <TableRow>
              <TableCell colSpan={5} className="font-semibold">
                Total Orders: {orders.length}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </div>
  );
}
