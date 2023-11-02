import { NextFunction, Request, Response } from "express";

export function controllerWrapper<T>(
  func: (req: Request, res: Response, next?: NextFunction) => Promise<T>
) {
  return async (req: Request, res: Response, next?: NextFunction) => {
    try {
      const result = await func(req, res, next);
      return res.status(200).json({
        succeed: true,
        data: result,
      });
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).json({
          succeed: false,
          error: err.message,
          data: null,
        });
      }
      res.status(500).json({
        succeed: false,
        error: err,
        data: null,
      });
    }
  };
}
