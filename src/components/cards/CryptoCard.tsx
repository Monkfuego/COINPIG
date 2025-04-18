import React from 'react';
import { TrendingUp, TrendingDown, Info } from 'lucide-react';
import { Card, CardContent } from '../ui/Card';
import { CryptoCoin } from '../../types';
import { formatPrice, formatPercentage, formatNumber } from '../../utils/formatters';
import { cn } from '../../utils/cn';

interface CryptoCardProps {
  coin: CryptoCoin;
  className?: string;
}

export const CryptoCard: React.FC<CryptoCardProps> = ({ coin, className }: CryptoCardProps) => {
  const isPositive = coin.priceChange24h >= 0;

  return (
    <Card className={cn('transition-all duration-300 hover:shadow-lg', className)}>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            {coin.image ? (
              <img src={coin.image} alt={coin.name} className="w-8 h-8 rounded-full mr-3" />
            ) : (
              <div className="w-8 h-8 rounded-full bg-neutral-200 dark:bg-neutral-700 flex items-center justify-center mr-3">
                <span className="text-neutral-700 dark:text-neutral-300 font-medium">
                  {coin.symbol.charAt(0)}
                </span>
              </div>
            )}
            <div>
              <h3 className="font-medium text-neutral-900 dark:text-neutral-100">
                {coin.name}
              </h3>
              <div className="text-sm text-neutral-500 dark:text-neutral-400">
                {coin.symbol.toUpperCase()}
              </div>
            </div>
          </div>
          
          <div className="text-right">
            <div className="font-semibold text-neutral-900 dark:text-neutral-100">
              {formatPrice(coin.price)}
            </div>
            <div className={cn(
              'flex items-center justify-end text-sm',
              isPositive ? 'text-success-600 dark:text-success-400' : 'text-error-600 dark:text-error-400'
            )}>
              {isPositive ? (
                <TrendingUp className="h-3.5 w-3.5 mr-1" />
              ) : (
                <TrendingDown className="h-3.5 w-3.5 mr-1" />
              )}
              <span>{formatPercentage(coin.priceChange24h)}</span>
            </div>
          </div>
        </div>
        
        <div className="flex justify-between mt-4 pt-3 border-t border-neutral-200 dark:border-neutral-700 text-xs text-neutral-500 dark:text-neutral-400">
          <div>
            <div className="mb-1 flex items-center">
              <Info className="h-3 w-3 mr-1" />
              <span>Volume 24h</span>
            </div>
            <div className="font-medium text-neutral-700 dark:text-neutral-300">
              {formatNumber(coin.volume24h)}
            </div>
          </div>
          <div>
            <div className="mb-1 flex items-center">
              <Info className="h-3 w-3 mr-1" />
              <span>Market Cap</span>
            </div>
            <div className="font-medium text-neutral-700 dark:text-neutral-300">
              {formatNumber(coin.marketCap)}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};