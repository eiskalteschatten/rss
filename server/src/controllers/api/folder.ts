import { Router, Request, Response } from 'express';

import { returnError } from '../../lib/apiErrorHandling';

import Controller from '../../interfaces/Controller';
import { HttpError } from '../../lib/Error';
import Folder from '../../models/Folder';


class FolderController implements Controller {
  router: Router;

  constructor(router: Router) {
    this.router = router;
    this.initilizeRoutes();
  }

  private initilizeRoutes(): void {
    this.router.post('/', this.createFolder);
    this.router.patch('/:id', this.updateFolder);
    this.router.delete('/:id', this.deleteFolder);
  }

  private async createFolder(req: Request, res: Response): Promise<void> {
    try {
      const folder = await Folder.create(req.body);

      res.json({
        folder
      });
    }
    catch(error) {
      returnError(error as HttpError, res);
    }
  }

  private async updateFolder(req: Request, res: Response): Promise<void> {
    try {
      const folder = await Folder.findByPk(req.params.id);

      await folder.update(req.body);

      res.json({
        folder
      });
    }
    catch(error) {
      returnError(error as HttpError, res);
    }
  }

  private async deleteFolder(req: Request, res: Response): Promise<void> {
    try {
      await Folder.destroy({
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
  new FolderController(router);
};
