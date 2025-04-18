import React, { useState } from 'react';
import { Header } from '../components/layout/Header';
import { SearchBar } from '../components/layout/SearchBar';
import { HeroSection } from '../components/sections/HeroSection';
import { CoinTicker } from '../components/sections/CoinTicker';
import { SocialFeed } from '../components/sections/SocialFeed';
import { mockCoins, getMockDataWithLegitimacy } from '../utils/mockData';

export const Dashboard: React.FC = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { tweets, redditPosts, newsArticles } = getMockDataWithLegitimacy();
  
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-900 flex flex-col">
      <Header
        onToggleSearch={() => setIsSearchOpen(!isSearchOpen)}
        isSearchOpen={isSearchOpen}
      />
      
      <div className="relative">
        <SearchBar
          isOpen={isSearchOpen}
          onClose={() => setIsSearchOpen(false)}
          onSearch={handleSearch}
        />
      </div>
      
      <HeroSection />
      
      <CoinTicker coins={mockCoins} />
      
      <main className="flex-1">
        <SocialFeed 
          tweets={tweets}
          redditPosts={redditPosts}
          newsArticles={newsArticles}
          searchQuery={searchQuery}
        />
      </main>
      
      <footer className="bg-neutral-100 dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-800 py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-sm text-neutral-500 dark:text-neutral-400">
                © 2025 Crypto Airdrop Intel (Coin Pig). All rights reserved.
              </p>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-sm text-neutral-500 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400">
                Terms
              </a>
              <a href="#" className="text-sm text-neutral-500 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400">
                Privacy
              </a>
              <a href="#" className="text-sm text-neutral-500 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400">
                Contact
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};