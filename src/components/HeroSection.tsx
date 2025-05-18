
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <div className="relative bg-gradient-to-r from-blue-700 to-blue-500 text-white">
      <div className="container mx-auto px-4 py-12 md:py-20 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 mb-8 md:mb-0">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            Get the Best Deals on Your Favorite Products
          </h1>
          <p className="mt-4 text-lg md:text-xl text-blue-100">
            Explore thousands of products with incredible discounts and deals, only on ShopHub!
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link to="/products">
              <button className="px-6 py-3 bg-white text-blue-700 rounded-md font-semibold hover:bg-opacity-90 transition-colors">
                Shop Now
              </button>
            </Link>
            <Link to="/deals">
              <button className="px-6 py-3 bg-brand-orange text-white rounded-md font-semibold hover:bg-opacity-90 transition-colors flex items-center">
                Top Deals <ArrowRight className="ml-2 h-5 w-5" />
              </button>
            </Link>
          </div>
        </div>
        <div className="md:w-1/2 flex justify-center">
          <img 
            src="https://images.unsplash.com/photo-1607082350899-7e105aa886ae?auto=format&fit=crop&q=80&w=2940&ixlib=rb-4.0.3" 
            alt="Shopping" 
            className="w-full max-w-md rounded-lg shadow-lg animate-fade-in"
          />
        </div>
      </div>
      
      {/* Feature badges */}
      <div className="bg-white py-4">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="flex flex-col items-center text-gray-800">
              <span className="font-semibold">Free Shipping</span>
              <span className="text-xs text-gray-500">On orders above ₹500</span>
            </div>
            <div className="flex flex-col items-center text-gray-800">
              <span className="font-semibold">Secure Payment</span>
              <span className="text-xs text-gray-500">100% secure payment</span>
            </div>
            <div className="flex flex-col items-center text-gray-800">
              <span className="font-semibold">Easy Returns</span>
              <span className="text-xs text-gray-500">10 days return policy</span>
            </div>
            <div className="flex flex-col items-center text-gray-800">
              <span className="font-semibold">24/7 Support</span>
              <span className="text-xs text-gray-500">Customer service</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
