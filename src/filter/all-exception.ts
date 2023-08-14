
//  此处定义请求时，所有抛出的意外错误  格式化处理 

import { ExceptionFilter, Catch, ArgumentsHost, HttpException, Logger, HttpStatus } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { Request, Response } from 'express';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}  // 此处用于拿到所有意外信息
    
  // catch(exception: HttpException, host: ArgumentsHost) {
    catch(exception: any, host: ArgumentsHost) {
    
    // 使用httpAdapter 拿到所有请求及响应数据， 并进行过滤处理
    const { httpAdapter } = this.httpAdapterHost
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const httpStatus = exception instanceof HttpException  ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
    let  errMsg = exception?.message || HttpException.name

    if( exception?.errno == 1062){
      // 这样拦截有缺点， 每次请求错误表格id会自增一位  // 
      errMsg = `传入的值与表格已有数据重复，具体原因: ${exception.sqlMessage}`
    }

    let resData = {
      statusCode: httpStatus,
      timestamp: new Date().toLocaleString(), // 转成本地时区时间
      path: request.url,
      error: errMsg
    }
    Logger.error(`请求响应数据出现意外错误, 详细信息: ${JSON.stringify(resData) }`)

    httpAdapter.reply(response, resData, httpStatus);
    // response
    //   .status(status)
    //   .json(resData)
    }
}