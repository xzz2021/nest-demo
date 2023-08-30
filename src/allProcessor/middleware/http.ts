//  中间件 定义  处理请求响应 的中间处理函数 
//  中间件 需要在入口module模块的导出里 implements 使用

import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class HttpMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // console.log('Request...');
    next();
  }
}
