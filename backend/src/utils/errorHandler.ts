import { Request, Response, NextFunction } from 'express';

interface ErrorWithStatus extends Error {
  status?: number;
  statusCode?: number;
  code?: string | number;
}

const errorHandler = (
  err: ErrorWithStatus,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error('Error:', err);

  // Default status code
  let statusCode = 500;

  // Check various error properties that might contain status code
  if (err.status) {
    statusCode = err.status;
  } else if (err.statusCode) {
    statusCode = err.statusCode;
  } else if (err.code === 'ENOENT') {
    statusCode = 404;
  } else if (err.code === 'EACCES') {
    statusCode = 403;
  } else if (err.name === 'ValidationError') {
    statusCode = 400;
  } else if (err.name === 'CastError') {
    statusCode = 400;
  } else if (err.name === 'JsonWebTokenError') {
    statusCode = 401;
  } else if (err.name === 'TokenExpiredError') {
    statusCode = 401;
  }

  // Prepare error message
  const message = err.message || 'Something went wrong';
  
  // Environment-specific error response
  const isDevelopment = process.env.NODE_ENV === 'development';
  
  // In development, send full error details
  if (isDevelopment) {
    res.status(statusCode).json({
      success: false,
      error: {
        message,
        stack: err.stack,
        name: err.name,
        code: err.code
      }
    });
  } else {
    // In production, only send essential information
    res.status(statusCode).json({
      success: false,
      message: statusCode === 500 ? 'Server error' : message
    });
  }
};

export default errorHandler;
