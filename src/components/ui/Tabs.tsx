import React, { useState } from 'react';
import { cn } from '../../utils/cn';
import { motion } from 'framer-motion';

interface TabProps {
  id: string;
  label: React.ReactNode;
  icon?: React.ReactNode;
  isActive?: boolean;
  onClick?: () => void;
}

export const Tab: React.FC<TabProps> = ({ label, icon, isActive = false, onClick }) => {
  return (
    <button
      className={cn(
        'flex items-center px-4 py-2 space-x-2 font-medium border-b-2 transition-colors duration-200',
        isActive
          ? 'border-primary-500 text-primary-600 dark:text-primary-400'
          : 'border-transparent text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-200'
      )}
      onClick={onClick}
      type="button"
    >
      {icon && <span>{icon}</span>}
      <span>{label}</span>
    </button>
  );
};

interface TabsProps {
  tabs: {
    id: string;
    label: React.ReactNode;
    icon?: React.ReactNode;
  }[];
  activeTab: string;
  onChange: (id: string) => void;
  className?: string;
  animate?: boolean;
}

export const Tabs: React.FC<TabsProps> = ({
  tabs,
  activeTab,
  onChange,
  className,
  animate = true,
}) => {
  return (
    <div className={cn('relative border-b border-neutral-200 dark:border-neutral-700', className)}>
      <div className="flex space-x-4 overflow-x-auto">
        {tabs.map((tab) => (
          <Tab
            key={tab.id}
            id={tab.id}
            label={tab.label}
            icon={tab.icon}
            isActive={activeTab === tab.id}
            onClick={() => onChange(tab.id)}
          />
        ))}
      </div>
      {animate && (
        <motion.div
          className="absolute bottom-0 h-0.5 bg-primary-500 dark:bg-primary-400"
          initial={false}
          animate={{
            left: tabs.findIndex((tab) => tab.id === activeTab) * 100,
            width: `calc(100% / ${tabs.length})`,
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        />
      )}
    </div>
  );
};

interface TabContentProps {
  children: React.ReactNode;
  className?: string;
}

export const TabContent: React.FC<TabContentProps> = ({ children, className }) => {
  return <div className={cn('py-4', className)}>{children}</div>;
};

interface TabPanelProps {
  children: React.ReactNode;
  id: string;
  activeTab: string;
  animate?: boolean;
}

export const TabPanel: React.FC<TabPanelProps> = ({ 
  children, 
  id, 
  activeTab,
  animate = true
}) => {
  if (id !== activeTab) return null;
  
  if (animate) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        transition={{ duration: 0.2 }}
      >
        {children}
      </motion.div>
    );
  }
  
  return <>{children}</>;
};