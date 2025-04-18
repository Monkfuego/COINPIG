// General App Types
export interface User {
  id: string;
  username: string;
  email: string;
}

// Crypto Data Types
export interface CryptoCoin {
  id: string;
  name: string;
  symbol: string;
  price: number;
  priceChange24h: number;
  volume24h: number;
  marketCap: number;
  image?: string;
}

// Social Media Post Types
export interface BasePost {
  id: string;
  coinMentions: string[];
  content: string;
  timestamp: string;
  username: string;
  profileImage?: string;
  mentionsAirdrop: boolean;
  platform: 'twitter' | 'reddit' | 'news';
}

export interface Tweet extends BasePost {
  platform: 'twitter';
  retweets?: number;
  likes?: number;
}

export interface RedditPost extends BasePost {
  platform: 'reddit';
  subreddit: string;
  upvotes?: number;
  comments?: number;
}

export interface NewsArticle extends BasePost {
  platform: 'news';
  source: string;
  title: string;
  url: string;
  sentiment?: 'positive' | 'negative' | 'neutral';
}

// AI Legitimacy Check
export interface LegitimacyCheck {
  isLegitimate: boolean;
  confidence: number;
  reason: string;
}

// Combined Post with Legitimacy
export interface PostWithLegitimacy extends BasePost {
  legitimacyCheck?: LegitimacyCheck;
}

export type TabType = 'twitter' | 'reddit' | 'news';

// Auth Types
export interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
}

// Theme
export type ThemeType = 'light' | 'dark';