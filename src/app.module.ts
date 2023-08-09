//module相当于某一总逻辑接口的入口

import { Global, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { UserinfoModule } from './userinfo/userinfo.module';
import { Users } from './userinfo/entities/users.entity';
import { Profile } from './userinfo/entities/profile.entity';
import { Logs } from './userinfo/entities/logs.entity';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';

import  'winston-daily-rotate-file';

import { format } from 'winston';
const { combine, timestamp, label, prettyPrint } = format;
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
          Users,
          Profile,
          Logs,
        ],
        synchronize: true,  // 同步本地的schema与数据库
        logging: ['error'],  //日志记录类型  数据库操作记录
        
      } as TypeOrmModuleOptions ),
    }),
    UserinfoModule, // 用户信息处理模块

    WinstonModule.forRoot({
      
      //  输出格式
      // format: winston.format.json(),
      // format: combine(
      //   label({ label: '测试' }),
      //   timestamp(),
      //   prettyPrint()
      // ),
      

      transports: [  
        new winston.transports.Console({
          format: winston.format.combine(
              // label({ label: '测试' }),
              timestamp(),
          ),
        }),
        // 输出文件
        // new winston.transports.File({
        //   filename: 'logFile/combined.log',
        //   level: 'info',
        //   // format: winston.format.combine(
        //   //   winston.format.timestamp({
        //   //     format: 'YYYY-MM-DD HH:mm:ss',
        //   //   }),
        //   //   winston.format.json(),
        //   // ),
        // }),
        new winston.transports.File({
          filename: 'logFile/errors.log',
          level: 'error'
        }),
        // new winston.transports.File({
        //   filename: 'logFile/warning.log',
        //   level: 'warning'
        // }),
        new winston.transports.DailyRotateFile({
          level: 'info',
          filename: 'logFile/info-%DATE%.log',
          datePattern: 'YYYY-MM-DD-HH',
          zippedArchive: true,
          maxSize: '10m',
          maxFiles: '14d'
        }),
        new winston.transports.DailyRotateFile({
          level: 'warn',
          filename: 'logFile/warn-%DATE%.log',
          datePattern: 'YYYY-MM-DD-HH',
          zippedArchive: true,
          maxSize: '10m',
          maxFiles: '30d'
        }),
        
      ],
      // 未捕获的异常
      exceptionHandlers: [
        new winston.transports.File({ filename: 'logFile/exceptions.log' })
      ]
    })

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
