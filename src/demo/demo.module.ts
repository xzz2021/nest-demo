import { Module } from '@nestjs/common';
import { DemoService } from './demo.service';
import { DemoController } from './demo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],  //子模块调用数据库必须进行引入表单
  controllers: [DemoController],
  providers: [DemoService]
})
export class DemoModule {}
