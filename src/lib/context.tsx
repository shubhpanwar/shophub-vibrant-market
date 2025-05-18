import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, users, CartItem, Product, STORAGE_KEYS } from './data';
import { useToast } from '@/components/ui/use-toast';

interface AuthContextType {
  currentUser: User | null;
  isLoggedIn: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (name: string, email: string, password: string) => Promise<boolean>;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;
}

interface WishlistContextType {
  wishlist: Product[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: number) => void;
  isInWishlist: (productId: number) => boolean;
  wishlistCount: number;
}

const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  isLoggedIn: false,
  login: async () => false,
  logout: () => {},
  register: async () => false,
});

const CartContext = createContext<CartContextType>({
  cart: [],
  addToCart: () => {},
  removeFromCart: () => {},
  updateQuantity: () => {},
  clearCart: () => {},
  cartTotal: 0,
  cartCount: 0,
});

const WishlistContext = createContext<WishlistContextType>({
  wishlist: [],
  addToWishlist: () => {},
  removeFromWishlist: () => {},
  isInWishlist: () => false,
  wishlistCount: 0,
});

export const useAuth = () => useContext(AuthContext);
export const useCart = () => useContext(CartContext);
export const useWishlist = () => useContext(WishlistContext);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const { toast } = useToast();

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem(STORAGE_KEYS.USER);
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }

    const storedCart = localStorage.getItem(STORAGE_KEYS.CART);
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
    
    const storedWishlist = localStorage.getItem(STORAGE_KEYS.WISHLIST);
    if (storedWishlist) {
      setWishlist(JSON.parse(storedWishlist));
    }
  }, []);

  // Update localStorage when cart changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
  }, [cart]);
  
  // Update localStorage when wishlist changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.WISHLIST, JSON.stringify(wishlist));
  }, [wishlist]);

  // Authentication functions
  const login = async (email: string, password: string) => {
    // Simulate API call
    return new Promise<boolean>((resolve) => {
      setTimeout(() => {
        const user = users.find(u => u.email === email && u.password === password);
        if (user) {
          setCurrentUser(user);
          localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
          toast({
            title: "Login Successful",
            description: `Welcome back, ${user.name}!`,
          });
          resolve(true);
        } else {
          toast({
            title: "Login Failed",
            description: "Invalid email or password",
            variant: "destructive",
          });
          resolve(false);
        }
      }, 500);
    });
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem(STORAGE_KEYS.USER);
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
  };

  const register = async (name: string, email: string, password: string) => {
    // Simulate API call
    return new Promise<boolean>((resolve) => {
      setTimeout(() => {
        const userExists = users.some(u => u.email === email);
        if (userExists) {
          toast({
            title: "Registration Failed",
            description: "Email already exists",
            variant: "destructive",
          });
          resolve(false);
        } else {
          const newUser: User = {
            id: users.length + 1,
            name,
            email,
            password,
          };
          users.push(newUser);
          setCurrentUser(newUser);
          localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(newUser));
          toast({
            title: "Registration Successful",
            description: `Welcome to ShopHub, ${name}!`,
          });
          resolve(true);
        }
      }, 500);
    });
  };

  // Cart functions
  const addToCart = (product: Product, quantity: number = 1) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.product.id === product.id);
      
      if (existingItem) {
        return prevCart.map(item => 
          item.product.id === product.id 
            ? { ...item, quantity: item.quantity + quantity } 
            : item
        );
      } else {
        return [...prevCart, { product, quantity }];
      }
    });
    
    toast({
      title: "Added to Cart",
      description: `${product.name} added to your cart`,
    });
  };

  const removeFromCart = (productId: number) => {
    setCart(prevCart => prevCart.filter(item => item.product.id !== productId));
    toast({
      title: "Removed from Cart",
      description: "Item removed from your cart",
    });
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCart(prevCart => 
      prevCart.map(item => 
        item.product.id === productId 
          ? { ...item, quantity } 
          : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    toast({
      title: "Cart Cleared",
      description: "Your cart has been cleared",
    });
  };

  // Wishlist functions
  const addToWishlist = (product: Product) => {
    setWishlist(prevWishlist => {
      // Check if product is already in wishlist
      if (prevWishlist.some(item => item.id === product.id)) {
        return prevWishlist;
      }
      
      toast({
        title: "Added to Wishlist",
        description: `${product.name} added to your wishlist`,
      });
      
      return [...prevWishlist, product];
    });
  };

  const removeFromWishlist = (productId: number) => {
    setWishlist(prevWishlist => 
      prevWishlist.filter(item => item.id !== productId)
    );
    
    toast({
      title: "Removed from Wishlist",
      description: "Item removed from your wishlist",
    });
  };

  const isInWishlist = (productId: number) => {
    return wishlist.some(item => item.id === productId);
  };

  // Calculate cart totals
  const cartTotal = cart.reduce((total, item) => {
    const price = item.product.discount 
      ? item.product.price * (1 - item.product.discount / 100) 
      : item.product.price;
    return total + (price * item.quantity);
  }, 0);

  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);
  
  const wishlistCount = wishlist.length;

  // Auth context value
  const authValue: AuthContextType = {
    currentUser,
    isLoggedIn: !!currentUser,
    login,
    logout,
    register,
  };

  // Cart context value
  const cartValue: CartContextType = {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartTotal,
    cartCount,
  };
  
  // Wishlist context value
  const wishlistValue: WishlistContextType = {
    wishlist,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    wishlistCount,
  };

  return (
    <AuthContext.Provider value={authValue}>
      <CartContext.Provider value={cartValue}>
        <WishlistContext.Provider value={wishlistValue}>
          {children}
        </WishlistContext.Provider>
      </CartContext.Provider>
    </AuthContext.Provider>
  );
};
