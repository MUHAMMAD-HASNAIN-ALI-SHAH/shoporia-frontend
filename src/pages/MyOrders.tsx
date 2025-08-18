import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Footer from "@/components/Home/Footer/Footer";
import Navbar from "@/components/Home/Navbar/Navbar";
import { useEffect } from "react";
import { useOrderStore } from "@/store/useOrderStore";

export function MyOrders() {
  const { getMyOrders, myOrders, isLoading } = useOrderStore();

  useEffect(() => {
    getMyOrders();
  }, [getMyOrders]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="w-full mt-24">
      <Navbar />
      <div className="max-w-[1200px] mx-auto py-24 px-4">
        <h1 className="font-bold text-2xl py-3">My Orders</h1>

        {myOrders && myOrders.length > 0 ? (
          myOrders.map((orderGroup) => (
            <div
              key={orderGroup.cartId}
              className="mb-8 border rounded-lg overflow-hidden"
            >
              {/* Order Header */}
              <div className="bg-gray-100 px-4 flex flex-col md:flex-row py-2 font-semibold justify-between">
                <span>Cart ID: {orderGroup.cartId}</span>
                <span>
                  Order Date: {new Date(orderGroup.createdAt).toLocaleString()}
                </span>
                <span>Payment Status: {orderGroup.paymentStatus}</span>
              </div>

              <Table>
                <TableCaption>Items in this order</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product Image</TableHead>
                    <TableHead>Product Name</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead className="text-center">
                      Delivery Status
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orderGroup.items.map((item, idx: number) => (
                    <TableRow key={`${item._id}-${idx}`}>
                      <TableCell>
                        <img
                          src={
                            Array.isArray(item.product.images)
                              ? item.product.images[0]
                              : item.product.images
                          }
                          alt={item.product.name}
                          className="w-16 h-16 object-cover rounded-md"
                        />
                      </TableCell>
                      <TableCell>{item.product.name}</TableCell>
                      <TableCell>${item.product.price}</TableCell>
                      <TableCell className="text-center">
                        {item.status || "No status available"}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ))
        ) : (
          <p>No orders found.</p>
        )}
      </div>
      <Footer />
    </div>
  );
}
