import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

//  使用winston替代nest自带日志系统
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { RequestInterceptor } from './interceptor/request';
import { ResponseInterceptor } from './interceptor/response';
import { AllExceptionFilter } from './filter/all-exception';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.setGlobalPrefix('全局接口前缀')
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER))  //  全局替换日志系统

  // 全局filter只能有一个
  const httpAdapter  = app.get(HttpAdapterHost)
  app.useGlobalFilters(new AllExceptionFilter(httpAdapter))  // 对全局请求异常错误的过滤器，排除网关根目录请求
  
  app.useGlobalInterceptors(new RequestInterceptor())  //  对全局的接口 请求 进行日志记录
  app.useGlobalInterceptors(new ResponseInterceptor())  //  对全局的接口 响应 进行日志记录

  //  全局数据格式校验管道
  app.useGlobalPipes(new ValidationPipe(
    // 保留dto里定义过的数据字段, 去除前端传递过来的其他字段, 防范恶意代码
    // {whitelist: true,   }
  ));
  await app.listen(3000);
}
bootstrap();
