//module相当于某一总逻辑接口的入口

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DemoModule } from './demo/demo.module';
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import {  User } from './demo/entities/user.entity';
import { Profile } from './demo/entities/profile.entity';

// import * as Joi from 'joi'  // 引入字段校验,可以检验变量类型是否合法
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
    DemoModule,
    // 方法一  直接填配置信息
    // TypeOrmModule.forRoot({   // 数据库集成orm
    //   type: 'mysql',
    //   host: 'xzz2022.top',
    //   port: 3306,
    //   username: 'root',
    //   password: 'zzzxxxccc',
    //   database: 'xzz222',
    //   entities: [],
    //   synchronize: true,  // 同步本地的schema与数据库
    //   logging: ['error'],  //日志记录类型
    // }), 
    //方法二  引入环境变量
    TypeOrmModule.forRootAsync({  
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>({
        type: 'mysql',
        host: configService.get('DBHOST'),
        port: 3306,
        username: 'root',
        password: configService.get('DBPWD'),
        database: 'xzz222',
        entities: [  // 定义生成表格
          User,
          Profile,
        ],
        synchronize: true,  // 同步本地的schema与数据库
        logging: ['error'],  //日志记录类型
        
      } as TypeOrmModuleOptions ),
    }), 
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
