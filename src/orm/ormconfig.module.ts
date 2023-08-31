
//  后续typeorm官方可能升级语法

//  需要把配置信息改造成单独的ts文件进行引用,  见底部模板

import { Module } from '@nestjs/common';

import {  ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';

// import { Users } from '../userinfo/entities/users.entity';
// import { Profile } from '../userinfo/entities/profile.entity';
// import { Logs } from '../userinfo/entities/logs.entity';



const path = require('path')
const fs = require('fs')
  // const DirPath = path.resolve(__dirname, '../userinfo/entities/')
  // var routesss =  fs.readdirSync(DirPath)
  // let entityFile = routesss.filter( (item => item.includes('.js')))


  // const ttt = async function(){
  //   let allEntities = []

  // await  entityFile.forEach( async item => {
  //       let eachPath = path.join(DirPath, item);
  //           let eachEntity =  require(eachPath);   // 获得类的实体
  //           // console.log("🚀 ~ file: ormconfig.module.ts:43 ~ eachEntity:", Object.values(eachEntity))
  //         await  allEntities.push( ...Object.values(eachEntity))
  //         });

  //         console.log("🚀 ~ file: ormconfig.module.ts:39 ~ allEntities:", allEntities)
  //         return allEntities
  //         // console.log("🚀 ~ file: ormconfig.module.ts:37 ~ ttt ~ allEntities:", allEntities)
  //         // return allEntities
  //       }
        
        // ttt()
        // ☆☆☆☆☆☆☆☆☆☆☆☆☆搞不懂????????竟然可以生效?????????☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆
        let allEntities2 = [path.resolve(__dirname,'../roles/*.entity.js')]
        let allEntities3 = [path.resolve(__dirname,'../userinfo/*.entity.js')]
        let allEntities4 = [path.resolve(__dirname,'../userinfo/entities/*.entity.js')]
        let allEntities = allEntities2.concat(allEntities3).concat(allEntities4)
        // console.log("🚀 ~ file: ormconfig.module.ts:42 ~ allEntities2:", allEntities2)

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
              entities: allEntities,
              // [  // 定义生成表格
              //   Users,
              //   Profile,
              //   Logs,
              // ],
              synchronize: true,  // 同步本地的schema与数据库
              timezone: "08:00", // 纠正时区偏差8小时
              logging: ['error'],  //日志记录类型  数据库操作记录
              
            } as TypeOrmModuleOptions ),
          }),
    ]
})
export class OrmConfig {}



/**
 * 
 * 需要同时导出2个变量
 * 
 * 
 * 第一个给nest 读取
 * 
 * 
 export  const ormconfig = {



 }as TypeOrmModuleOptions


*
* 第二个导出给  typeorm  读取
 export default new DataSource ({


 } as DataSourceOptions
 )


 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 */