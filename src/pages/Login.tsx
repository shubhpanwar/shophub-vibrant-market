
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/lib/context';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const success = await login(email, password);
      if (success) {
        navigate('/');
      } else {
        setError('Invalid email or password');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 py-12 px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-brand-blue p-6 text-center">
          <Link to="/" className="inline-flex items-center justify-center">
            <ShoppingCart className="h-8 w-8 text-white mr-2" />
            <span className="font-poppins font-bold text-2xl text-white">ShopHub</span>
          </Link>
          <h2 className="mt-4 text-2xl font-bold text-white">Sign In</h2>
          <p className="mt-1 text-blue-100">Welcome back! Login to your account</p>
        </div>

        <div className="p-6 sm:p-8">
          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <Label htmlFor="email" className="block mb-2">
                Email Address
              </Label>
              <div className="relative">
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  required
                />
                <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              </div>
            </div>

            <div className="mb-6">
              <div className="flex justify-between mb-2">
                <Label htmlFor="password">Password</Label>
                <Link to="/forgot-password" className="text-sm text-brand-blue hover:underline">
                  Forgot Password?
                </Link>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10"
                  required
                />
                <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <button
                  type="button"
                  className="absolute right-3 top-3 text-gray-400"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-brand-blue hover:bg-blue-700"
              disabled={isLoading}
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Don't have an account?{' '}
              <Link to="/register" className="text-brand-blue hover:underline">
                Sign up here
              </Link>
            </p>
          </div>

          {/* Demo Account Info */}
          <div className="mt-8 bg-blue-50 p-4 rounded-md">
            <h3 className="font-semibold text-gray-800 mb-2">Demo Account</h3>
            <p className="text-sm text-gray-600 mb-1">Email: john@example.com</p>
            <p className="text-sm text-gray-600">Password: password123</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
