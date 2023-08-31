import { Controller, Get, Param, Delete, ClassSerializerInterceptor, UseInterceptors } from '@nestjs/common';
import { UserinfoService } from 'src/userinfo/userinfo.service';

@Controller('users')
//  排除数据库查询数据的字段(比如password)
@UseInterceptors(ClassSerializerInterceptor)
export class UsersController {
  constructor(private readonly userinfoService: UserinfoService ) {}

  @Get()
  findAll() {
    return this.userinfoService.findAll2();
  }


  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userinfoService.remove(+id);
  }
}
