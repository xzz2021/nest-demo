// controller 相当于路由分发，传参定义上级路径

import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';


@Controller() // 默认空，代表路径127.0.0.1：3000
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('66') // 定义请求方法及次级路径
  getHello2(): string {
    return this.appService.getHello2();
  }

  @Get(':id') // 定义请求方法及次级路径
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
