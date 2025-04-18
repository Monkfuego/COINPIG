import { CryptoCoin, Tweet, RedditPost, NewsArticle, LegitimacyCheck } from '../types';

// Mock Crypto Data
export const mockCoins: CryptoCoin[] = [
  {
    id: 'bitcoin',
    name: 'Bitcoin',
    symbol: 'BTC',
    price: 68431.52,
    priceChange24h: 2.34,
    volume24h: 42587325642,
    marketCap: 1345876543210,
    image: 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png'
  },
  {
    id: 'ethereum',
    name: 'Ethereum',
    symbol: 'ETH',
    price: 3471.89,
    priceChange24h: -1.23,
    volume24h: 18965478523,
    marketCap: 417852347890,
    image: 'https://assets.coingecko.com/coins/images/279/large/ethereum.png'
  },
  {
    id: 'solana',
    name: 'Solana',
    symbol: 'SOL',
    price: 172.45,
    priceChange24h: 5.67,
    volume24h: 5674321098,
    marketCap: 78654321098,
    image: 'https://assets.coingecko.com/coins/images/4128/large/solana.png'
  },
  {
    id: 'cardano',
    name: 'Cardano',
    symbol: 'ADA',
    price: 0.56,
    priceChange24h: -0.45,
    volume24h: 1234567890,
    marketCap: 19876543210,
    image: 'https://assets.coingecko.com/coins/images/975/large/cardano.png'
  },
  {
    id: 'ripple',
    name: 'XRP',
    symbol: 'XRP',
    price: 0.58,
    priceChange24h: 1.45,
    volume24h: 2345678901,
    marketCap: 31234567890,
    image: 'https://assets.coingecko.com/coins/images/44/large/xrp-symbol-white-128.png'
  }
];

// Mock Legitimacy Checks
const legitimacyChecks: Record<string, LegitimacyCheck> = {
  legitimate: {
    isLegitimate: true,
    confidence: 0.92,
    reason: 'Official project with verified team and clear tokenomics.'
  },
  suspicious: {
    isLegitimate: false,
    confidence: 0.78,
    reason: 'No clear team identity, excessive token supply.'
  },
  scam: {
    isLegitimate: false,
    confidence: 0.95,
    reason: 'Known scam pattern, urgent pressure tactics.'
  },
  unknown: {
    isLegitimate: false,
    confidence: 0.65,
    reason: 'Insufficient information to verify.'
  }
};

// Mock Tweets
export const mockTweets: Tweet[] = [
  {
    id: 't1',
    platform: 'twitter',
    coinMentions: ['bitcoin', 'ethereum'],
    content: 'Bitcoin breaking $70K soon! ETH will follow. The market is heating up! 🚀',
    timestamp: '2023-05-15T14:23:45Z',
    username: 'cryptoanalyst',
    profileImage: 'https://randomuser.me/api/portraits/men/22.jpg',
    mentionsAirdrop: false,
    retweets: 142,
    likes: 578
  },
  {
    id: 't2',
    platform: 'twitter',
    coinMentions: ['solana'],
    content: 'New Solana airdrop! The Jupiter Protocol is giving away 1000 JUP tokens to early supporters. Check eligibility at jupiternft.io',
    timestamp: '2023-05-15T10:12:30Z',
    username: 'solanadev',
    profileImage: 'https://randomuser.me/api/portraits/women/15.jpg',
    mentionsAirdrop: true,
    retweets: 320,
    likes: 1203
  },
  {
    id: 't3',
    platform: 'twitter',
    coinMentions: ['cardano'],
    content: 'Cardano ecosystem is growing fast! New projects launching every week. ADA looking strong for Q3.',
    timestamp: '2023-05-14T22:45:10Z',
    username: 'ada_enthusiast',
    profileImage: 'https://randomuser.me/api/portraits/men/35.jpg',
    mentionsAirdrop: false,
    retweets: 56,
    likes: 211
  },
  {
    id: 't4',
    platform: 'twitter',
    coinMentions: ['ethereum'],
    content: 'BREAKING: Ethereum Vortex airdrop announced! Claim 1000 VTX tokens in the next 24 hours only by connecting your wallet at vortexfinance-eth.io',
    timestamp: '2023-05-14T18:37:22Z',
    username: 'eth_insider',
    profileImage: 'https://randomuser.me/api/portraits/women/22.jpg',
    mentionsAirdrop: true,
    retweets: 890,
    likes: 2431
  },
  {
    id: 't5',
    platform: 'twitter',
    coinMentions: ['ripple'],
    content: 'XRP community alert: RippleX airdropping tokens to long-term holders. Check the official Ripple blog for details.',
    timestamp: '2023-05-13T15:09:45Z',
    username: 'xrp_news',
    profileImage: 'https://randomuser.me/api/portraits/men/18.jpg',
    mentionsAirdrop: true,
    retweets: 425,
    likes: 1580
  }
];

