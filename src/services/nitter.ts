import axios from 'axios';
import * as cheerio from 'cheerio';

export async function scrapeNitter(query: string, instance = 'https://nitter.net', limit = 5) {
  const searchUrl = `${instance}/search?f=tweets&q=${encodeURIComponent(query)}&since=&until=&near=`;

  try {
    const response = await axios.get(searchUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0'
      }
    });

    const $ = cheerio.load(response.data);
    const tweets = [];

    $('.timeline-item').slice(0, limit).each((i, el) => {
      const username = $(el).find('a.username').text().trim().replace('@', '');
      const displayName = $(el).find('a.fullname').text().trim();
      const content = $(el).find('.tweet-content').text().trim();
      const date = $(el).find('.tweet-date').text().trim();
      const tweetPath = $(el).find('a.tweet-link').attr('href');
      const profileImg = $(el).find('a.avatar img').attr('src');
      const tweetUrl = tweetPath ? `https://twitter.com${tweetPath}` : '';
      const profileUrl = `${instance}/${username}`;

      tweets.push({
        displayName,
        username,
        profileImage: profileImg ? (profileImg.startsWith('http') ? profileImg : instance + profileImg) : null,
        content,
        date,
        tweetUrl,
        profileUrl
      });
    });

    return tweets;
  } catch (err) {
    console.error('Error scraping Nitter:', err);
    return [];
  }
}