import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UserinfoModule } from 'src/userinfo/userinfo.module';

@Module({
  imports: [UserinfoModule],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}
