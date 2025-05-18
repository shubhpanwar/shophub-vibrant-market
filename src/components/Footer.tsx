
import { Link } from 'react-router-dom';
import { ShoppingCart, Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-200">
      {/* Main footer content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <Link to="/" className="flex items-center mb-4">
              <ShoppingCart className="h-6 w-6 mr-2 text-brand-orange" />
              <span className="font-poppins font-bold text-xl text-white">ShopHub</span>
            </Link>
            <p className="text-sm text-gray-400 mb-4">
              Your one-stop destination for all your shopping needs with amazing deals and discounts.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white transition-colors">Contact Us</Link>
              </li>
              <li>
                <Link to="/products" className="text-gray-400 hover:text-white transition-colors">All Products</Link>
              </li>
              <li>
                <Link to="/deals" className="text-gray-400 hover:text-white transition-colors">Today's Deals</Link>
              </li>
              <li>
                <Link to="/track-order" className="text-gray-400 hover:text-white transition-colors">Track Your Order</Link>
              </li>
            </ul>
          </div>
          
          {/* Customer Service */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/shipping-policy" className="text-gray-400 hover:text-white transition-colors">Shipping Policy</Link>
              </li>
              <li>
                <Link to="/returns" className="text-gray-400 hover:text-white transition-colors">Returns & Refunds</Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-400 hover:text-white transition-colors">FAQ</Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-400 hover:text-white transition-colors">Terms & Conditions</Link>
              </li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-2 mt-1 text-brand-orange" />
                <span className="text-gray-400">123 Shopping Street, Mumbai, Maharashtra, India - 400001</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-2 text-brand-orange" />
                <span className="text-gray-400">+91 1234567890</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-2 text-brand-orange" />
                <span className="text-gray-400">contact@shophub.com</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* Bottom footer */}
      <div className="bg-gray-900">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-gray-400 mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} ShopHub. All rights reserved.
            </div>
            <div className="flex items-center">
              <span className="text-sm text-gray-400 mr-4">We Accept:</span>
              <div className="flex space-x-2">
                <div className="bg-white h-6 w-10 rounded"></div>
                <div className="bg-white h-6 w-10 rounded"></div>
                <div className="bg-white h-6 w-10 rounded"></div>
                <div className="bg-white h-6 w-10 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
