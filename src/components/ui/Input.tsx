import React, { forwardRef } from 'react';
import { cn } from '../../utils/cn';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, leftIcon, rightIcon, fullWidth = false, ...props }, ref) => {
    return (
      <div className={cn('relative', fullWidth && 'w-full')}>
        {label && (
          <label
            className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1"
            htmlFor={props.id}
          >
            {label}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              {leftIcon}
            </div>
          )}
          <input
            className={cn(
              'block rounded-md border-neutral-300 dark:border-neutral-700 shadow-sm',
              'focus:border-primary-500 focus:ring-primary-500 dark:focus:border-primary-500 dark:focus:ring-primary-500',
              'dark:bg-neutral-800 dark:text-white',
              leftIcon && 'pl-10',
              rightIcon && 'pr-10',
              error && 'border-error-300 dark:border-error-700',
              fullWidth && 'w-full',
              className
            )}
            ref={ref}
            {...props}
          />
          {rightIcon && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              {rightIcon}
            </div>
          )}
        </div>
        {error && (
          <p className="mt-1 text-sm text-error-600 dark:text-error-400">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';