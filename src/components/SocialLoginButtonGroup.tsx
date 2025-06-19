import React from 'react';
import { Button } from "@/components/ui/button";
import { Github, Chrome, Facebook } from 'lucide-react';

const SocialLoginButtonGroup: React.FC = () => {
  console.log('SocialLoginButtonGroup loaded');

  const handleSocialLogin = (provider: string) => {
    // In a real application, this would initiate the OAuth flow for the given provider.
    console.log(`Attempting to login with ${provider}...`);
    // Example: window.location.href = `/auth/${provider.toLowerCase()}`;
  };

  return (
    <div className="w-full max-w-sm mx-auto">
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-background text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>

      <div className="space-y-3">
        <Button
          variant="outline"
          className="w-full"
          onClick={() => handleSocialLogin('Google')}
        >
          <Chrome className="mr-2 h-4 w-4" />
          Continue with Google
        </Button>
        <Button
          variant="outline"
          className="w-full"
          onClick={() => handleSocialLogin('Facebook')}
        >
          <Facebook className="mr-2 h-4 w-4" />
          Continue with Facebook
        </Button>
        <Button
          variant="outline"
          className="w-full"
          onClick={() => handleSocialLogin('GitHub')}
        >
          <Github className="mr-2 h-4 w-4" />
          Continue with GitHub
        </Button>
      </div>
    </div>
  );
};

export default SocialLoginButtonGroup;