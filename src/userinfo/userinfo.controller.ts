import { Controller, Get, Post, Body, Patch, Param, Delete,  All, HttpCode, Redirect, Query, ParseIntPipe, UseGuards, Req, } from '@nestjs/common';
import { UserinfoService } from './userinfo.service';
import { CreateUsersDto } from './dto/create-users.dto';
import { UpdateUsersDto } from './dto/update-users.dto';


import { joinQueryInfo } from './dto/join-query-info.dto'
import { ProfileDto } from './dto/profile.dto';
import { AuthService } from '../auth/auth.service';
import { JwtAuthGuard, LocalAuthGuard } from 'src/guard/auth.guard';


// @Controller({host: 'http://localhost：3000'})  // 可以控制请求来源
// @UseFilters(new HttpExceptionFilter()) // 对整个控制器 进行  异常错误过滤处理
@Controller('userinfo')
export class UserinfoController {

  // 通过构造器传入 详细业务处理函数service
  constructor(
    private readonly userinfoService: UserinfoService,
    private readonly authService: AuthService,
    // private readonly logger: Logger,

    ) {
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  signIn(@Body() userinfo: any, @Req() req: Request){
    // 经过守卫返回的信息会自动放在req.user中
    // console.log("🚀 ~ file: userinfo.controller.ts:30 ~ UserinfoController ~ signIn ~ userinfo:", userinfo)
    // 如果上面守卫校验通过了,则会执行下面的登录返回token时间
    return this.authService.login(userinfo)
  }

  @Post('register')  // 新增表格数据接口
  //  body后的dto定义传递过来的请求体数据格式
  // 如果前端数据体传递了其他未在dto定义的数据，将会被自动剔除
  create(@Body() createUsersDto: CreateUsersDto) {
    return this.userinfoService.create(createUsersDto);
  }

  @Get('testRedirect')  // 重定向接口  貌似可以作为迁移接口或测试接口使用
  @Redirect('http://localhost:3000/userinfo/getlogs/3', 313)
  testRedirect(@Query('version') version){      //  动态返回 重定向url
    if (version && version == 'test') {
      return { url: 'http://localhost:3000/userinfo/getlogs/1'};
    }
  }
  


  @Get('/findProfile/:id')  //  联合查询，一对一表格联动，需要有关键索引，此处为userid

  findProfile(@Param('id') id: number,) {
    return this.userinfoService.findProfile(id);
  }

  @Post('/find')
  findOne(@Body('username') username: string) {
    return this.userinfoService.findOne(username);


  }
  
  @Post('updateprofile')   // 更新数据   用户信息
  updateprofile(@Body() profileDto: ProfileDto) {
  return this.userinfoService.updateprofile(profileDto);
}


  @Post('addprofile')   // 修改数据   用户信息
  addprofile(@Body() profileDto: ProfileDto) {
    return this.userinfoService.addprofile(profileDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/getprofile/:id')
  getprofile(@Param('id', ParseIntPipe) id: number, @Req() req: Request) {
  // console.log("🚀 ~ file: userinfo.controller.ts:80 ~ UserinfoController ~ getprofile ~ id:", id)

    return this.userinfoService.getprofile(id);
  }

  @Patch(':id')   // 修改数据   用户信息
  update(@Param('id') id: string, @Body() updateUsersDto: UpdateUsersDto) {
    return this.userinfoService.update(+id, updateUsersDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userinfoService.remove(+id);
  }


  @Get('/getlogs/:id')  //  联合查询，一对一表格联动，需要有关键索引，此处为userid
  // @HttpCode(207)  
  // @Header('Cache-Control', 'none')

  // getLogs(@Param() params: any,   ${params.id} 
// @UseFilters(new HttpExceptionFilter()) // 单个异常错误过滤处理
    // ParseIntPipe会对传递来的id进行校验
  getLogs(@Param('id', ParseIntPipe) id: number, 
  ) {
    // throw new ForbiddenException();
    //  正常异常抛出

      // throw new HttpException({
      //   status: HttpStatus.FORBIDDEN,
      //   error: 'This is a custom message',
      // }, HttpStatus.FORBIDDEN, {
      //   cause: 'test error'  // 抛出错误原因给日志打印
      // })
    
    // Logger.error('eeeeerror')
    // Logger.log('llllog')
    // Logger.warn('wwwwarn')
    // Logger.verbose('verbose')
    return this.userinfoService.findLogsByGroup(id);
  }

  //暂不清楚作用
  @All()
  test(){
    console.log("🚀 ~ file: userinfo.controller.ts:58 ~ UserinfoController ~ @All ~ All:")
    
  }

  @Get('joinquery')  // 联合查询
  joinQuery(@Query() joinQueryParams: joinQueryInfo) {

    this.userinfoService.joinQuery(joinQueryParams)
  }

}
