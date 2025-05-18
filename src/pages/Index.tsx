
import HeroSection from '@/components/HeroSection';
import CategorySection from '@/components/CategorySection';
import FeaturedProducts from '@/components/FeaturedProducts';
import { products } from '@/lib/data';
import ProductCard from '@/components/ProductCard';

const Index = () => {
  // Get recently added products (using the last 4 products)
  const recentProducts = [...products].slice(-4);

  return (
    <div className="min-h-screen">
      <HeroSection />
      
      <CategorySection />
      
      <FeaturedProducts />
      
      {/* Recent Products Section */}
      <section className="py-10 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold">Recent Products</h2>
            <a href="/products" className="text-brand-blue hover:underline">View All</a>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {recentProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Promo Banner */}
      <section className="py-10">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-brand-blue to-blue-700 rounded-xl overflow-hidden shadow-lg">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 p-8 md:p-12">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  Summer Sale is On!
                </h2>
                <p className="text-blue-100 mb-6">
                  Get up to 50% off on all summer essentials. Limited time offer!
                </p>
                <a 
                  href="/products" 
                  className="inline-block bg-white text-brand-blue font-semibold px-6 py-3 rounded-md hover:bg-opacity-90 transition-colors"
                >
                  Shop Now
                </a>
              </div>
              <div className="md:w-1/2">
                <img 
                  src="https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3" 
                  alt="Summer Sale"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
