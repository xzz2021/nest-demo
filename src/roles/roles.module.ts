import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { Roles } from './roles.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/userinfo/users.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Roles, Users]),
  ],
  controllers: [RolesController],
  providers: [RolesService]
})
export class RolesModule {}
