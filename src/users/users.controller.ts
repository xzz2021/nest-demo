import { Controller, Get, Param, Delete, ClassSerializerInterceptor, UseInterceptors, Body, Post } from '@nestjs/common';
import { UserinfoService } from 'src/userinfo/userinfo.service';

@Controller('users')
//  排除数据库查询数据的字段(比如password)
@UseInterceptors(ClassSerializerInterceptor)
export class UsersController {
  constructor(private readonly userinfoService: UserinfoService ) {}

  @Get("getall")
  findAll() {
    return this.userinfoService.findAll2();
  }


  @Post("modifyinfo")
  modifyInfo(@Body() newInfo: any) {
    console.log("🚀 ~ file: users.controller.ts:18 ~ UsersController ~ modifyInfo ~ newInfo:", newInfo)
    return this.userinfoService.modifyInfo(newInfo);
  }


  @Delete('delete')
  remove(@Body() body: {username: string}) {
    return this.userinfoService.remove(body);
  }
}
