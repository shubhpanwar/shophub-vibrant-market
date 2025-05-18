
import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CartIconProps {
  count: number;
}

const CartIcon = ({ count }: CartIconProps) => {
  return (
    <Button variant="ghost" className="text-white hover:bg-blue-700 relative">
      <ShoppingCart className="h-5 w-5" />
      <span className="hidden lg:inline ml-1">Cart</span>
      {count > 0 && (
        <span className="absolute -top-1 -right-1 bg-brand-orange text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
          {count > 9 ? '9+' : count}
        </span>
      )}
    </Button>
  );
};

export default CartIcon;
