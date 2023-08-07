import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DemoService } from './demo.service';
import { CreateDemoDto } from './dto/create-demo.dto';
import { UpdateDemoDto } from './dto/update-demo.dto';

@Controller('demo/user')
export class DemoController {
  //  下面这行使用了语法糖 相当于 this.demoService = new DemoService()
  constructor(private readonly demoService: DemoService) {}

  @Post()  //  定义新增post请求
  create(@Body() createDemoDto: CreateDemoDto) {
    return this.demoService.create(createDemoDto);
  }

  @Get()
  findAll() {
    return this.demoService.findAll();
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
