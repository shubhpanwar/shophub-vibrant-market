
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft, CheckCircle } from 'lucide-react';
import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/lib/context';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();
  const { requestPasswordReset } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const success = await requestPasswordReset(email);
      setIsSubmitted(true);
      
      // Always show success UI regardless of whether email exists (security best practice)
      toast({
        title: "Email Sent",
        description: "If an account exists with this email, you will receive a password reset link.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleTryAgain = () => {
    setIsSubmitted(false);
    setEmail('');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 py-12 px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-brand-blue p-6 text-center">
          <Link to="/" className="inline-flex items-center justify-center">
            <ShoppingCart className="h-8 w-8 text-white mr-2" />
            <span className="font-poppins font-bold text-2xl text-white">ShopHub</span>
          </Link>
          <h2 className="mt-4 text-2xl font-bold text-white">Reset Password</h2>
          <p className="mt-1 text-blue-100">Enter your email to receive a reset link</p>
        </div>

        <div className="p-6 sm:p-8">
          {!isSubmitted ? (
            <>
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

                <Button
                  type="submit"
                  className="w-full bg-brand-blue hover:bg-blue-700"
                  disabled={isLoading}
                >
                  {isLoading ? 'Sending...' : 'Send Reset Link'}
                </Button>
              </form>

              <div className="mt-6">
                <Link
                  to="/login"
                  className="inline-flex items-center text-sm text-brand-blue hover:underline"
                >
                  <ArrowLeft className="h-4 w-4 mr-1" />
                  Back to Login
                </Link>
              </div>
            </>
          ) : (
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <CheckCircle className="h-16 w-16 text-green-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Reset Link Sent</h3>
              <div className="mb-4 p-3 bg-blue-50 border border-blue-200 text-blue-700 rounded">
                <p className="font-medium">Email sent to: {email}</p>
                <p className="text-sm mt-1">Please check your inbox for the password reset link.</p>
              </div>
              <p className="my-4 text-gray-600">
                Didn't receive an email? Check your spam folder or try again with a different email.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-3 mt-4">
                <Button
                  onClick={handleTryAgain}
                  variant="outline"
                  className="mt-2"
                >
                  Try Again
                </Button>
                <Button
                  asChild
                  className="mt-2 bg-brand-blue hover:bg-blue-700"
                >
                  <Link to="/login">Back to Login</Link>
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
