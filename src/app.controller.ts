// controller 相当于路由分发，传参定义上级路径

//  app作为全局资源入口

import { ClassSerializerInterceptor, Controller, Get, Inject, LoggerService, Param, Query, Redirect, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
// import { WINSTON_MODULE_PROVIDER } from 'nest-winston';


@UseInterceptors(ClassSerializerInterceptor)
@Controller('app') // 默认空，代表路径127.0.0.1：3000
export class AppController {
  constructor(
    private readonly appService: AppService,
    // @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: LoggerService
    ) {}




    @Get('testRedirect')  // 重定向接口  貌似可以作为迁移接口或测试接口使用
    @Redirect('http://localhost:3000/userinfo/getlogs/3', 313)
    testRedirect(@Query('version') version){      //  动态返回 重定向url
      if (version && version == 'test') {
        return { url: 'http://localhost:3000/userinfo/getlogs/1'};
      }
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
