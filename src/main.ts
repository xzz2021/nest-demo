import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

//  使用winston替代nest自带日志系统
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { HttpExceptionFilter } from './filter/http-exception';
import { RequestInterceptor } from './interceptor/request';
import { ResponseInterceptor } from './interceptor/response';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.setGlobalPrefix('全局接口前缀')
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER))  //  全局替换日志系统

  // 全局filter只能有一个

  app.useGlobalFilters(new HttpExceptionFilter())  // 对全局请求异常错误的过滤器，排除网关
  
  app.useGlobalInterceptors(new RequestInterceptor())  //  对全局的接口 请求 进行日志记录
  app.useGlobalInterceptors(new ResponseInterceptor())  //  对全局的接口 响应 进行日志记录
  await app.listen(3000);
}
bootstrap();
