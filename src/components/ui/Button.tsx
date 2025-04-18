import React from 'react';
import { cn } from '../../utils/cn';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'link';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  glow?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
  loading?: boolean;
  children: React.ReactNode;
  className?: string;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-primary-600 text-white hover:bg-primary-700 active:bg-primary-800 disabled:bg-primary-300',
  secondary: 'bg-secondary-600 text-white hover:bg-secondary-700 active:bg-secondary-800 disabled:bg-secondary-300',
  outline: 'border border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 active:bg-neutral-200 dark:active:bg-neutral-700',
  ghost: 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 active:bg-neutral-200 dark:active:bg-neutral-700',
  link: 'text-primary-600 dark:text-primary-400 underline-offset-4 hover:underline p-0 h-auto',
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'text-xs px-2.5 py-1.5 rounded',
  md: 'text-sm px-4 py-2 rounded-md',
  lg: 'text-base px-6 py-3 rounded-md',
};

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  glow = false,
  leftIcon,
  rightIcon,
  fullWidth = false,
  loading = false,
  children,
  className,
  disabled,
  ...props
}) => {
  return (
    <button
      className={cn(
        'font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-neutral-900 disabled:cursor-not-allowed inline-flex items-center justify-center',
        variantClasses[variant],
        sizeClasses[size],
        fullWidth && 'w-full',
        glow && variant === 'primary' && 'shadow-glow',
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}
      {!loading && leftIcon && <span className="mr-2">{leftIcon}</span>}
      {children}
      {!loading && rightIcon && <span className="ml-2">{rightIcon}</span>}
    </button>
  );
};