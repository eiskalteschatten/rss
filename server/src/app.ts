import express, { Request, Response } from 'express';
import enrouten from 'express-enrouten';
import compression from 'compression';
import bodyParser from 'body-parser';
import passport from 'passport';
import path from 'path';

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
    this.configurePassport();
    this.configureRoutes();
    this.configureGenericErrorHandling();

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

  private configurePassport(): void {
    this.app.use(passport.initialize());
  }

  private configureRoutes(): void {
    const publicFolder: string = path.resolve(__dirname, '../public');
    this.app.use(express.static(publicFolder));

    this.app.use(enrouten({
      directory: 'controllers'
    }));
  }

  private configureGenericErrorHandling(): void {
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
