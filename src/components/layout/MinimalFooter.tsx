import React from 'react';
import { Link } from 'react-router-dom';

const MinimalFooter: React.FC = () => {
  console.log('MinimalFooter loaded');
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-6 px-4 sm:px-6 bg-background border-t">
      <div className="container mx-auto text-center text-sm text-muted-foreground">
        <div className="flex flex-col sm:flex-row justify-center items-center gap-x-4 gap-y-2 mb-2">
          <Link to="/terms" className="hover:text-primary transition-colors">
            Terms of Service
          </Link>
          <Link to="/privacy" className="hover:text-primary transition-colors">
            Privacy Policy
          </Link>
          {/* The user journey also mentioned a "Sign Up" link, which could be placed here or near the login form.
              Example: <Link to="/signup" className="hover:text-primary transition-colors">Sign Up</Link>
              For now, sticking to the explicit component description.
          */}
        </div>
        <p>&copy; {currentYear} AuthApp. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default MinimalFooter;