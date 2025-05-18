
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Filter, Star } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import { products, categories } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';

const Products = () => {
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get('category');
  
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>(categoryParam ? [categoryParam] : []);
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [selectedRatings, setSelectedRatings] = useState<number[]>([]);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  
  // Filter products based on search term, categories, price range, and ratings
  useEffect(() => {
    let result = [...products];
    
    // Filter by search term
    if (searchTerm) {
      result = result.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Filter by categories
    if (selectedCategories.length > 0) {
      result = result.filter(product => selectedCategories.includes(product.category));
    }
    
    // Filter by price range
    result = result.filter(product => {
      const finalPrice = product.discount 
        ? product.price * (1 - product.discount / 100) 
        : product.price;
      return finalPrice >= priceRange[0] && finalPrice <= priceRange[1];
    });
    
    // Filter by ratings
    if (selectedRatings.length > 0) {
      result = result.filter(product => {
        const roundedRating = Math.floor(product.rating);
        return selectedRatings.includes(roundedRating);
      });
    }
    
    setFilteredProducts(result);
  }, [searchTerm, selectedCategories, priceRange, selectedRatings]);
  
  const toggleCategory = (category: string) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter(c => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };
  
  const toggleRating = (rating: number) => {
    if (selectedRatings.includes(rating)) {
      setSelectedRatings(selectedRatings.filter(r => r !== rating));
    } else {
      setSelectedRatings([...selectedRatings, rating]);
    }
  };

  const renderStars = (rating: number) => {
    return Array(5).fill(0).map((_, index) => (
      <Star 
        key={index} 
        className={`h-4 w-4 ${index < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
      />
    ));
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">All Products</h1>
      
      {/* Search bar */}
      <div className="mb-8">
        <div className="relative max-w-md mx-auto md:mx-0">
          <input
            type="text"
            placeholder="Search products..."
            className="w-full border border-gray-300 rounded-md pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-brand-blue"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
      </div>
      
      {/* Mobile filter button */}
      <div className="md:hidden mb-4">
        <Button
          variant="outline"
          className="w-full"
          onClick={() => setShowMobileFilters(!showMobileFilters)}
        >
          <Filter className="mr-2 h-4 w-4" />
          {showMobileFilters ? 'Hide Filters' : 'Show Filters'}
        </Button>
      </div>
      
      <div className="flex flex-col md:flex-row gap-8">
        {/* Filters - sidebar */}
        <div className={`md:w-1/4 ${showMobileFilters ? 'block' : 'hidden md:block'}`}>
          <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
            <h2 className="text-lg font-semibold mb-4">Categories</h2>
            <div className="space-y-2">
              {categories.map((category) => (
                <div key={category.id} className="flex items-center">
                  <Checkbox 
                    id={`category-${category.id}`} 
                    checked={selectedCategories.includes(category.name)}
                    onCheckedChange={() => toggleCategory(category.name)}
                  />
                  <label 
                    htmlFor={`category-${category.id}`}
                    className="ml-2 text-sm font-medium"
                  >
                    {category.name}
                  </label>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
            <h2 className="text-lg font-semibold mb-4">Price Range</h2>
            <div className="px-2">
              <Slider
                defaultValue={[0, 100000]}
                max={100000}
                step={1000}
                value={priceRange}
                onValueChange={setPriceRange}
                className="mb-6"
              />
              <div className="flex justify-between">
                <span className="text-sm">₹{priceRange[0].toLocaleString()}</span>
                <span className="text-sm">₹{priceRange[1].toLocaleString()}</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
            <h2 className="text-lg font-semibold mb-4">Customer Ratings</h2>
            <div className="space-y-2">
              {[4, 3, 2, 1].map((rating) => (
                <div key={rating} className="flex items-center">
                  <Checkbox
                    id={`rating-${rating}`}
                    checked={selectedRatings.includes(rating)}
                    onCheckedChange={() => toggleRating(rating)}
                  />
                  <label
                    htmlFor={`rating-${rating}`}
                    className="ml-2 flex items-center"
                  >
                    <div className="flex mr-2">
                      {renderStars(rating)}
                    </div>
                    <span className="text-sm">& above</span>
                  </label>
                </div>
              ))}
            </div>
          </div>
          
          {/* Reset filters button */}
          <Button 
            variant="outline" 
            className="w-full mb-6"
            onClick={() => {
              setSelectedCategories([]);
              setPriceRange([0, 100000]);
              setSelectedRatings([]);
              setSearchTerm('');
            }}
          >
            Reset Filters
          </Button>
        </div>
        
        {/* Products grid */}
        <div className="md:w-3/4">
          <div className="mb-4 flex justify-between items-center">
            <p className="text-sm text-gray-600">{filteredProducts.length} products found</p>
            <select className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-brand-blue">
              <option value="popularity">Sort by: Popularity</option>
              <option value="price_low">Price: Low to High</option>
              <option value="price_high">Price: High to Low</option>
              <option value="rating">Customer Rating</option>
            </select>
          </div>
          
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-sm p-8 text-center">
              <h3 className="text-lg font-semibold mb-2">No Products Found</h3>
              <p className="text-gray-600">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
