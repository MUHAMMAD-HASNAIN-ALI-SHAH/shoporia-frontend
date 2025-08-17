export interface Product {
  _id?: string;
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  images: string[];
  ratingsAverage?: number;
  ratingsCount?: number;
  status: "active" | "inactive";
}

export interface Order {
  _id?: string;
  cartId: string;
  product: Product;
  quantity: number;
  createdAt: string;
  status: "pending" | "placed" | "canceled" | "shipped" | "delivered";
}

export interface User {
  _id?: string;
  email: string;
  username?: string;
  role?: string;
}

export interface Cart {
  _id: string;
  product: Product;
  quantity: number;
  status: string;
  items?: Order[];
}
