import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DemoService } from './demo.service';
import { CreateDemoDto } from './dto/create-demo.dto';
import { UpdateDemoDto } from './dto/update-demo.dto';
import { CreateProfileDto } from './dto/create-profile.dto';

@Controller('demo/user')
export class DemoController {
  //  下面这行使用了语法糖 相当于 this.demoService = new DemoService()
  constructor(private readonly demoService: DemoService) {}

  @Post()  //  定义新增post请求
  create(@Body() createDemoDto: CreateDemoDto) {
    return this.demoService.create(createDemoDto);
  }

  @Post('/profile')  //  定义新增post请求
  createProfile(@Body() createProfileDto: CreateProfileDto) {
    return this.demoService.createProfile(createProfileDto);
  }

  @Get()
  findAll() {
    return this.demoService.findAll();
  }

  @Get('/findProfile/:id')  //  联合查询，一对一表格联动，需要有关键索引，此处为userid
  findProfile(@Param('id') id: number,) {
    return this.demoService.findProfile(id);
  }

  @Post('/find')
  findOne(@Body('username') username: string) {
    return this.demoService.findOne(username);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDemoDto: UpdateDemoDto) {
    return this.demoService.update(+id, updateDemoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.demoService.remove(+id);
  }
}
