import React from 'react';
import { cn } from '../../utils/cn';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  animate?: boolean;
}

export const Card: React.FC<CardProps> = ({ children, className, animate = false }) => {
  const cardContent = (
    <div
      className={cn(
        'bg-white dark:bg-neutral-800 rounded-lg shadow-md overflow-hidden',
        'border border-neutral-200 dark:border-neutral-700',
        className
      )}
    >
      {children}
    </div>
  );

  if (animate) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.3 }}
      >
        {cardContent}
      </motion.div>
    );
  }

  return cardContent;
};

export const CardHeader: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className,
}) => (
  <div
    className={cn(
      'px-6 py-4 border-b border-neutral-200 dark:border-neutral-700',
      className
    )}
  >
    {children}
  </div>
);

export const CardTitle: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className,
}) => (
  <h3 className={cn('text-lg font-semibold text-neutral-900 dark:text-white', className)}>
    {children}
  </h3>
);

export const CardContent: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className,
}) => (
  <div className={cn('px-6 py-4', className)}>
    {children}
  </div>
);

export const CardFooter: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className,
}) => (
  <div
    className={cn(
      'px-6 py-4 border-t border-neutral-200 dark:border-neutral-700',
      className
    )}
  >
    {children}
  </div>
);