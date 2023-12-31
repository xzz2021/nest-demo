import { Controller, Get, Post, Body, Patch, Param, Query, ParseIntPipe, UseGuards, Req, ClassSerializerInterceptor, UseInterceptors, } from '@nestjs/common';
import { UserinfoService } from './userinfo.service';
import { UpdateUsersDto } from './dto/update-users.dto';


import { joinQueryInfo } from './dto/join-query-info.dto'
import { ProfileDto } from './dto/profile.dto';
import { JwtAuthGuard } from 'src/allProcessor/guard/auth.guard';


// @Controller({host: 'http://localhost：3000'})  // 可以控制请求来源
// @UseFilters(new HttpExceptionFilter()) // 对整个控制器 进行  异常错误过滤处理
@Controller('userinfo')
@UseInterceptors(ClassSerializerInterceptor)
export class UserinfoController {

  // 通过构造器传入 详细业务处理函数service
  constructor(
    private readonly userinfoService: UserinfoService,
    // private readonly logger: Logger,

    ) {
  }
  

  @Get('/findProfile/:id')  //  联合查询，一对一表格联动，需要有关键索引，此处为userid
  findProfile(@Param('id') id: number,) {
    return this.userinfoService.findProfile(id);
  }

  @Post('/findone')
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

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.userinfoService.remove(+id);
  // }


  //暂不清楚作用
  // @All()
  // test(){
  //   console.log("🚀 ~ file: userinfo.controller.ts:58 ~ UserinfoController ~ @All ~ All:")
    
  // }

  @Get('joinquery')  // 联合查询
  joinQuery(@Query() joinQueryParams: joinQueryInfo) {
    this.userinfoService.joinQuery(joinQueryParams)
  }

  @UseGuards(JwtAuthGuard)
    @Get('getinfo')
    getInfo(@Req() req: any){
      // token解析出来的数据会在@Req中返回
      let userinfo = req.user
      return userinfo
    }


}
