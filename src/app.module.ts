//module相当于某一总逻辑接口的入口

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DemoModule } from './demo/demo.module';

@Module({
  imports: [DemoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
