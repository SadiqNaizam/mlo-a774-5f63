import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

type Theme = 'light' | 'dark';

interface ThemeProviderProps {
  children: ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
}

interface ThemeProviderState {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const ThemeProviderContext = createContext<ThemeProviderState | undefined>(undefined);

export function ThemeProvider({
  children,
  defaultTheme = 'light', // Default fallback
  storageKey = 'app-ui-theme', // Unique storage key for this app
}: ThemeProviderProps) {
  const [theme, setThemeInternal] = useState<Theme>(() => {
    if (typeof window === 'undefined') { // For SSR/build-time safety
        return defaultTheme;
    }
    try {
      const storedTheme = window.localStorage.getItem(storageKey) as Theme | null;
      if (storedTheme && (storedTheme === 'light' || storedTheme === 'dark')) {
        return storedTheme;
      }
      // If no stored theme, try system preference
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      return systemPrefersDark ? 'dark' : 'light';
    } catch (e) {
      // localStorage can be unavailable (e.g. in private browsing, iframes)
      console.error("Error reading theme from localStorage or system preference:", e);
      return defaultTheme;
    }
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const root = window.document.documentElement;
    root.classList.remove('light', 'dark'); // Remove any existing theme class
    root.classList.add(theme); // Add the current theme class

    try {
        window.localStorage.setItem(storageKey, theme);
    } catch (e) {
        console.error("Error saving theme to localStorage:", e);
    }
  }, [theme, storageKey]);

  const toggleTheme = () => {
    setThemeInternal((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const setTheme = (newTheme: Theme) => {
    if (newTheme === 'light' || newTheme === 'dark') {
        setThemeInternal(newTheme);
    } else {
        console.warn(`Attempted to set invalid theme: ${newTheme}`);
    }
  };

  return (
    <ThemeProviderContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};