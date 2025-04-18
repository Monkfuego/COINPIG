import React from 'react';
import { motion } from 'framer-motion';
import { PiggyBank } from 'lucide-react';

export const HeroSection: React.FC = () => {
  return (
    <div className="bg-gradient-to-br from-primary-500/10 via-secondary-500/10 to-primary-500/10 dark:from-primary-900/30 dark:via-secondary-900/30 dark:to-primary-900/30 py-16 px-4">
      <div className="container mx-auto text-center max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6 inline-flex items-center justify-center"
        >
          <PiggyBank className="h-12 w-12 text-primary-600 dark:text-primary-400" />
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl md:text-5xl font-bold text-neutral-900 dark:text-white mb-4"
        >
          Crypto Airdrop Intel
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg md:text-xl text-neutral-700 dark:text-neutral-300 mb-8 max-w-2xl mx-auto"
        >
          Aggregated news, Reddit posts, and tweets about top coins with AI-based legitimacy checks
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="inline-flex items-center justify-center"
        >
          <div className="relative p-1 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 shadow-glow">
            <div className="bg-white dark:bg-neutral-900 rounded-full px-4 py-2">
              <span className="text-sm text-neutral-800 dark:text-neutral-300">
                <span className="font-semibold text-primary-600 dark:text-primary-400">Cool Bug</span> - Your crypto intel aggregator
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};