import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck } from 'lucide-react'; // Using a generic icon for logo
import { ThemeToggleButton } from '@/components/ThemeToggleButton'; // Added import

const MinimalHeader: React.FC = () => {
  console.log('MinimalHeader loaded');

  return (
    <header className="py-4 px-4 sm:px-6 bg-background border-b">
      <div className="container mx-auto flex items-center justify-between"> {/* Changed justify-start to justify-between */}
        <Link to="/" className="flex items-center gap-2 text-lg sm:text-xl font-semibold text-primary hover:text-primary/90 transition-colors">
          <ShieldCheck className="h-6 w-6 sm:h-7 sm:w-7" />
          <span>AuthApp</span> {/* Placeholder application name */}
        </Link>
        <ThemeToggleButton /> {/* Added theme toggle button */}
      </div>
    </header>
  );
};

export default MinimalHeader;