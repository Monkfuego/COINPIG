import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { Button } from './Button';
import { motion } from 'framer-motion';

export const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleTheme}
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      className="rounded-full w-10 h-10 p-0 flex items-center justify-center"
    >
      <motion.div
        initial={{ rotate: 0 }}
        animate={{ rotate: theme === 'dark' ? 180 : 0 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="relative"
      >
        {theme === 'dark' ? (
          <Moon className="h-5 w-5 text-yellow-300" />
        ) : (
          <Sun className="h-5 w-5 text-yellow-500" />
        )}
      </motion.div>
    </Button>
  );
};