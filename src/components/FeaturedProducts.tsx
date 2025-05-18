
import { useState } from 'react';
import { products } from '@/lib/data';
import ProductCard from './ProductCard';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight, Percent, Star, Tag, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const FeaturedProducts = () => {
  const [activeTab, setActiveTab] = useState("discounted");

  // Products categorized for different tabs
  const discountedProducts = products
    .filter(product => product.discount)
    .sort((a, b) => (b.discount || 0) - (a.discount || 0))
    .slice(0, 4);
    
  const bestRatedProducts = products
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 4);
    
  const trendingProducts = products
    .sort((a, b) => b.reviews - a.reviews)
    .slice(0, 4);
    
  const newArrivals = [...products].slice(-4);

  return (
    <section className="py-10 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold">Top Deals</h2>
            <p className="text-gray-600 mt-1">Exclusive offers on popular products</p>
          </div>
          <Link to="/products">
            <Button variant="outline" className="flex items-center gap-2">
              View All
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
        
        <Tabs defaultValue="discounted" value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="grid grid-cols-4 max-w-md">
            <TabsTrigger value="discounted" className="flex items-center gap-1">
              <Percent className="h-4 w-4" /> Deals
            </TabsTrigger>
            <TabsTrigger value="trending" className="flex items-center gap-1">
              <TrendingUp className="h-4 w-4" /> Trending
            </TabsTrigger>
            <TabsTrigger value="topRated" className="flex items-center gap-1">
              <Star className="h-4 w-4" /> Top Rated
            </TabsTrigger>
            <TabsTrigger value="new" className="flex items-center gap-1">
              <Tag className="h-4 w-4" /> New
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="discounted" className="mt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {discountedProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="trending" className="mt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {trendingProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="topRated" className="mt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {bestRatedProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="new" className="mt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {newArrivals.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
        
        {/* Featured Deal Banner */}
        <div className="mt-10 bg-brand-blue rounded-lg overflow-hidden shadow-lg">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-3/5 p-8 md:p-10 text-white">
              <div className="bg-white/20 inline-block px-3 py-1 rounded-full text-sm font-medium mb-4">
                Limited Time Offer
              </div>
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                Special Deal of the Week
              </h3>
              <p className="mb-6 text-blue-100">
                Get our best-selling Sony WH-1000XM5 Headphones at 20% off. Premium sound quality and industry-leading noise cancellation.
              </p>
              <div className="flex gap-4">
                <Link to="/product/4">
                  <Button className="bg-white text-brand-blue hover:bg-blue-50">
                    Shop Now
                  </Button>
                </Link>
              </div>
            </div>
            <div className="md:w-2/5 bg-blue-700 flex items-center justify-center p-8">
              <img 
                src={products.find(p => p.id === 4)?.image} 
                alt="Deal of the Week" 
                className="max-h-60 object-contain transform hover:scale-105 transition-transform"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
