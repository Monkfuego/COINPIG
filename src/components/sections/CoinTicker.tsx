import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CryptoCard } from '../cards/CryptoCard';
import { CryptoCoin } from '../../types';
import { motion } from 'framer-motion';

interface CoinTickerProps {
  coins: CryptoCoin[];
}

export const CoinTicker: React.FC<CoinTickerProps> = ({ coins }) => {
  const navigate = useNavigate();

  const handleCoinClick = (coinId: string) => {
    navigate(`/coin/${coinId}`);
  };

  return (
    <div className="w-full overflow-hidden bg-neutral-50 dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800">
      <motion.div
        className="flex py-3 px-4 overflow-x-auto scrollbar-hide"
        initial={{ x: 0 }}
        animate={{ x: [-10, 0] }}
        transition={{
          repeat: Infinity,
          repeatType: "reverse",
          duration: 2,
          ease: "linear",
        }}
      >
        {coins.map((coin) => (
          <div 
            key={coin.id} 
            className="mr-4 flex-shrink-0 min-w-[200px] cursor-pointer"
            onClick={() => handleCoinClick(coin.id)}
          >
            <CryptoCard coin={coin} />
          </div>
        ))}
      </motion.div>
    </div>
  );
};