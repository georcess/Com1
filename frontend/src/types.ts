export interface MenuItem {
  id: string;
  name: string;
  category: 'milktea' | 'coffee' | 'fruit' | 'frappe' | 'hot' | 'snack';
  image: string;
  prices: {
    size: string;
    price: number;
  }[];
}

export interface CartAddon {
  name: string;
  price: number;
}

export interface CartItem {
  id: string;
  item: string;
  size: string;
  price: number;
  addons: CartAddon[];
}

export interface User {
  id: number;
  username: string;
  email: string;
  fullname: string;
  role: 'admin' | 'customer';
}

export interface Order {
  id: number;
  user_id?: number;
  customer_name: string;
  customer_username?: string;
  customer_email?: string;
  order_details: string;
  total_price: number;
  status?: string;
  order_date: string;
}
