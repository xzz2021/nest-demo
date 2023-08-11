//  有时候业务处理很简单 不需要复杂需求   可以使用函数  中间件

import { Request, Response, NextFunction } from 'express';

export function simpleFunction(req: Request, res: Response, next: NextFunction) {
  console.log(`Request...`);
  next();
};


//  使用也很简单  在app.module里使用

// consumer
//   .apply(logger)
//   .forRoutes(CatsController);