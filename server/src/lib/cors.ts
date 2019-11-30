import { Request, Response, NextFunction } from 'express';
import config from 'config';

export default (req: Request, res: Response, next: NextFunction): void => {
  const origin = req.headers.origin as string;
  const allowedOrigins = config.get<string[]>('cors.allowedOrigins');

  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }

  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, PATCH, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');

  next();
};
