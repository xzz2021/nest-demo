import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

//  使用winston替代nest自带日志系统
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { HttpExceptionFilter } from './filter/http-exception';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.setGlobalPrefix('全局接口前缀')
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER))  //  全局替换日志系统

  // app.useGlobalFilters(new HttpExceptionFilter())  // 对全局请求异常错误的过滤器，排除网关
  await app.listen(3000);
}
bootstrap();
