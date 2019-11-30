import express, { Request, Response } from 'express';
import compression from 'compression';
import bodyParser from 'body-parser';
import passport from 'passport';

import { setupSequelize } from './db';
import cors from './lib/cors';
import { HttpError } from './lib/Error';

class App {
  app: express.Application;

  constructor() {
    this.app = express();
  }

  async setupApp(): Promise<express.Application> {
    this.configureExpress();
    await setupSequelize();
    await this.configurePassport();
    await this.configureGenericErrorHandling();

    console.log('App started with:');
    console.log('- Node.js', process.version);
    console.log(`- Started with NODE_ENV=${process.env.NODE_ENV}`);

    return this.app;
  }

  private configureExpress(): void {
    this.app.use(cors);
    this.app.use(compression());
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.disable('x-powered-by');
  }

  private async configurePassport(): Promise<void> {
    this.app.use(passport.initialize());
  }

  private async configureGenericErrorHandling(): Promise<void> {
    this.app.use((req: Request, res: Response): void => {
      res.status(404).json({
        message: 'Not found'
      });
    });

    if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
      // Development error handler - will print stacktrace
      this.app.use((error: HttpError, req: Request, res: Response): void => {
        res.status(error.status || 500);
        console.error(error.message);
        res.json({
          message: error.message,
          error: error
        });
      });
    }
    else {
      // Production error handler - no stacktraces leaked to user
      this.app.use((error: HttpError, req: Request, res: Response): void => {
        res.status(error.status || 500);
        console.error(error.message);
        res.json({
          message: error.message
        });
      });
    }
  }
}

export default new App();