// Mock Reddit Posts
export const mockRedditPosts: RedditPost[] = [
  {
    id: 'r1',
    platform: 'reddit',
    coinMentions: ['bitcoin'],
    content: 'Technical analysis: BTC forming a strong support at $65K level. Next resistance at $72K.',
    timestamp: '2023-05-15T08:45:23Z',
    username: 'btc_trader_pro',
    subreddit: 'r/CryptoCurrency',
    profileImage: 'https://randomuser.me/api/portraits/men/45.jpg',
    mentionsAirdrop: false,
    upvotes: 342,
    comments: 89
  },
  {
    id: 'r2',
    platform: 'reddit',
    coinMentions: ['ethereum'],
    content: 'ATTENTION: New airdrop for ETH stakers. The Ethereum Nova project is distributing 50M NOVA tokens to anyone who has staked ETH before May 1st. Check eligibility at novafinance.io',
    timestamp: '2023-05-14T16:23:10Z',
    username: 'degen_yield_farmer',
    subreddit: 'r/ethereum',
    profileImage: 'https://randomuser.me/api/portraits/women/32.jpg',
    mentionsAirdrop: true,
    upvotes: 876,
    comments: 234
  },
  {
    id: 'r3',
    platform: 'reddit',
    coinMentions: ['solana'],
    content: 'Solana ecosystem review: Current state and future prospects. The growth has been incredible despite occasional network issues.',
    timestamp: '2023-05-14T12:10:45Z',
    username: 'sol_researcher',
    subreddit: 'r/solana',
    profileImage: 'https://randomuser.me/api/portraits/men/28.jpg',
    mentionsAirdrop: false,
    upvotes: 221,
    comments: 67
  },
  {
    id: 'r4',
    platform: 'reddit',
    coinMentions: ['cardano'],
    content: 'New Cardano airdrop: CardStarter is rewarding ADA holders with a surprise token distribution. Connect your wallet to cardstarter.cardano-airdrops.io to claim!',
    timestamp: '2023-05-13T22:34:56Z',
    username: 'ada_whale',
    subreddit: 'r/cardano',
    profileImage: 'https://randomuser.me/api/portraits/women/41.jpg',
    mentionsAirdrop: true,
    upvotes: 543,
    comments: 187
  },
  {
    id: 'r5',
    platform: 'reddit',
    coinMentions: ['ripple'],
    content: 'XRP legal case update: SEC negotiations entering final phase. What this means for XRP price.',
    timestamp: '2023-05-13T14:23:12Z',
    username: 'crypto_lawyer',
    subreddit: 'r/Ripple',
    profileImage: 'https://randomuser.me/api/portraits/men/51.jpg',
    mentionsAirdrop: false,
    upvotes: 654,
    comments: 142
  }
];

