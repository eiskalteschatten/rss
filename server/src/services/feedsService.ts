import RssParser from 'rss-parser';

import ArticleInterface from '../../../types/Article';

import Article from '../models/Article';
import Feed from '../models/Feed';

export async function refreshAllFeeds(): Promise<ArticleInterface[]> {
  const rssParser = new RssParser();

  const feeds = await Feed.findAll({
    attributes: ['id', 'feedUrl']
  });

  const newArticles = [];

  for (const feed of feeds) {
    const parsedFeed = await rssParser.parseURL(feed.feedUrl);

    for (const article of parsedFeed.items) {
      const articleExists = await Article.findOne({
        where: {
          guid: article.guid
        }
      });

      if (!articleExists) {
        newArticles.push({
          ...article,
          read: false,
          fkFeed: feed.id
        });
      }
    }
  }

  await Article.bulkCreate(newArticles);

  const articles = await Article.findAll({
    where: {
      read: false
    },
    order: [
      ['pubDate', 'DESC']
    ]
  });

  return articles;
}
