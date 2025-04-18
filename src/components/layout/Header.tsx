import React from 'react';
import { Bug, Search, LogOut, User } from 'lucide-react';
import { Button } from '../ui/Button';
import { ThemeToggle } from '../ui/ThemeToggle';
import { useAuth } from '../../context/AuthContext';
import { cn } from '../../utils/cn';

interface HeaderProps {
  onToggleSearch: () => void;
  isSearchOpen: boolean;
}

export const Header: React.FC<HeaderProps> = ({ onToggleSearch, isSearchOpen }) => {
  const { authState, logout } = useAuth();
  const { user } = authState;

  return (
    <header className="sticky top-0 z-30 w-full bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800 transition-colors duration-300">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center">
          <a href="/" className="flex items-center mr-6">
            <Bug className="h-6 w-6 text-primary-600 dark:text-primary-400 mr-2" />
            <span className="font-bold text-lg text-neutral-900 dark:text-white">
              Cool Bug
            </span>
          </a>
          
          <nav className="hidden md:flex space-x-6">
            <a 
              href="#" 
              className="text-neutral-700 dark:text-neutral-300 hover:text-primary-600 dark:hover:text-primary-400 text-sm font-medium"
            >
              Dashboard
            </a>
            <a 
              href="#" 
              className="text-neutral-700 dark:text-neutral-300 hover:text-primary-600 dark:hover:text-primary-400 text-sm font-medium"
            >
              Airdrops
            </a>
            <a 
              href="#" 
              className="text-neutral-700 dark:text-neutral-300 hover:text-primary-600 dark:hover:text-primary-400 text-sm font-medium"
            >
              Coins
            </a>
          </nav>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleSearch}
            aria-label="Search"
            className={cn(
              "rounded-full w-10 h-10 p-0 flex items-center justify-center",
              isSearchOpen && "bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-400"
            )}
          >
            <Search className="h-5 w-5" />
          </Button>
          
          <ThemeToggle />
          
          {user ? (
            <div className="relative ml-2 hidden sm:block">
              <Button
                variant="outline"
                size="sm"
                onClick={() => logout()}
                className="px-3 flex items-center"
              >
                <LogOut className="w-4 h-4 mr-2" />
                <span>Sign Out</span>
              </Button>
            </div>
          ) : (
            <Button
              variant="primary"
              size="sm"
              className="hidden sm:flex"
            >
              <User className="w-4 h-4 mr-2" />
              <span>Sign In</span>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};