import { AppSidebar } from "@/components/Dashboard/AppSidebar";
import Navbar from "@/components/Dashboard/Navbar";
import { AddProductForm } from "@/components/Dashboard/SidebarComponents/AddProductForm";
import AdminPerformancePage from "@/components/Dashboard/SidebarComponents/AdminPerformancePage";
import { CanceledOrders } from "@/components/Dashboard/SidebarComponents/CanceledOrders";
import { CompletedOrders } from "@/components/Dashboard/SidebarComponents/CompletedOrders";
import { NewOrders } from "@/components/Dashboard/SidebarComponents/NewOrders";
import { OrdersForShip } from "@/components/Dashboard/SidebarComponents/OrderForShip";
import { PlacedOrders } from "@/components/Dashboard/SidebarComponents/PlacedOrders";
import SeeProducts from "@/components/Dashboard/SidebarComponents/SeeProducts";
import { SidebarProvider } from "@/components/ui/sidebar";
import { useSidebarStore } from "@/store/useSidebar";
import { Logs } from "lucide-react";

const Dashboard = () => {
  const { sidebarItem } = useSidebarStore();
  return (
    <SidebarProvider className="flex min-h-screen w-full">
      {/* Sidebar stays fixed */}
      <AppSidebar />

      {/* Main content scrollable */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <Navbar />

        {/* Page content scrolls */}
        <div className="flex-1 overflow-y-auto">
          {sidebarItem === "dashboard-overview" && <AdminPerformancePage />}
          {sidebarItem === "add-product" && <AddProductForm />}
          {sidebarItem === "new-orders" && <NewOrders />}
          {sidebarItem === "shipped-orders" && <OrdersForShip />}
          {sidebarItem === "placed-orders" && <PlacedOrders />}
          {sidebarItem === "see-products" && <SeeProducts />}
          {sidebarItem === "completed-orders" && <CompletedOrders />}
          {sidebarItem === "canceled-orders" && <CanceledOrders />}
          {sidebarItem === "logs" && <Logs />}
        </div>
      </main>
    </SidebarProvider>
  );
};

export default Dashboard;
