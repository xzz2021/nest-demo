// 这里定义接口响应日志拦截器

//  拦截器执行之后 对  数据字段的过滤

import { Injectable,  NestInterceptor,  ExecutionContext, CallHandler, Logger } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { Observable } from 'rxjs';
import {  map } from 'rxjs/operators';

export interface Response<T> {
    data: T;
  }

@Injectable()
export class SerializeInterceptor<T> implements NestInterceptor<T, Response<T>> {
    // 作为装饰器使用  接收任意实例的dto
    constructor(private dto: any){ }
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {

        return next.handle().pipe(
                map((data) =>  { 
                    // 此内置函数用于 定义 暴露或排除 的字段,,定义在各个dto中
                    return plainToInstance(this.dto, data, {

                        excludeExtraneousValues: true
                    })
                })
            )
    }
}


/*
在控制器接口上 使用装饰器 进行 装饰
@UseInterceptors(new SerializeInterceptor(anyDto))


*/

