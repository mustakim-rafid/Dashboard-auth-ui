export interface User {
  id: number;
  name: string;
  email: string;
  status: "active" | "inactive";
  joinDate: string;
}

export interface Analytics {
  date: string;
  views: number;
  clicks: number;
  conversions: number;
}

export interface Product {
  id: number;
  name: string;
  price: number;
  sales: number;
  category: "subscription" | "addon";
}

export interface DashboardData {
  overview: {
    totalUsers: number;
    activeUsers: number;
    revenue: number;
    growth: number;
  };
  users: User[];
  analytics: Analytics[];
  products: Product[];
}
