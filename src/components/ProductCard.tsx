
import { Link } from 'react-router-dom';
import { Star, ShoppingCart, Heart } from 'lucide-react';
import { Product } from '@/lib/data';
import { useCart, useWishlist } from '@/lib/context';
import { Button } from '@/components/ui/button';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const discountedPrice = product.discount 
    ? Math.round(product.price * (1 - product.discount / 100)) 
    : product.price;
    
  const inWishlist = isInWishlist(product.id);
  
  const toggleWishlist = () => {
    if (inWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <div className="product-card overflow-hidden group">
      <div className="relative">
        <Link to={`/product/${product.id}`}>
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-48 object-cover transform transition duration-300 group-hover:scale-105"
          />
        </Link>
        
        {product.discount && (
          <div className="absolute top-2 left-2 bg-brand-orange text-white text-xs font-semibold px-2 py-1 rounded">
            {product.discount}% OFF
          </div>
        )}
        
        <button 
          className={`absolute top-2 right-2 bg-white p-1.5 rounded-full transition-colors ${
            inWishlist ? "text-red-500" : "text-gray-600 hover:text-red-500"
          }`}
          onClick={toggleWishlist}
        >
          <Heart className={`h-4 w-4 ${inWishlist ? "fill-current" : ""}`} />
        </button>
      </div>
      
      <div className="p-4">
        <Link to={`/product/${product.id}`}>
          <h3 className="text-sm font-medium text-gray-800 line-clamp-1">{product.name}</h3>
        </Link>
        
        <p className="text-xs text-gray-600 mt-1 line-clamp-1">{product.description}</p>
        
        <div className="flex items-center mt-2">
          <div className="flex items-center bg-green-100 px-1.5 py-0.5 rounded text-xs">
            <span className="font-medium">{product.rating}</span>
            <Star className="h-3 w-3 text-green-600 ml-0.5 fill-current" />
          </div>
          <span className="text-xs text-gray-500 ml-2">({product.reviews})</span>
        </div>
        
        <div className="mt-2 flex items-baseline">
          <span className="text-base font-semibold">₹{discountedPrice.toLocaleString()}</span>
          
          {product.discount && (
            <span className="text-xs text-gray-500 line-through ml-2">₹{product.price.toLocaleString()}</span>
          )}
        </div>
        
        <Button 
          variant="secondary"
          size="sm"
          className="w-full mt-3 bg-brand-blue text-white hover:bg-blue-700"
          onClick={() => addToCart(product)}
        >
          <ShoppingCart className="h-4 w-4 mr-1" />
          Add to Cart
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
