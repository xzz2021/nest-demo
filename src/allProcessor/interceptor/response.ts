// 这里定义接口响应日志拦截器
/*
这里处理的是service最终return出去的数据


且 如果是批量查询 则是进行map 对每条都进行循环处理
https://docs.nestjs.com/interceptors#interceptors
*/
import { Injectable,  NestInterceptor,  ExecutionContext, CallHandler, Logger } from '@nestjs/common';
import { Observable } from 'rxjs';
import {  map } from 'rxjs/operators';

export interface Response<T> {
    data: T;
  }

//   定义正常的  响应返回数据 格式

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
                map(data =>  {  // 这里可以统一返回数据的模板格式
                    // 拦截无效
                    // if(data?.password){
                    //     let { password, ...rest } = data
                    //     return rest
                    // }
                    // if(statusCode.toString().startsWith("2")){
                        const resData = {
                            statusCode, 
                            timestamp: new Date().toLocaleString(), // 转成本地时区时间
                            data,
                          }
                        return resData
                    // }
                    // return data
                }
                
                ),
            );
    }
}

