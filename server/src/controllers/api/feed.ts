import { Router, Request, Response } from 'express';

import { returnError } from '../../lib/apiErrorHandling';

import Controller from '../../interfaces/Controller';
import { HttpError } from '../../lib/Error';
import { refreshForSingleFeed } from '../../services/feedsService';

import Feed from '../../models/Feed';
import Folder from '../../models/Folder';


class FeedController implements Controller {
  router: Router;

  constructor(router: Router) {
    this.router = router;
    this.initilizeRoutes();
  }

  private initilizeRoutes(): void {
    this.router.get('/', this.getAllFeeds);
    this.router.post('/', this.createFeed);
    this.router.patch('/:id', this.updateFeed);
    this.router.delete('/:id', this.deleteFeed);
  }

  private async getAllFeeds(req: Request, res: Response): Promise<void> {
    try {
      const feeds = await Feed.findAll({
        order: [
          ['name', 'DESC']
        ],
        include: [
          {
            model: Folder,
            as: 'folder',
            attributes: ['id', 'name']
          }
        ]
      });

      res.json({ feeds });
    }
    catch(error) {
      returnError(error as HttpError, res);
    }
  }

  private async createFeed(req: Request, res: Response): Promise<void> {
    try {
      const feed = await Feed.create({
        feedUrl: req.body.feedUrl
      });

      const refreshed = await refreshForSingleFeed(feed.id);

      await feed.update({
        name: refreshed.parsedFeed.title,
        link: refreshed.parsedFeed.link,
        fkFolder: req.body.fkFolder
      });

      res.json({
        feed,
        articles: refreshed.articles
      });
    }
    catch(error) {
      returnError(error as HttpError, res);
    }
  }

  private async updateFeed(req: Request, res: Response): Promise<void> {
    try {
      const feed = await Feed.findByPk(req.params.id);

      await feed.update(req.body);

      res.json({ feed });
    }
    catch(error) {
      returnError(error as HttpError, res);
    }
  }

  private async deleteFeed(req: Request, res: Response): Promise<void> {
    try {
      await Feed.destroy({
        where: {
          id: req.params.id
        }
      });

      res.status(204).send('');
    }
    catch(error) {
      returnError(error as HttpError, res);
    }
  }
}

export default (router: Router): void => {
  new FeedController(router);
};
