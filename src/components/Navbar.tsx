
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Search, Menu, X, ShoppingCart, User, Heart, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth, useCart } from '@/lib/context';
import CartIcon from './CartIcon';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isLoggedIn, currentUser, logout } = useAuth();
  const { cartCount } = useCart();

  return (
    <nav className="bg-brand-blue text-white sticky top-0 z-50 shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <ShoppingCart className="h-6 w-6 mr-2" />
              <span className="font-poppins font-bold text-xl">ShopHub</span>
            </Link>
          </div>

          {/* Search bar - visible on medium and larger screens */}
          <div className="hidden md:block flex-grow max-w-md mx-8">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search products, brands, and more..." 
                className="w-full py-2 px-4 pr-10 rounded-md text-gray-800 outline-none focus:ring-2 focus:ring-brand-yellow"
              />
              <button className="absolute right-0 top-0 h-full px-3 text-gray-500 flex items-center">
                <Search className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {isLoggedIn ? (
              <>
                <div className="group relative">
                  <Button variant="ghost" className="text-white flex items-center hover:bg-blue-700">
                    <User className="h-5 w-5 mr-1" />
                    <span className="hidden lg:inline">{currentUser?.name}</span>
                  </Button>
                  <div className="absolute right-0 w-48 py-2 mt-2 bg-white rounded-md shadow-xl z-20 hidden group-hover:block">
                    <Link to="/profile" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">My Profile</Link>
                    <Link to="/orders" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">My Orders</Link>
                    <Link to="/wishlist" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Wishlist</Link>
                    <button
                      onClick={logout}
                      className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <Link to="/login">
                <Button variant="ghost" className="text-white flex items-center hover:bg-blue-700">
                  <LogIn className="h-5 w-5 mr-1" />
                  <span>Login</span>
                </Button>
              </Link>
            )}
            <Link to="/wishlist">
              <Button variant="ghost" className="text-white flex items-center hover:bg-blue-700">
                <Heart className="h-5 w-5" />
                <span className="hidden lg:inline ml-1">Wishlist</span>
              </Button>
            </Link>
            <Link to="/cart" className="relative">
              <CartIcon count={cartCount} />
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white hover:text-gray-200 focus:outline-none"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile search - visible on small screens */}
      <div className="md:hidden px-4 pb-3">
        <div className="relative">
          <input 
            type="text" 
            placeholder="Search products..." 
            className="w-full py-2 px-4 pr-10 rounded-md text-gray-800 outline-none focus:ring-2 focus:ring-brand-yellow"
          />
          <button className="absolute right-0 top-0 h-full px-3 text-gray-500 flex items-center">
            <Search className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Mobile navigation menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-blue-800 px-4 py-2">
          <div className="flex flex-col space-y-2">
            <Link 
              to="/" 
              className="text-white block py-2 px-3 rounded-md hover:bg-blue-700"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/products" 
              className="text-white block py-2 px-3 rounded-md hover:bg-blue-700"
              onClick={() => setIsMenuOpen(false)}
            >
              All Products
            </Link>
            {isLoggedIn ? (
              <>
                <Link 
                  to="/profile" 
                  className="text-white block py-2 px-3 rounded-md hover:bg-blue-700"
                  onClick={() => setIsMenuOpen(false)}
                >
                  My Profile
                </Link>
                <Link 
                  to="/orders" 
                  className="text-white block py-2 px-3 rounded-md hover:bg-blue-700"
                  onClick={() => setIsMenuOpen(false)}
                >
                  My Orders
                </Link>
                <Link 
                  to="/wishlist" 
                  className="text-white block py-2 px-3 rounded-md hover:bg-blue-700"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Wishlist
                </Link>
                <button
                  onClick={() => {
                    logout();
                    setIsMenuOpen(false);
                  }}
                  className="text-white text-left w-full py-2 px-3 rounded-md hover:bg-blue-700"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link 
                to="/login" 
                className="text-white block py-2 px-3 rounded-md hover:bg-blue-700"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
            )}
            <Link 
              to="/cart" 
              className="text-white flex items-center py-2 px-3 rounded-md hover:bg-blue-700"
              onClick={() => setIsMenuOpen(false)}
            >
              <ShoppingCart className="h-5 w-5 mr-2" />
              <span>Cart ({cartCount})</span>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
