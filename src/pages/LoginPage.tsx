import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// Custom Components
import MinimalHeader from '@/components/layout/MinimalHeader';
import MinimalFooter from '@/components/layout/MinimalFooter';
import LoginForm from '@/components/LoginForm';
import SocialLoginButtonGroup from '@/components/SocialLoginButtonGroup';

// shadcn/ui Components
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
// Alert is used internally by LoginForm, so not explicitly imported here unless for other page-level alerts.

interface LoginFormData {
  emailOrUsername: string;
  password: string;
  rememberMe: boolean;
}

const LoginPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  // LoginForm handles its own error display by catching errors thrown from onSubmit.
  // An initialError prop could be used if errors need to be passed from page load.

  useEffect(() => {
    console.log('LoginPage loaded');
  }, []);

  const handleLogin = async (data: LoginFormData) => {
    console.log('Login attempt with:', data);
    setIsLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);

    if (data.emailOrUsername === 'user@example.com' && data.password === 'password') {
      console.log('Login successful for:', data.emailOrUsername);
      // In a real application, you would navigate to a dashboard or main app page.
      // Example: navigate('/dashboard');
      // For this example, App.tsx only has LoginPage and NotFound.
      // We'll show an alert for success.
      alert(`Login successful for ${data.emailOrUsername}! (This is a placeholder. In a real app, you would be redirected.)`);
    } else {
      console.log('Login failed for:', data.emailOrUsername);
      // This error will be caught by LoginForm and displayed in its internal Alert component.
      throw new Error('Invalid email/username or password. Please try again.');
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900">
      <MinimalHeader />
      <main className="flex-grow flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <Card className="w-full max-w-md shadow-xl dark:bg-gray-800">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl sm:text-3xl font-bold">Welcome Back!</CardTitle>
            <CardDescription className="text-muted-foreground">
              Please enter your credentials to access your account.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <LoginForm onSubmit={handleLogin} isLoading={isLoading} />
            <SocialLoginButtonGroup />
            <div className="mt-6 text-sm text-center">
              <Link to="/forgot-password"> {/* Path not in App.tsx, will lead to NotFound */}
                <Button variant="link" className="text-primary hover:underline px-1">
                  Forgot Password?
                </Button>
              </Link>
            </div>
            <div className="text-sm text-center text-muted-foreground">
              Don&apos;t have an account?{' '}
              <Link to="/signup"> {/* Path not in App.tsx, will lead to NotFound */}
                <Button variant="link" className="text-primary hover:underline px-1">
                  Sign Up
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </main>
      <MinimalFooter />
    </div>
  );
};

export default LoginPage;