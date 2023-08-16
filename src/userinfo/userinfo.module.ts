import { Module } from '@nestjs/common';
import { UserinfoService } from './userinfo.service';
import { UserinfoController } from './userinfo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profile } from './entities/profile.entity';
import { Users } from './entities/users.entity';
import { Logs } from './entities/logs.entity';
import { UsersRole } from './entities/usersrole.entity';
import { Roles } from './entities/roles.entity';


@Module({
  imports: [
    TypeOrmModule.forFeature([Users, Profile, Logs, UsersRole, Roles]),
    // AuthModule
    

  ],  //子模块调用数据库必须进行引入表单
  controllers: [UserinfoController],
  providers: [UserinfoService],
  exports: [UserinfoService]   //  当此处暴露出去后，就可以在引用了此UserinfoModule的其他模块中共享使用UserinfoService
})
export class UserinfoModule {}
