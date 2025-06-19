import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Eye, EyeOff, AlertCircle } from 'lucide-react';

interface LoginFormProps {
  onSubmit: (data: { emailOrUsername: string; password: string; rememberMe: boolean }) => Promise<void> | void;
  isLoading?: boolean;
  initialError?: string | null;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit, isLoading = false, initialError = null }) => {
  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(initialError);

  useEffect(() => {
    console.log('LoginForm loaded');
  }, []);

  useEffect(() => {
    setError(initialError);
  }, [initialError]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null); // Clear previous errors

    if (!emailOrUsername.trim()) {
      setError("Email or Username is required.");
      return;
    }
    if (!password.trim()) {
      setError("Password is required.");
      return;
    }

    try {
      await onSubmit({ emailOrUsername, password, rememberMe });
    } catch (e: any) {
      setError(e.message || "An unexpected error occurred during login.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Login Failed</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="space-y-2">
        <Label htmlFor="emailOrUsername">Email or Username</Label>
        <Input
          id="emailOrUsername"
          type="text"
          placeholder="you@example.com"
          value={emailOrUsername}
          onChange={(e) => setEmailOrUsername(e.target.value)}
          disabled={isLoading}
          required
          aria-describedby={error && emailOrUsername === '' ? "error-message" : undefined}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? 'text' : 'password'}
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
            required
            aria-describedby={error && password === '' ? "error-message" : undefined}
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={togglePasswordVisibility}
            className="absolute right-2 top-1/2 h-7 w-7 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            disabled={isLoading}
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="rememberMe"
          checked={rememberMe}
          onCheckedChange={(checked) => setRememberMe(checked as boolean)}
          disabled={isLoading}
        />
        <Label htmlFor="rememberMe" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          Remember me
        </Label>
      </div>

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? 'Logging in...' : 'Login'}
      </Button>
      {/* For more complex validation, consider react-hook-form and zod */}
    </form>
  );
};

export default LoginForm;