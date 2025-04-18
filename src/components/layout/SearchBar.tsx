import React, { useState } from 'react';
import { Search, X } from 'lucide-react';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { motion, AnimatePresence } from 'framer-motion';

interface SearchBarProps {
  isOpen: boolean;
  onClose: () => void;
  onSearch: (query: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ isOpen, onClose, onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  const handleClear = () => {
    setQuery('');
    onSearch('');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
          className="absolute top-full left-0 right-0 bg-white dark:bg-neutral-900 shadow-lg border-b border-neutral-200 dark:border-neutral-800 z-20"
        >
          <div className="container mx-auto px-4 py-4">
            <form onSubmit={handleSearch} className="flex items-center">
              <div className="flex-1">
                <Input
                  type="text"
                  placeholder="Search by coin name (e.g., Bitcoin, Ethereum, Solana)"
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    if (e.target.value === '') {
                      onSearch('');
                    }
                  }}
                  fullWidth
                  leftIcon={<Search className="h-5 w-5 text-neutral-400" />}
                  rightIcon={
                    query ? (
                      <button 
                        type="button" 
                        onClick={handleClear}
                        className="text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    ) : null
                  }
                  className="bg-neutral-50 dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700"
                />
              </div>
              <Button 
                type="submit" 
                variant="primary"
                className="ml-2"
              >
                Search
              </Button>
              <Button 
                type="button" 
                variant="outline"
                className="ml-2"
                onClick={onClose}
              >
                Cancel
              </Button>
            </form>
            <div className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
              Search for cryptocurrency names to filter content across all sections.
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};