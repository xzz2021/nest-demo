//service 相当于具体接口对应的执行函数

import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getHello2(): any {
    return  {msg: 'Hello World2222222222222!'}
  }
}
