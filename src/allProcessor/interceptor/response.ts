// 这里定义接口响应日志拦截器
/*
这里处理的是service最终return出去的数据
https://docs.nestjs.com/interceptors#interceptors
*/
import { Injectable,  NestInterceptor,  ExecutionContext, CallHandler, Logger } from '@nestjs/common';
import { Observable } from 'rxjs';
import {  map } from 'rxjs/operators';

export interface Response<T> {
    data: T;
  }

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, Response<T>> {
    intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
        const start = Date.now(); // 请求开始时间
        const host = context.switchToHttp();
        const response: any = host.getResponse();  //  这里可以得到响应的绝大部分信息
        
        // console.log("🚀 ~ file: response.ts:16 ~ ResponseInterceptor ~ intercept ~ response:", response)
        const statusCode = response.statusCode;
        return next
            .handle()
            .pipe(
                map((data) =>  {  // 这里可以统一返回数据的模板格式
                    // 拦截无效
                    // if(data?.password){
                    //     let { password, ...rest } = data
                    //     return rest
                    // }
                    return data

                    // Logger.log(`响应数据测试`)   //貌似理论上不需要响应日志 ，，，请求里已有记录，，，，而响应失败的话在错误过滤器里会打印失败日志
                }
                
                ),
            );
    }
}

