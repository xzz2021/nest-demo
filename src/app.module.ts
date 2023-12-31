//module相当于某一总逻辑接口的入口

import {  MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config'
import { UserinfoModule } from './userinfo/userinfo.module';

import { HttpMiddleware } from './allProcessor/middleware/http';
import { LoggerModule } from './logger/logger.module';
import { OrmConfig } from './orm/ormconfig.module';
import { AuthModule } from './auth/auth.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { RolesModule } from './roles/roles.module';
import { UsersModule } from './users/users.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { ProfilesModule } from './profiles/profiles.module';
import { MenusModule } from './menus/menus.module';
// import * as Joi from 'joi'  // 引入字段校验,可以检验变量类型是否合法

// @Global()  //  使此app模块引入的依赖能够作为全局依赖应用到所有子模块
@Module({
  imports: [
    ConfigModule.forRoot(
      {
        isGlobal: true,   // 全局注入env环境变量
        // envFilePath: '',  // 设置env文件路径
        // load ; [] //  加载额外导入的env文件或变量，低优先级
        // validationSchema: Joi.object({ TESTPWD: Joi.string().default('defff')}),  //检验导入的ConfigModule全局变量类型是否合法
      }  
    ),

    // 引入静态文件服务
    ServeStaticModule.forRoot({
      // 访问路径不需要目录名
      rootPath: join(__dirname, '..', 'static'),
      //  浏览器服务访问的前缀
      serveRoot: '/xzz/',
      //  未知功能
      // renderPath: '/xzz/',

    }),

    // 请求限流
    ThrottlerModule.forRoot({
      ttl: 60,  // 请求限制时间
      limit: 30, // 请求限制次数
    }),


    UserinfoModule, // 用户信息处理模块

    LoggerModule,   //打印日志模块
     
    OrmConfig,   //
    
    AuthModule, RolesModule, UsersModule, ProfilesModule, MenusModule,

  ],
  controllers: [AppController],
  providers: [
    AppService,
    // 添加全局  限流 守卫
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard
    },
    // { //  全局注册RBAC角色守卫
    //   provide: APP_GUARD,
    //   useClass: RolesGuard
    // }
    ],
  //  全局注入过滤器或其他组件
  // providers: [{ provide: APP_FILTER,useClass: HttpExceptionFilter }]


})
// export class AppModule {}  //

export class AppModule implements NestModule {

  configure(consumer: MiddlewareConsumer) {
    // consumer.apply(cors(), helmet(), logger).forRoutes(CatsController);
    consumer
      .apply(HttpMiddleware)   //  应用中间件  // 这里可以传入多个中间件 
      .forRoutes('app')  // 这里还可以直接传入多个控制器
      // .forRoutes({ path: 'cats', method: RequestMethod.GET });  //指定使用的路由
  }
}
