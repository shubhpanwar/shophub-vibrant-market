
import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronLeft, Star, Heart, ShoppingCart, TruckIcon, ShieldCheck, RefreshCw, IndianRupee } from 'lucide-react';
import { products } from '@/lib/data';
import { Button } from '@/components/ui/button';
import ProductCard from '@/components/ProductCard';
import { useCart } from '@/lib/context';
import { toast } from 'sonner';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  
  const product = products.find(p => p.id === Number(id));
  
  // Get similar products from the same category
  const similarProducts = products
    .filter(p => p.category === product?.category && p.id !== product?.id)
    .slice(0, 4);
  
  if (!product) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
        <p className="mb-6">The product you are looking for does not exist.</p>
        <Link to="/products">
          <Button>Back to Products</Button>
        </Link>
      </div>
    );
  }
  
  const discountedPrice = product.discount 
    ? Math.round(product.price * (1 - product.discount / 100)) 
    : product.price;
  
  const handleAddToCart = () => {
    addToCart(product, quantity);
    toast(`${product.name} added to cart`);
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumbs */}
      <div className="flex items-center text-sm mb-6">
        <Link to="/" className="text-gray-500 hover:text-brand-blue">Home</Link>
        <span className="mx-2">/</span>
        <Link to="/products" className="text-gray-500 hover:text-brand-blue">Products</Link>
        <span className="mx-2">/</span>
        <Link 
          to={`/products?category=${product.category}`} 
          className="text-gray-500 hover:text-brand-blue"
        >
          {product.category}
        </Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900 font-medium">{product.name}</span>
      </div>
      
      {/* Back button */}
      <Link to="/products" className="inline-flex items-center text-brand-blue mb-6">
        <ChevronLeft className="h-4 w-4 mr-1" />
        Back to Products
      </Link>
      
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
          {/* Product Image */}
          <div className="relative">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-auto rounded-lg"
            />
            
            {product.discount && (
              <div className="absolute top-4 left-4 bg-brand-orange text-white px-3 py-1 rounded-md font-semibold">
                {product.discount}% OFF
              </div>
            )}
            
            <button className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-md text-gray-600 hover:text-red-500 transition-colors">
              <Heart className="h-5 w-5" />
            </button>
          </div>
          
          {/* Product Info */}
          <div>
            <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
            
            {/* Ratings */}
            <div className="flex items-center mb-4">
              <div className="flex items-center bg-green-100 px-2 py-1 rounded">
                <span className="font-semibold mr-1">{product.rating}</span>
                <Star className="h-4 w-4 text-green-600 fill-current" />
              </div>
              <span className="text-sm text-gray-600 ml-2">
                {product.reviews} Ratings & Reviews
              </span>
            </div>
            
            {/* Price */}
            <div className="mb-6">
              <div className="flex items-center">
                <IndianRupee className="h-5 w-5 mr-1" />
                <span className="text-3xl font-bold">{discountedPrice.toLocaleString()}</span>
                
                {product.discount && (
                  <>
                    <span className="text-lg text-gray-500 line-through ml-3">
                      ₹{product.price.toLocaleString()}
                    </span>
                    <span className="text-green-600 ml-2 font-semibold">
                      {product.discount}% off
                    </span>
                  </>
                )}
              </div>
              <p className="text-sm text-green-600 mt-1">
                inclusive of all taxes
              </p>
            </div>
            
            {/* Description */}
            <div className="mb-6">
              <h3 className="font-semibold mb-2">Description:</h3>
              <p className="text-gray-700">{product.description}</p>
            </div>
            
            {/* Stock */}
            <div className="mb-6">
              <p className={`font-medium ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                {product.stock > 0 
                  ? `In Stock (${product.stock} units left)` 
                  : 'Out of Stock'}
              </p>
            </div>
            
            {/* Quantity Selector */}
            <div className="flex items-center mb-6">
              <span className="mr-3">Quantity:</span>
              <div className="flex items-center">
                <button 
                  className="border border-gray-300 px-3 py-1 rounded-l-md"
                  onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                >
                  -
                </button>
                <span className="border-t border-b border-gray-300 px-4 py-1">
                  {quantity}
                </span>
                <button 
                  className="border border-gray-300 px-3 py-1 rounded-r-md"
                  onClick={() => setQuantity(prev => Math.min(product.stock, prev + 1))}
                >
                  +
                </button>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button
                variant="default"
                className="flex-1 bg-brand-orange hover:bg-orange-600"
                onClick={handleAddToCart}
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                Add to Cart
              </Button>
              <Button
                variant="default"
                className="flex-1 bg-brand-blue hover:bg-blue-700"
              >
                Buy Now
              </Button>
            </div>
            
            {/* Features */}
            <div className="border-t pt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="flex items-center">
                <TruckIcon className="h-5 w-5 mr-2 text-brand-blue" />
                <span className="text-sm">Fast Delivery</span>
              </div>
              <div className="flex items-center">
                <ShieldCheck className="h-5 w-5 mr-2 text-brand-blue" />
                <span className="text-sm">Warranty</span>
              </div>
              <div className="flex items-center">
                <RefreshCw className="h-5 w-5 mr-2 text-brand-blue" />
                <span className="text-sm">10 Days Return</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Similar Products */}
      <section className="mt-12">
        <h2 className="text-2xl font-bold mb-6">Similar Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {similarProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default ProductDetail;
