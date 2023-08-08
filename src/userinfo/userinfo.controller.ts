import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserinfoService } from './userinfo.service';
import { CreateUsersDto } from './dto/create-users.dto';
import { UpdateUsersDto } from './dto/update-users.dto';


@Controller('userinfo')
export class UserinfoController {

  // 通过构造器传入 详细业务处理函数service
  constructor(
    private readonly userinfoService: UserinfoService,
    // private readonly logger: Logger,

    ) {
  }

  @Post()  // 新增表格数据接口
  create(@Body() createUsersoDto: CreateUsersDto) {
    return this.userinfoService.create(createUsersoDto);
  }

  @Get('/findProfile/:id')  //  联合查询，一对一表格联动，需要有关键索引，此处为userid
  findProfile(@Param('id') id: number,) {
    return this.userinfoService.findProfile(id);
  }

  @Post('/find')
  findOne(@Body('username') username: string) {
    return this.userinfoService.findOne(username);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUsersDto: UpdateUsersDto) {
    return this.userinfoService.update(+id, updateUsersDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userinfoService.remove(+id);
  }


  @Get('/getlogs/:id')  //  联合查询，一对一表格联动，需要有关键索引，此处为userid
  getLogs(@Param('id') id: number,) {
    // this.logger.warn( {message:'==========='})
    return this.userinfoService.findLogsByGroup(id);
  }
}
