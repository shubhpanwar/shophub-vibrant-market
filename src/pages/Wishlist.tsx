
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, ArrowRight } from 'lucide-react';
import { useWishlist, useCart } from '@/lib/context';
import { Button } from '@/components/ui/button';
import ProductCard from '@/components/ProductCard';
import { toast } from 'sonner';

const Wishlist = () => {
  const { wishlist, wishlistCount, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  
  // Log the route to help with debugging
  useEffect(() => {
    console.log('Wishlist page mounted');
  }, []);
  
  const handleMoveToCart = (productId: number) => {
    const product = wishlist.find(item => item.id === productId);
    if (product) {
      addToCart(product);
      removeFromWishlist(productId);
      toast(`${product.name} moved to cart`);
    }
  };
  
  const handleRemoveAll = () => {
    wishlist.forEach(product => {
      removeFromWishlist(product.id);
    });
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl md:text-3xl font-bold mb-6">My Wishlist</h1>
      
      {wishlistCount > 0 ? (
        <>
          <div className="flex justify-between items-center mb-6">
            <p className="text-gray-600">{wishlistCount} item{wishlistCount !== 1 ? 's' : ''}</p>
            <Button 
              variant="outline" 
              className="text-sm"
              onClick={handleRemoveAll}
            >
              Remove All
            </Button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {wishlist.map(product => (
              <div key={product.id} className="relative">
                <ProductCard product={product} />
                <div className="absolute bottom-4 left-0 right-0 px-4">
                  <Button
                    variant="outline"
                    className="w-full text-xs bg-white border-gray-300"
                    onClick={() => handleMoveToCart(product.id)}
                  >
                    Move to Cart
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="text-center py-12">
          <div className="bg-gray-100 inline-flex rounded-full p-4 mb-6">
            <Heart className="h-8 w-8 text-gray-400" />
          </div>
          <h2 className="text-xl font-semibold mb-3">Your wishlist is empty</h2>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">
            Save items you like to your wishlist. Review them anytime and easily move them to the cart.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link to="/products">
              <Button className="bg-brand-blue">
                Start Shopping
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link to="/cart">
              <Button variant="outline" className="flex items-center">
                <ShoppingBag className="mr-2 h-4 w-4" />
                View Cart
              </Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Wishlist;
