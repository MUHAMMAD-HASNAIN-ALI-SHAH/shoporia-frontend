"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import {
  Plus,
  Package,
  ListOrdered,
  CheckCircle,
  XCircle,
  FileText,
  ShoppingBag,
} from "lucide-react";
import { useSidebarStore } from "@/store/useSidebar";

export function AppSidebar() {
  const { setSidebar, sidebarItem } = useSidebarStore();

  return (
    <Sidebar className="h-screen border-r shadow-sm">
      {/* Header */}
      <SidebarHeader className="p-4 border-b">
        <h1 className="text-xl font-bold">Admin Panel</h1>
      </SidebarHeader>

      {/* Main Content */}
      <SidebarContent className="flex flex-col gap-4 p-4">
        <SidebarGroup className="flex flex-col gap-3">
          <Button
            onClick={() => setSidebar("dashboard-overview")}
            variant={`${
              sidebarItem === "dashboard-overview" ? "default" : "ghost"
            }`}
            className="w-full justify-start gap-2"
          >
            <ShoppingBag className="w-4 h-4" />
            Dashboard Overview
          </Button>
        </SidebarGroup>

        <SidebarGroup className="flex flex-col gap-3">
          <Button
            onClick={() => setSidebar("add-product")}
            variant={`${sidebarItem === "add-product" ? "default" : "ghost"}`}
            className="w-full justify-start gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Product
          </Button>
          <Button
            onClick={() => setSidebar("new-orders")}
            variant={`${sidebarItem === "new-orders" ? "default" : "ghost"}`}
            className="w-full justify-start gap-2"
          >
            <ListOrdered className="w-4 h-4" />
            New Orders
          </Button>
          <Button
            onClick={() => setSidebar("shipped-orders")}
            variant={`${sidebarItem === "shipped-orders" ? "default" : "ghost"}`}
            className="w-full justify-start gap-2"
          >
            <ListOrdered className="w-4 h-4" />
            Shipped Orders
          </Button>
          <Button
            onClick={() => setSidebar("placed-orders")}
            variant={`${sidebarItem === "placed-orders" ? "default" : "ghost"}`}
            className="w-full justify-start gap-2"
          >
            <ListOrdered className="w-4 h-4" />
            Placed Orders
          </Button>
          <Button
            onClick={() => setSidebar("see-products")}
            variant={`${sidebarItem === "see-products" ? "default" : "ghost"}`}
            className="w-full justify-start gap-2"
          >
            <Package className="w-4 h-4" />
            See Products
          </Button>
        </SidebarGroup>

        <SidebarGroup className="flex flex-col gap-3">
          <Button
            onClick={() => setSidebar("completed-orders")}
            variant={`${
              sidebarItem === "completed-orders" ? "default" : "ghost"
            }`}
            className="w-full justify-start gap-2"
          >
            <CheckCircle className="w-4 h-4" />
            Completed Orders
          </Button>
          <Button
            onClick={() => setSidebar("canceled-orders")}
            variant={`${
              sidebarItem === "canceled-orders" ? "default" : "ghost"
            }`}
            className="w-full justify-start gap-2"
          >
            <XCircle className="w-4 h-4" />
            Canceled Orders
          </Button>
        </SidebarGroup>

        <SidebarGroup className="flex flex-col gap-3">
          <Button
            onClick={() => setSidebar("logs")}
            variant={`${sidebarItem === "logs" ? "default" : "ghost"}`}
            className="w-full justify-start gap-2"
          >
            <FileText className="w-4 h-4" />
            Logs
          </Button>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer */}
      <SidebarFooter className="p-4 border-t text-sm text-muted-foreground">
        &copy; 2025 Admin Panel
      </SidebarFooter>
    </Sidebar>
  );
}
