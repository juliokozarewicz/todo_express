import { Request, Response, NextFunction } from 'express';

// create error function
//------------------------------------------------------------------------
export interface CustomErrorOptions {
  message: string;
  code: number;
  next?: string;
  prev?: string;
}

export function createCustomError({
  message,
  code,
  next,
  prev,
}: CustomErrorOptions): Error & { code?: number; next?: string; prev?: string } {
  const error = new Error(message) as Error & { code?: number; next?: string; prev?: string };
  error.code = code;
  error.name = 'CustomErrorHandler';
  error.next = next;
  error.prev = prev;
  return error;
}
//------------------------------------------------------------------------

// middleware error
//------------------------------------------------------------------------
const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): void => {

  // create custom error
  //------------------------------------------------------------------------
  if (err.name === 'CustomErrorHandler') {
    res.status(err.code).json({
      status: "error",
      statusCode: err.code,
      message: err.message || "bad request",
      links: {
        self: req.originalUrl,
        next: err.next || null,
        prev: err.prev || null,
      }
    });
    return;
  }
  //------------------------------------------------------------------------

  // server error
  //------------------------------------------------------------------------
  res.status(500).json({
    status: "error",
    statusCode: 500,
    message: "An error has occurred, please try again later",
    links: {
      self: req.originalUrl,
      next: '/',
      prev: '/',
    }
  });
  //------------------------------------------------------------------------
};

export default errorHandler;
//------------------------------------------------------------------------