// Mock News Articles
export const mockNewsArticles: NewsArticle[] = [
  {
    id: 'n1',
    platform: 'news',
    coinMentions: ['bitcoin', 'ethereum'],
    title: 'Bitcoin Surges Past $65K as Institutional Adoption Continues',
    content: 'Bitcoin has rallied past $65,000 as more institutional players enter the market. Ethereum also showing strength.',
    timestamp: '2023-05-15T09:23:45Z',
    username: 'CoinDesk',
    source: 'CoinDesk',
    url: 'https://www.coindesk.com/bitcoin-65k',
    profileImage: 'https://example.com/coindesk-logo.png',
    mentionsAirdrop: false,
    sentiment: 'positive'
  },
  {
    id: 'n2',
    platform: 'news',
    coinMentions: ['ethereum'],
    title: 'Ethereum Foundation Announces Grants for Layer 2 Development',
    content: 'The Ethereum Foundation has allocated $30 million in grants to accelerate development of Layer 2 solutions.',
    timestamp: '2023-05-14T16:45:12Z',
    username: 'CryptoNews',
    source: 'CryptoNews',
    url: 'https://www.cryptonews.com/ethereum-foundation-grants',
    profileImage: 'https://example.com/cryptonews-logo.png',
    mentionsAirdrop: false,
    sentiment: 'positive'
  },
  {
    id: 'n3',
    platform: 'news',
    coinMentions: ['solana'],
    title: 'Solana-Based Projects Announce Coordinated Airdrops',
    content: 'Five major Solana-based DeFi protocols have announced a coordinated series of airdrops for Q3 2023, rewarding early ecosystem participants.',
    timestamp: '2023-05-14T12:12:34Z',
    username: 'DeFi Pulse',
    source: 'DeFi Pulse',
    url: 'https://www.defipulse.com/solana-airdrops',
    profileImage: 'https://example.com/defipulse-logo.png',
    mentionsAirdrop: true,
    sentiment: 'positive'
  },
  {
    id: 'n4',
    platform: 'news',
    coinMentions: ['cardano'],
    title: 'Cardano Smart Contract Volume Hits New All-Time High',
    content: 'Cardano\'s smart contract usage has reached a new all-time high, with over 2,000 contracts deployed in May alone.',
    timestamp: '2023-05-13T22:34:56Z',
    username: 'AltcoinBuzz',
    source: 'AltcoinBuzz',
    url: 'https://www.altcoinbuzz.com/cardano-contracts',
    profileImage: 'https://example.com/altcoinbuzz-logo.png',
    mentionsAirdrop: false,
    sentiment: 'positive'
  },
  {
    id: 'n5',
    platform: 'news',
    coinMentions: ['ripple'],
    title: 'Warning: Fake XRP Airdrop Scams on the Rise',
    content: 'Security researchers have identified multiple fake XRP airdrop campaigns attempting to steal users\' private keys. Users are advised to only trust official Ripple channels.',
    timestamp: '2023-05-13T18:45:23Z',
    username: 'CryptoPotato',
    source: 'CryptoPotato',
    url: 'https://www.cryptopotato.com/xrp-scam-warning',
    profileImage: 'https://example.com/cryptopotato-logo.png',
    mentionsAirdrop: true,
    sentiment: 'negative'
  }
];

// Map legitimacy checks to mock data
export const getPostWithLegitimacy = (post: Tweet | RedditPost | NewsArticle) => {
  if (!post.mentionsAirdrop) return post;
  
  let checkType: keyof typeof legitimacyChecks;
  
  // Assign legitimacy check based on post content patterns
  if (post.content.includes('official') || post.content.includes('Foundation')) {
    checkType = 'legitimate';
  } else if (post.content.includes('connect your wallet') || post.content.includes('.io')) {
    checkType = 'suspicious';
  } else if (post.content.includes('24 hours') || post.content.includes('urgently')) {
    checkType = 'scam';
  } else {
    checkType = 'unknown';
  }
  
  return {
    ...post,
    legitimacyCheck: legitimacyChecks[checkType]
  };
};

// Get mock data with legitimacy checks
export const getMockDataWithLegitimacy = () => {
  return {
    tweets: mockTweets.map(getPostWithLegitimacy),
    redditPosts: mockRedditPosts.map(getPostWithLegitimacy),
    newsArticles: mockNewsArticles.map(getPostWithLegitimacy)
  };
};