import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { Roles } from './roles.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/users/users.entity';
import { UserinfoModule } from 'src/userinfo/userinfo.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Roles, Users]),
    UserinfoModule,
  ],
  controllers: [RolesController],
  providers: [RolesService]
})
export class RolesModule {}
