import { Router, Request, Response } from 'express';

import { returnError } from '../../lib/apiErrorHandling';

import Controller from '../../interfaces/Controller';
import { HttpError } from '../../lib/Error';
import Article from '../../models/Article';


class ArticleController implements Controller {
  router: Router;

  constructor(router: Router) {
    this.router = router;
    this.initilizeRoutes();
  }

  private initilizeRoutes(): void {
    this.router.post('/', this.createArticle);
    this.router.patch('/:id', this.updateArticle);
    this.router.delete('/:id', this.deleteArticle);
  }

  private async createArticle(req: Request, res: Response): Promise<void> {
    try {
      const article = await Article.create(req.body);

      res.json({
        article
      });
    }
    catch(error) {
      returnError(error as HttpError, res);
    }
  }

  private async updateArticle(req: Request, res: Response): Promise<void> {
    try {
      const article = await Article.findByPk(req.params.id);

      await article.update(req.body);

      res.json({
        article
      });
    }
    catch(error) {
      returnError(error as HttpError, res);
    }
  }

  private async deleteArticle(req: Request, res: Response): Promise<void> {
    try {
      await Article.destroy({
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
  new ArticleController(router);
};
