
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, CreditCard, MapPin, Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { useCart } from '@/lib/context';
import { toast } from 'sonner';
import { IndianRupee } from 'lucide-react';

const Checkout = () => {
  const navigate = useNavigate();
  const { cart, cartTotal, clearCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [shippingMethod, setShippingMethod] = useState('standard');
  const [isProcessing, setIsProcessing] = useState(false);
  
  if (cart.length === 0) {
    navigate('/cart');
    return null;
  }
  
  const shippingCost = shippingMethod === 'express' ? 99 : 0;
  const taxAmount = Math.round(cartTotal * 0.18);
  const totalAmount = cartTotal + shippingCost + taxAmount;
  
  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate processing order
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast.success('Order placed successfully!', {
      description: 'Your order has been placed and will be shipped soon.',
    });
    
    clearCart();
    navigate('/');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmitOrder}>
            {/* Shipping Address */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <div className="flex items-center mb-4">
                <MapPin className="h-5 w-5 text-brand-blue mr-2" />
                <h2 className="text-xl font-semibold">Shipping Address</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" required />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="address">Address</Label>
                  <Input id="address" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input id="city" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">State</Label>
                  <Input id="state" defaultValue="Maharashtra" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="zipCode">Zip Code</Label>
                  <Input id="zipCode" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" type="tel" required />
                </div>
              </div>
            </div>
            
            {/* Shipping Method */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <div className="flex items-center mb-4">
                <Truck className="h-5 w-5 text-brand-blue mr-2" />
                <h2 className="text-xl font-semibold">Shipping Method</h2>
              </div>
              
              <RadioGroup 
                value={shippingMethod} 
                onValueChange={setShippingMethod}
                className="space-y-4"
              >
                <div className="flex items-center justify-between border rounded-md p-4">
                  <div className="flex items-center space-x-3">
                    <RadioGroupItem value="standard" id="standard" />
                    <Label htmlFor="standard" className="font-medium">Standard Delivery</Label>
                  </div>
                  <div>
                    <span className="text-green-600 font-medium">Free</span>
                    <p className="text-sm text-gray-500">3-5 business days</p>
                  </div>
                </div>
                <div className="flex items-center justify-between border rounded-md p-4">
                  <div className="flex items-center space-x-3">
                    <RadioGroupItem value="express" id="express" />
                    <Label htmlFor="express" className="font-medium">Express Delivery</Label>
                  </div>
                  <div>
                    <span className="font-medium">₹99</span>
                    <p className="text-sm text-gray-500">1-2 business days</p>
                  </div>
                </div>
              </RadioGroup>
            </div>
            
            {/* Payment Method */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <div className="flex items-center mb-4">
                <CreditCard className="h-5 w-5 text-brand-blue mr-2" />
                <h2 className="text-xl font-semibold">Payment Method</h2>
              </div>
              
              <RadioGroup 
                value={paymentMethod} 
                onValueChange={setPaymentMethod}
                className="space-y-4"
              >
                <div className="flex items-center space-x-3 border rounded-md p-4">
                  <RadioGroupItem value="card" id="card" />
                  <Label htmlFor="card" className="font-medium">Credit/Debit Card</Label>
                </div>
                <div className="flex items-center space-x-3 border rounded-md p-4">
                  <RadioGroupItem value="upi" id="upi" />
                  <Label htmlFor="upi" className="font-medium">UPI Payment</Label>
                </div>
                <div className="flex items-center space-x-3 border rounded-md p-4">
                  <RadioGroupItem value="cod" id="cod" />
                  <Label htmlFor="cod" className="font-medium">Cash on Delivery</Label>
                </div>
              </RadioGroup>
              
              {paymentMethod === 'card' && (
                <div className="mt-4 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="cardNumber">Card Number</Label>
                    <Input id="cardNumber" placeholder="XXXX XXXX XXXX XXXX" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="expiryDate">Expiry Date</Label>
                      <Input id="expiryDate" placeholder="MM/YY" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cvv">CVV</Label>
                      <Input id="cvv" type="password" maxLength={3} />
                    </div>
                  </div>
                </div>
              )}
              
              {paymentMethod === 'upi' && (
                <div className="mt-4 space-y-2">
                  <Label htmlFor="upiId">UPI ID</Label>
                  <Input id="upiId" placeholder="example@ybl" />
                </div>
              )}
            </div>
            
            {/* Notes */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">Order Notes (Optional)</h2>
              <Textarea 
                placeholder="Notes about your order, e.g. special instructions for delivery" 
                className="w-full"
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-brand-orange hover:bg-orange-600 text-lg py-6"
              disabled={isProcessing}
            >
              {isProcessing ? 'Processing...' : 'Place Order'}
            </Button>
          </form>
        </div>
        
        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            
            <div className="divide-y">
              {cart.map(item => {
                const { product, quantity } = item;
                const discountedPrice = product.discount 
                  ? Math.round(product.price * (1 - product.discount / 100)) 
                  : product.price;
                  
                return (
                  <div key={product.id} className="py-4 flex gap-4">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h3 className="text-sm font-medium">{product.name}</h3>
                      <p className="text-sm text-gray-500">Qty: {quantity}</p>
                      <p className="text-sm font-semibold flex items-center">
                        <IndianRupee className="h-3.5 w-3.5" />
                        {discountedPrice.toLocaleString()}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
            
            <Separator className="my-4" />
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-semibold flex items-center">
                  <IndianRupee className="h-4 w-4" />
                  {cartTotal.toLocaleString()}
                </span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                {shippingCost > 0 ? (
                  <span className="font-semibold flex items-center">
                    <IndianRupee className="h-4 w-4" />
                    {shippingCost.toLocaleString()}
                  </span>
                ) : (
                  <span className="text-green-600">Free</span>
                )}
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Tax (18%)</span>
                <span className="font-semibold flex items-center">
                  <IndianRupee className="h-4 w-4" />
                  {taxAmount.toLocaleString()}
                </span>
              </div>
              
              <div className="pt-3 border-t border-gray-200 flex justify-between">
                <span className="font-semibold">Total</span>
                <span className="font-bold text-lg flex items-center">
                  <IndianRupee className="h-5 w-5" />
                  {totalAmount.toLocaleString()}
                </span>
              </div>
            </div>
            
            <div className="mt-6 bg-gray-50 p-4 rounded-md">
              <div className="flex items-center text-green-600">
                <Check className="h-5 w-5 mr-2" />
                <span className="font-medium">Secure Checkout</span>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Your payment information is processed securely by our payment gateway.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
