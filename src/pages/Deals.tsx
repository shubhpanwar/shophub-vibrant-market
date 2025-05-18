
import { useState } from 'react';
import { products } from '@/lib/data';
import ProductCard from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Check, Filter, SlidersHorizontal, Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const Deals = () => {
  const [priceRange, setPriceRange] = useState([0, 60000]);
  const [discountFilter, setDiscountFilter] = useState(0);
  const [categoryFilter, setCategoryFilter] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  // Get products with discounts
  const discountedProducts = products
    .filter(product => product.discount && product.discount >= discountFilter)
    .filter(product => 
      (priceRange[0] === 0 && priceRange[1] === 60000) || 
      (product.price >= priceRange[0] && product.price <= priceRange[1])
    )
    .filter(product => 
      categoryFilter.length === 0 || 
      categoryFilter.includes(product.category)
    );

  // Get all categories from products
  const categories = [...new Set(products.map(product => product.category))];

  const handleCategoryToggle = (category: string) => {
    setCategoryFilter(prev => 
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const clearFilters = () => {
    setPriceRange([0, 60000]);
    setDiscountFilter(0);
    setCategoryFilter([]);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Top Deals</h1>
          <p className="text-gray-600 mt-1">Best offers and discounts on popular products</p>
        </div>
        <Button 
          variant="outline" 
          className="mt-4 md:mt-0 flex items-center"
          onClick={() => setShowFilters(!showFilters)}
        >
          <Filter className="h-4 w-4 mr-2" />
          Filters
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filters */}
        <div className={`lg:block ${showFilters ? 'block' : 'hidden'}`}>
          <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold flex items-center">
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                Filters
              </h2>
              <Button variant="ghost" size="sm" onClick={clearFilters}>
                Clear All
              </Button>
            </div>

            {/* Price Range Filter */}
            <div className="mb-6">
              <h3 className="text-md font-medium mb-3">Price Range</h3>
              <Slider
                defaultValue={[0, 60000]}
                min={0}
                max={60000}
                step={1000}
                value={priceRange}
                onValueChange={(value) => setPriceRange(value as [number, number])}
              />
              <div className="flex justify-between mt-2 text-sm">
                <span>₹{priceRange[0].toLocaleString()}</span>
                <span>₹{priceRange[1].toLocaleString()}</span>
              </div>
            </div>

            {/* Discount Filter */}
            <div className="mb-6">
              <h3 className="text-md font-medium mb-3">Discount</h3>
              <div className="space-y-2">
                {[0, 5, 10, 15, 20].map((discount) => (
                  <div key={discount} className="flex items-center">
                    <Button
                      variant={discountFilter === discount ? "default" : "outline"}
                      size="sm"
                      className={`w-full justify-start ${
                        discountFilter === discount ? 'bg-brand-blue' : ''
                      }`}
                      onClick={() => setDiscountFilter(discount)}
                    >
                      {discount > 0 ? `${discount}% or more` : 'Any discount'}
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            {/* Category Filter */}
            <div>
              <h3 className="text-md font-medium mb-3">Categories</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <div key={category} className="flex items-center">
                    <Button
                      variant={categoryFilter.includes(category) ? "default" : "outline"}
                      size="sm"
                      className={`w-full justify-start ${
                        categoryFilter.includes(category) ? 'bg-brand-blue' : ''
                      }`}
                      onClick={() => handleCategoryToggle(category)}
                    >
                      {categoryFilter.includes(category) && (
                        <Check className="h-4 w-4 mr-2" />
                      )}
                      {category}
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="lg:col-span-3">
          {/* Active Filters */}
          {(discountFilter > 0 || categoryFilter.length > 0 || priceRange[0] > 0 || priceRange[1] < 60000) && (
            <div className="mb-4 flex flex-wrap gap-2">
              {discountFilter > 0 && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  {discountFilter}% or more
                </Badge>
              )}
              {(priceRange[0] > 0 || priceRange[1] < 60000) && (
                <Badge variant="secondary">
                  ₹{priceRange[0].toLocaleString()} - ₹{priceRange[1].toLocaleString()}
                </Badge>
              )}
              {categoryFilter.map(category => (
                <Badge key={category} variant="secondary">
                  {category}
                </Badge>
              ))}
            </div>
          )}

          {discountedProducts.length > 0 ? (
            <>
              <p className="text-sm text-gray-600 mb-6">
                Showing {discountedProducts.length} products with discounts
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {discountedProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <Star className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <h2 className="text-xl font-semibold mb-2">No products found</h2>
              <p className="text-gray-600 mb-6">Try adjusting your filters to find what you're looking for.</p>
              <Button onClick={clearFilters}>
                Clear All Filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Deals;
