

//  未  使用
//  此处定义请求时，抛出的意外错误  格式处理 

import { ExceptionFilter, Catch, ArgumentsHost, HttpException, Logger } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { Request, Response } from 'express';

@Catch(HttpException)
// @Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  
    
  // }
  catch(exception: HttpException, host: ArgumentsHost) {

    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const errMsg = exception.message || HttpException.name

    // console.log("🚀 ~ file: http-exception.ts:15 ~ HttpExceptionFilter ~ exception:", exception)

    let resData = {
      statusCode: status, 
      timestamp: new Date().toLocaleString(), // 转成本地时区时间
      path: request.url,
      error: errMsg
    }
    Logger.error(`请求响应数据出现意外错误, 详细信息: ${JSON.stringify(resData) }`)

    response
      .status(status)
      .json(resData)
    }
}