import { Request, Response } from 'express';

import { HttpError } from './Error';

export function returnError(error: HttpError, req: Request, res: Response): void {
  console.error(error);
  res.status(error.status || 500).send(error.message || 'An unknown error occurred!');
}
