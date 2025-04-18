// Format cryptocurrency price
export function formatPrice(price: number): string {
  if (price === 0) return '$0.00';
  if (price < 0.01) return `$${price.toFixed(6)}`;
  if (price < 1) return `$${price.toFixed(4)}`;
  if (price < 1000) return `$${price.toFixed(2)}`;
  return `$${price.toLocaleString('en-US', { maximumFractionDigits: 2 })}`;
}

// Format large numbers with K, M, B suffixes
export function formatNumber(num: number): string {
  if (num === 0) return '0';
  if (Math.abs(num) < 1000) return num.toString();
  
  const suffixes = ['', 'K', 'M', 'B', 'T'];
  const suffixIndex = Math.floor(Math.log10(Math.abs(num)) / 3);
  const shortNum = num / Math.pow(10, suffixIndex * 3);
  
  return `${shortNum.toFixed(1)}${suffixes[suffixIndex]}`;
}

// Format percentage
export function formatPercentage(percent: number): string {
  const sign = percent >= 0 ? '+' : '';
  return `${sign}${percent.toFixed(2)}%`;
}

// Format time ago
export function formatTimeAgo(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  let interval = Math.floor(seconds / 31536000);
  if (interval >= 1) return `${interval}y ago`;
  
  interval = Math.floor(seconds / 2592000);
  if (interval >= 1) return `${interval}mo ago`;
  
  interval = Math.floor(seconds / 86400);
  if (interval >= 1) return `${interval}d ago`;
  
  interval = Math.floor(seconds / 3600);
  if (interval >= 1) return `${interval}h ago`;
  
  interval = Math.floor(seconds / 60);
  if (interval >= 1) return `${interval}m ago`;
  
  return 'just now';
}

// Truncate text
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return `${text.substring(0, maxLength)}...`;
}