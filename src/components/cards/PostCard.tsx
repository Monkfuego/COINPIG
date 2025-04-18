import React from 'react';
import { Twitter, MessageSquare, ThumbsUp, AlertTriangle, Check } from 'lucide-react';
import { Card, CardContent, CardFooter } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { cn } from '../../utils/cn';
import { PostWithLegitimacy, Tweet, RedditPost, NewsArticle } from '../../types';
import { formatTimeAgo, truncateText } from '../../utils/formatters';

interface PostCardProps {
  post: PostWithLegitimacy;
  className?: string;
}

const getPlatformIcon = (platform: string) => {
  switch (platform) {
    case 'twitter':
      return <Twitter className="h-4 w-4 text-blue-400" />;
    case 'reddit':
      return <div className="h-4 w-4 text-orange-500">r/</div>;
    case 'news':
      return <div className="h-4 w-4 text-purple-500">N</div>;
    default:
      return null;
  }
};

const getCoinBadges = (coinMentions: string[]) => {
  return coinMentions.map((coin) => (
    <Badge key={coin} variant="secondary" className="mr-1 mb-1">
      {coin.charAt(0).toUpperCase() + coin.slice(1)}
    </Badge>
  ));
};

export const PostCard: React.FC<PostCardProps> = ({ post, className }) => {
  // Cast to appropriate type based on platform
  const tweetDetails = post.platform === 'twitter' ? (post as Tweet) : null;
  const redditDetails = post.platform === 'reddit' ? (post as RedditPost) : null;
  const newsDetails = post.platform === 'news' ? (post as NewsArticle) : null;

  return (
    <Card
      className={cn('h-full transition-all duration-300 hover:shadow-lg', className)}
      animate
    >
      <CardContent className="pt-5">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center">
            <div className="flex-shrink-0 mr-2">
              {post.profileImage ? (
                <img
                  src={post.profileImage}
                  alt={post.username}
                  className="w-8 h-8 rounded-full"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-500 text-xs">{post.username.charAt(0).toUpperCase()}</span>
                </div>
              )}
            </div>
            <div>
              <div className="flex items-center">
                <span className="font-medium text-sm text-neutral-900 dark:text-neutral-100">
                  {post.username}
                </span>
                <div className="ml-1.5 text-xs text-neutral-500">
                  {redditDetails && <span className="ml-1">in {redditDetails.subreddit}</span>}
                </div>
              </div>
              <div className="flex items-center text-xs text-neutral-500">
                <span>{formatTimeAgo(post.timestamp)}</span>
                <span className="mx-1">•</span>
                <div className="flex items-center">
                  {getPlatformIcon(post.platform)}
                </div>
              </div>
            </div>
          </div>
          
          {post.mentionsAirdrop && post.legitimacyCheck && (
            <Badge 
              variant={post.legitimacyCheck.isLegitimate ? 'success' : 'error'}
              glow={post.legitimacyCheck.isLegitimate}
              className="ml-2 flex items-center"
            >
              {post.legitimacyCheck.isLegitimate ? (
                <>
                  <Check className="w-3 h-3 mr-1" /> Verified
                </>
              ) : (
                <>
                  <AlertTriangle className="w-3 h-3 mr-1" /> Suspicious
                </>
              )}
            </Badge>
          )}
        </div>
        
        {newsDetails && (
          <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
            {newsDetails.title}
          </h3>
        )}
        
        <p className="text-sm mb-3 text-neutral-700 dark:text-neutral-300">
          {truncateText(post.content, 150)}
        </p>
        
        <div className="flex flex-wrap mb-2">
          {getCoinBadges(post.coinMentions)}
        </div>
        
        {post.mentionsAirdrop && post.legitimacyCheck && (
          <div className="text-xs italic text-neutral-500 dark:text-neutral-400 mt-1 mb-2">
            {post.legitimacyCheck.reason}
          </div>
        )}
      </CardContent>
      
      <CardFooter className="py-3 border-t border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-850">
        <div className="w-full flex items-center justify-between text-xs text-neutral-500">
          {tweetDetails && (
            <div className="flex space-x-4">
              <div className="flex items-center">
                <MessageSquare className="h-3.5 w-3.5 mr-1" />
                <span>{tweetDetails.retweets}</span>
              </div>
              <div className="flex items-center">
                <ThumbsUp className="h-3.5 w-3.5 mr-1" />
                <span>{tweetDetails.likes}</span>
              </div>
            </div>
          )}
          
          {redditDetails && (
            <div className="flex space-x-4">
              <div className="flex items-center">
                <ThumbsUp className="h-3.5 w-3.5 mr-1" />
                <span>{redditDetails.upvotes}</span>
              </div>
              <div className="flex items-center">
                <MessageSquare className="h-3.5 w-3.5 mr-1" />
                <span>{redditDetails.comments}</span>
              </div>
            </div>
          )}
          
          {newsDetails && (
            <a 
              href={newsDetails.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-secondary-600 hover:text-secondary-800 dark:text-secondary-400 dark:hover:text-secondary-300"
            >
              Read more on {newsDetails.source}
            </a>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};