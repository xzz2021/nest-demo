import { Module } from '@nestjs/common';
import { UserinfoService } from './userinfo.service';
import { UserinfoController } from './userinfo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profile } from './entities/profile.entity';
import { Users } from './entities/users.entity';
import { Logs } from './entities/logs.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Users, Profile, Logs])],  //子模块调用数据库必须进行引入表单
  controllers: [UserinfoController],
  providers: [UserinfoService]
})
export class UserinfoModule {}
