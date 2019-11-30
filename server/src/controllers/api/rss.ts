import { Router, Request, Response } from 'express';

import { returnError } from '../../lib/apiErrorHandling';

import Controller from '../../interfaces/Controller';
import { HttpError } from '../../lib/Error';


class RssController implements Controller {
    public router: Router;

    public constructor(router: Router) {
        this.router = router;
        this.initilizeRoutes();
    }

    private initilizeRoutes(): void {
        this.router.get('/', this.getIndex);
    }

    private getIndex(req: Request, res: Response): void {
        const random: number = Math.floor(Math.random() * Math.floor(2));

        // If random === 0, throw an error just for demonstration purposes
        if (random === 0) {
            const error: HttpError = {
                name: 'Teapot Problem',
                status: 418,
                message: 'I am a teapot'
            };

            return returnError(error, req, res);
        }

        res.json({
            message: 'success'
        });
    }
}

export default (router: Router): void => {
    new RssController(router);
};
