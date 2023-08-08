//module相当于某一总逻辑接口的入口

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { UserinfoModule } from './userinfo/userinfo.module';
import { Users } from './userinfo/entities/users.entity';
import { Profile } from './userinfo/entities/profile.entity';
import { Logs } from './userinfo/entities/logs.entity';

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
    UserinfoModule, 
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
