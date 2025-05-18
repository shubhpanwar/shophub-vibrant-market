
import { Link } from 'react-router-dom';
import { MinusCircle, PlusCircle, ShoppingCart, Trash2, ArrowRight, IndianRupee } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/lib/context';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useCart();
  
  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <div className="flex flex-col items-center">
          <ShoppingCart className="h-20 w-20 text-gray-300 mb-4" />
          <h2 className="text-2xl font-bold mb-2">Your Cart is Empty</h2>
          <p className="text-gray-600 mb-8">Looks like you haven't added anything to your cart yet.</p>
          <Link to="/products">
            <Button className="bg-brand-blue hover:bg-blue-700">
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Shopping Cart</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {/* Cart Items */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-4">
            <ul className="divide-y divide-gray-200">
              {cart.map(item => {
                const { product, quantity } = item;
                const discountedPrice = product.discount 
                  ? Math.round(product.price * (1 - product.discount / 100)) 
                  : product.price;
                const itemTotal = discountedPrice * quantity;
                
                return (
                  <li key={product.id} className="p-6">
                    <div className="flex flex-col sm:flex-row gap-4">
                      {/* Product Image */}
                      <Link to={`/product/${product.id}`} className="sm:w-24 sm:h-24 rounded-md overflow-hidden">
                        <img 
                          src={product.image} 
                          alt={product.name} 
                          className="w-full h-full object-cover"
                        />
                      </Link>
                      
                      {/* Product Info */}
                      <div className="flex-1">
                        <Link to={`/product/${product.id}`}>
                          <h3 className="font-medium">{product.name}</h3>
                        </Link>
                        
                        <p className="text-sm text-gray-600 mt-1">{product.category}</p>
                        
                        <div className="mt-2 flex items-baseline">
                          <span className="text-lg font-semibold flex items-center">
                            <IndianRupee className="h-4 w-4" />
                            {discountedPrice.toLocaleString()}
                          </span>
                          
                          {product.discount && (
                            <>
                              <span className="text-sm text-gray-500 line-through ml-2">
                                ₹{product.price.toLocaleString()}
                              </span>
                              <span className="text-xs text-green-600 ml-2">
                                {product.discount}% off
                              </span>
                            </>
                          )}
                        </div>
                        
                        {/* Quantity Controls */}
                        <div className="mt-4 flex items-center justify-between">
                          <div className="flex items-center">
                            <button
                              onClick={() => updateQuantity(product.id, quantity - 1)}
                              className="text-gray-500 hover:text-brand-blue focus:outline-none"
                              disabled={quantity <= 1}
                            >
                              <MinusCircle className={`h-5 w-5 ${quantity <= 1 ? 'opacity-50' : ''}`} />
                            </button>
                            
                            <span className="mx-3 w-8 text-center">{quantity}</span>
                            
                            <button
                              onClick={() => updateQuantity(product.id, quantity + 1)}
                              className="text-gray-500 hover:text-brand-blue focus:outline-none"
                              disabled={quantity >= product.stock}
                            >
                              <PlusCircle className={`h-5 w-5 ${quantity >= product.stock ? 'opacity-50' : ''}`} />
                            </button>
                          </div>
                          
                          {/* Remove Button */}
                          <button
                            onClick={() => removeFromCart(product.id)}
                            className="text-red-500 flex items-center hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4 mr-1" />
                            <span className="text-sm">Remove</span>
                          </button>
                        </div>
                      </div>
                      
                      {/* Price */}
                      <div className="sm:text-right">
                        <div className="text-lg font-semibold flex items-center sm:justify-end">
                          <IndianRupee className="h-4 w-4" />
                          {itemTotal.toLocaleString()}
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
          
          {/* Continue Shopping */}
          <div className="flex justify-between">
            <Link to="/products">
              <Button variant="outline" className="flex items-center">
                <ShoppingCart className="mr-2 h-5 w-5" />
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>
        
        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-semibold flex items-center">
                  <IndianRupee className="h-4 w-4" />
                  {cartTotal.toLocaleString()}
                </span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="text-green-600">Free</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Tax</span>
                <span className="font-semibold flex items-center">
                  <IndianRupee className="h-4 w-4" />
                  {Math.round(cartTotal * 0.18).toLocaleString()}
                </span>
              </div>
              
              <div className="pt-3 border-t border-gray-200 flex justify-between">
                <span className="font-semibold">Total</span>
                <span className="font-bold text-lg flex items-center">
                  <IndianRupee className="h-5 w-5" />
                  {Math.round(cartTotal * 1.18).toLocaleString()}
                </span>
              </div>
            </div>
            
            <Link to="/checkout">
              <Button className="w-full bg-brand-orange hover:bg-orange-600 flex items-center justify-center">
                Proceed to Checkout
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            
            {/* Payment Methods */}
            <div className="mt-6">
              <p className="text-sm text-gray-600 mb-2">We Accept:</p>
              <div className="flex space-x-2">
                <div className="w-10 h-6 bg-gray-200 rounded"></div>
                <div className="w-10 h-6 bg-gray-200 rounded"></div>
                <div className="w-10 h-6 bg-gray-200 rounded"></div>
                <div className="w-10 h-6 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
