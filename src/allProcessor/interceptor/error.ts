  
  //  错误拦截器
  import { Injectable, NestInterceptor,  ExecutionContext, BadGatewayException, CallHandler,  } from '@nestjs/common';
  import { Observable, throwError } from 'rxjs';
  import { catchError } from 'rxjs/operators';
  
  @Injectable()
  export class ErrorsInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
      return next
        .handle()
        .pipe(
          catchError( err =>  {
          // console.log("🚀 ~ file: error.ts:14 ~ ErrorsInterceptor ~ intercept ~ err:", err)

            return throwError(() => new BadGatewayException())
          }
            
            
          ),
        );
    }
  }
  