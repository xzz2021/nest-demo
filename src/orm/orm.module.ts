import { Module } from '@nestjs/common';

import {  ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';

import { Users } from '../userinfo/entities/users.entity';
import { Profile } from '../userinfo/entities/profile.entity';
import { Logs } from '../userinfo/entities/logs.entity';

@Module({

    imports: [

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
    ]
})
export class OrmModule {}
