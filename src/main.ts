import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

//  使用winston替代nest自带日志系统
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { RequestInterceptor } from './allProcessor/interceptor/request';
import { ResponseInterceptor } from './allProcessor/interceptor/response';
import { AllExceptionFilter } from './allProcessor/filter/all-exception';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 当需要https证书认证时
  // const httpsOptions = {
  //   key: fs.readFileSync('./secrets/private-key.pem'),
  //   cert: fs.readFileSync('./secrets/public-certificate.pem'),
  // };
  // const app = await NestFactory.create(AppModule, {
  //   httpsOptions,
  // });

  //  设置全局路由前缀
  // app.setGlobalPrefix('v1', { exclude: ['cats'] });

  //  nest默认只解析json数据
  // app.useBodyParser('text');

  // 设置允许跨域
  app.enableCors();
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


  // 引入自动生成接口文档的swagger
  const config = new DocumentBuilder()
    .setTitle('接口文档')
    .setDescription('包含所有创建的接口')
    .setVersion('1.0')
    .addTag('xzz2022')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
