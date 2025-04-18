import React, { useState, useEffect } from 'react';
import { Twitter, MessageSquare, Newspaper } from 'lucide-react';
import { Tabs, TabPanel } from '../ui/Tabs';
import { PostCard } from '../cards/PostCard';
import { TabType, Tweet, RedditPost, NewsArticle, PostWithLegitimacy } from '../../types';

interface SocialFeedProps {
  tweets: Tweet[];
  redditPosts: RedditPost[];
  newsArticles: NewsArticle[];
  searchQuery?: string;
}

export const SocialFeed: React.FC<SocialFeedProps> = ({
  tweets,
  redditPosts,
  newsArticles,
  searchQuery = '',
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('twitter');
  const [filteredTweets, setFilteredTweets] = useState<PostWithLegitimacy[]>(tweets);
  const [filteredRedditPosts, setFilteredRedditPosts] = useState<PostWithLegitimacy[]>(redditPosts);
  const [filteredNewsArticles, setFilteredNewsArticles] = useState<PostWithLegitimacy[]>(newsArticles);

  useEffect(() => {
    // Filter content based on search query
    if (searchQuery) {
      const lowercasedQuery = searchQuery.toLowerCase();
      
      setFilteredTweets(
        tweets.filter(tweet =>
          tweet.coinMentions.some(coin => coin.toLowerCase().includes(lowercasedQuery)) ||
          tweet.content.toLowerCase().includes(lowercasedQuery)
        )
      );
      
      setFilteredRedditPosts(
        redditPosts.filter(post =>
          post.coinMentions.some(coin => coin.toLowerCase().includes(lowercasedQuery)) ||
          post.content.toLowerCase().includes(lowercasedQuery)
        )
      );
      
      setFilteredNewsArticles(
        newsArticles.filter(article =>
          article.coinMentions.some(coin => coin.toLowerCase().includes(lowercasedQuery)) ||
          article.content.toLowerCase().includes(lowercasedQuery) ||
          (article.title && article.title.toLowerCase().includes(lowercasedQuery))
        )
      );
    } else {
      // If no search query, show all posts
      setFilteredTweets(tweets);
      setFilteredRedditPosts(redditPosts);
      setFilteredNewsArticles(newsArticles);
    }
  }, [searchQuery, tweets, redditPosts, newsArticles]);

  const tabs = [
    {
      id: 'twitter',
      label: 'Tweets',
      icon: <Twitter className="h-4 w-4" />,
    },
    {
      id: 'reddit',
      label: 'Reddit',
      icon: <MessageSquare className="h-4 w-4" />,
    },
    {
      id: 'news',
      label: 'Sentiment Headlines',
      icon: <Newspaper className="h-4 w-4" />,
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <Tabs
        tabs={tabs}
        activeTab={activeTab}
        onChange={(id) => setActiveTab(id as TabType)}
        className="mb-6"
      />
      
      <TabPanel id="twitter" activeTab={activeTab}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTweets.length > 0 ? (
            filteredTweets.map((tweet) => (
              <PostCard key={tweet.id} post={tweet} />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-neutral-500 dark:text-neutral-400">
                No tweets found matching "{searchQuery}".
              </p>
            </div>
          )}
        </div>
      </TabPanel>
      
      <TabPanel id="reddit" activeTab={activeTab}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRedditPosts.length > 0 ? (
            filteredRedditPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-neutral-500 dark:text-neutral-400">
                No Reddit posts found matching "{searchQuery}".
              </p>
            </div>
          )}
        </div>
      </TabPanel>
      
      <TabPanel id="news" activeTab={activeTab}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNewsArticles.length > 0 ? (
            filteredNewsArticles.map((article) => (
              <PostCard key={article.id} post={article} />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-neutral-500 dark:text-neutral-400">
                No news articles found matching "{searchQuery}".
              </p>
            </div>
          )}
        </div>
      </TabPanel>
    </div>
  );
};