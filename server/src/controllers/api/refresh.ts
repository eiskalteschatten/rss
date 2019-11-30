import { Router, Request, Response } from 'express';

import { returnError } from '../../lib/apiErrorHandling';
import Controller from '../../interfaces/Controller';
import { HttpError } from '../../lib/Error';
import { refreshAllFeeds, refreshForSingleFeed } from '../../services/feedsService';

class RefreshController implements Controller {
  router: Router;

  constructor(router: Router) {
    this.router = router;
    this.initilizeRoutes();
  }

  private initilizeRoutes(): void {
    this.router.post('/', this.refreshAllFeeds);
    this.router.post('/:feedId', this.refreshSingleFeed);
  }

  private async refreshAllFeeds(req: Request, res: Response): Promise<void> {
    try {
      const articles = await refreshAllFeeds();
      res.json({ articles });
    }
    catch(error) {
      returnError(error as HttpError, res);
    }
  }

  private async refreshSingleFeed(req: Request, res: Response): Promise<void> {
    try {
      const feedId = parseInt(req.params.feedId);
      const articles = await refreshForSingleFeed(feedId);
      res.json({ articles });
    }
    catch(error) {
      returnError(error as HttpError, res);
    }
  }
}

export default (router: Router): void => {
  new RefreshController(router);
};
