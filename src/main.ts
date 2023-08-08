import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

//  使用winston替代nest自带日志系统
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.setGlobalPrefix('全局接口前缀')
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER))  // 
  await app.listen(3000);
}
bootstrap();
