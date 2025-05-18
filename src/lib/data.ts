export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  rating: number;
  reviews: number;
  stock: number;
  discount?: number;
}

export interface Category {
  id: number;
  name: string;
  image: string;
}

export const products: Product[] = [
  {
    id: 1,
    name: "OnePlus Nord CE 3 Lite 5G",
    description: "8GB RAM, 128GB Storage, 108MP Camera, Pastel Lime",
    price: 19999,
    image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&q=80&w=2727&ixlib=rb-4.0.3",
    category: "Electronics",
    rating: 4.5,
    reviews: 2456,
    stock: 35,
    discount: 10
  },
  {
    id: 2,
    name: "HP Laptop 15s",
    description: "Intel Core i5-1235U, 16GB RAM, 512GB SSD, 15.6-inch FHD",
    price: 59990,
    image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&q=80&w=2940&ixlib=rb-4.0.3",
    category: "Electronics",
    rating: 4.3,
    reviews: 1850,
    stock: 20,
    discount: 15
  },
  {
    id: 3,
    name: "Men's Regular Fit Shirt",
    description: "Cotton Blend Full Sleeve Casual Shirt",
    price: 1299,
    image: "https://images.unsplash.com/photo-1620012253295-c15cc3e65df4?auto=format&fit=crop&q=80&w=2725&ixlib=rb-4.0.3",
    category: "Fashion",
    rating: 4.2,
    reviews: 3200,
    stock: 150,
    discount: 5
  },
  {
    id: 4,
    name: "Sony WH-1000XM5",
    description: "Wireless Noise Cancelling Headphones with Auto Noise Cancelling Optimizer, Black",
    price: 29990,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=2940&ixlib=rb-4.0.3",
    category: "Electronics",
    rating: 4.8,
    reviews: 1245,
    stock: 12,
    discount: 20
  },
  {
    id: 5,
    name: "Apple iPad 10th Generation",
    description: "10.9-inch, Wi-Fi, 64GB, Blue",
    price: 44900,
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&q=80&w=3103&ixlib=rb-4.0.3",
    category: "Electronics",
    rating: 4.6,
    reviews: 987,
    stock: 8
  },
  {
    id: 6,
    name: "Women's Cotton Kurti",
    description: "Floral Printed Straight Kurti for Women",
    price: 899,
    image: "https://images.unsplash.com/photo-1551232864-3f0890e580d9?auto=format&fit=crop&q=80&w=2787&ixlib=rb-4.0.3",
    category: "Fashion",
    rating: 4.1,
    reviews: 2410,
    stock: 230,
    discount: 12
  },
  {
    id: 7,
    name: "Prestige Electric Kettle",
    description: "1.5L Stainless Steel Electric Kettle with Auto Shut Off",
    price: 1499,
    image: "https://images.unsplash.com/photo-1594226590268-320ec511fea8?auto=format&fit=crop&q=80&w=2940&ixlib=rb-4.0.3",
    category: "Appliances",
    rating: 4.0,
    reviews: 5670,
    stock: 48,
    discount: 8
  },
  {
    id: 8,
    name: "American Tourister Trolley Bag",
    description: "55cm Hard Sided Cabin Luggage, Black",
    price: 3599,
    image: "https://images.unsplash.com/photo-1581605405669-fcdf81165afa?auto=format&fit=crop&q=80&w=2787&ixlib=rb-4.0.3",
    category: "Travel",
    rating: 4.4,
    reviews: 2310,
    stock: 15,
    discount: 18
  },
  {
    id: 9,
    name: "Milton Water Bottle",
    description: "1L Steel Water Bottle, Thermosteel Flask",
    price: 699,
    image: "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?auto=format&fit=crop&q=80&w=2671&ixlib=rb-4.0.3",
    category: "Home",
    rating: 4.2,
    reviews: 6750,
    stock: 85,
    discount: 5
  },
  {
    id: 10,
    name: "Boat Airdopes 141",
    description: "Bluetooth Truly Wireless Earbuds with 42H Playtime",
    price: 1399,
    image: "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?auto=format&fit=crop&q=80&w=2532&ixlib=rb-4.0.3",
    category: "Electronics",
    rating: 4.3,
    reviews: 9870,
    stock: 42,
    discount: 22
  }
];

export const categories: Category[] = [
  {
    id: 1,
    name: "Electronics",
    image: "https://images.unsplash.com/photo-1468495244123-6c6c332eeece?auto=format&fit=crop&q=80&w=2942&ixlib=rb-4.0.3"
  },
  {
    id: 2,
    name: "Fashion",
    image: "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&q=80&w=2788&ixlib=rb-4.0.3"
  },
  {
    id: 3,
    name: "Appliances",
    image: "https://images.unsplash.com/photo-1556911220-bda9f7f7d522?auto=format&fit=crop&q=80&w=2835&ixlib=rb-4.0.3"
  },
  {
    id: 4,
    name: "Home",
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=2938&ixlib=rb-4.0.3"
  },
  {
    id: 5,
    name: "Travel",
    image: "https://images.unsplash.com/photo-1499591934245-40b55745b905?auto=format&fit=crop&q=80&w=2952&ixlib=rb-4.0.3"
  }
];

// Mock user data for authentication
export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
}

export const users: User[] = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    password: "password123"
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    password: "password123"
  }
];

// Cart functionality
export interface CartItem {
  product: Product;
  quantity: number;
}

// Local storage keys
export const STORAGE_KEYS = {
  USER: 'shophub_user',
  CART: 'shophub_cart',
  WISHLIST: 'shophub_wishlist',
};
