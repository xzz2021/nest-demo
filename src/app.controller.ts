// controller 相当于路由分发，传参定义上级路径

//  app作为全局资源入口

import { Controller, Get, Inject, Ip, LoggerService, Param, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
// import { UserinfoService } from './userinfo/userinfo.service';

import { Request } from 'express';
@Controller('app') // 默认空，代表路径127.0.0.1：3000
export class AppController {
  constructor(
    private readonly appService: AppService,
    // private readonly userinfoService: UserinfoService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: LoggerService
    ) {}

  @Get()
  getHello(@Req() req: Request, @Ip() ippp: string) {
    // this.logger.warn( {message:'==========='})
    // this.logger.warn(req)

    // this.logger.warn(req.ip)
    // this.logger.warn(ippp)
    // return this.userinfoService.findAll()
    return this.appService.getHello();
  }

  @Get('string') // 定义请求方法及次级路径
  getHello2(): string {
    return this.appService.getHello2();
  }

  @Get(':id') // 定义请求方法及次级路径 // 此处定义的变量是字符串，会与下级resource的controller冲突
 getHello3(@Param('id') id: string): any {
      let arr =[]
      for(let i = 0; i < Number(id); i++) {
        arr.push(i + 1 +'')
      }
    return {
      code: 0,
      msg: '请求成功！',
      data: arr,
    }
  }
}
