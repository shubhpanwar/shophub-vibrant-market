
import { products } from '@/lib/data';
import ProductCard from './ProductCard';

const FeaturedProducts = () => {
  // Get products with discount for featured section
  const featuredProducts = products
    .filter(product => product.discount)
    .sort((a, b) => (b.discount || 0) - (a.discount || 0))
    .slice(0, 4);

  return (
    <section className="py-10">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold">Top Deals</h2>
          <a href="/products" className="text-brand-blue hover:underline">View All</a>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {featuredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
