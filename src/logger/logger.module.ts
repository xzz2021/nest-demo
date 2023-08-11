
// 抽离日志 模块成单独文件

import { Module } from '@nestjs/common';
import { utilities as nestWinstonModuleUtilities, WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import  'winston-daily-rotate-file';
import { format } from 'winston';


const { combine, timestamp, label, prettyPrint } = format;

@Module({
    imports: [
    WinstonModule.forRoot({
      
        //  输出格式
        // format: winston.format.json(),
        format: combine(
          winston.format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss',
        }),
        winston.format.printf((info) => {   // 定义文件输出内容
          // console.log("🚀 ~ file: app.module.ts:65 ~ winston.format.printf ~ info:", info)
          return `时间:${info.timestamp},日志类型:${info.level},${info?.context ? `运行背景: ${info.context}` : '' },日志信息: ${info.message}`
        })
          // label({ label: '测试' }),
          // timestamp(),
          // prettyPrint()
        ),
        transports: [  
          new winston.transports.Console({
            format: winston.format.combine(
                // label({ label: '测试' }),
                timestamp(),
                // winston.format.ms(), // 日期不补零
                nestWinstonModuleUtilities.format.nestLike('MyApp', {
                  colors: true,
                  // prettyPrint: true,
                }),
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
          // new winston.transports.File({
          //   filename: 'logFile/errors.log',
          //   level: 'error'
          // }),
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
            maxFiles: '14d',
          }),
          new winston.transports.DailyRotateFile({
            level: 'warn',
            filename: 'logFile/warn-%DATE%.log',
            datePattern: 'YYYY-MM-DD-HH',
            zippedArchive: true,
            maxSize: '10m',
            maxFiles: '30d'
          }),
          new winston.transports.DailyRotateFile({
            level: 'error',
            filename: 'logFile/error-%DATE%.log',
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
    ]
})



export class LoggerModule {

   



}
