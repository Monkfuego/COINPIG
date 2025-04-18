import React from 'react';
import { cn } from '../../utils/cn';

type BadgeVariant = 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error';

interface BadgeProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
  className?: string;
  glow?: boolean;
}

const variantClasses: Record<BadgeVariant, string> = {
  default: 'bg-neutral-100 text-neutral-800 dark:bg-neutral-800 dark:text-neutral-100',
  primary: 'bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-100',
  secondary: 'bg-secondary-100 text-secondary-800 dark:bg-secondary-900 dark:text-secondary-100',
  success: 'bg-success-100 text-success-800 dark:bg-success-900 dark:text-success-100',
  warning: 'bg-warning-100 text-warning-800 dark:bg-warning-900 dark:text-warning-100',
  error: 'bg-error-100 text-error-800 dark:bg-error-900 dark:text-error-100',
};

export const Badge: React.FC<BadgeProps> = ({
  variant = 'default',
  children,
  className,
  glow = false,
}) => {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
        variantClasses[variant],
        glow && variant === 'primary' && 'shadow-glow',
        className
      )}
    >
      {children}
    </span>
  );
};