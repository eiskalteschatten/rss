import { Response } from 'express';

import { HttpError } from './Error';

export function returnError(error: HttpError, res: Response): void {
  console.error(error);

  res.status(error.status || 500).json({
    message: error.message || 'An error occurred'
  });
}
