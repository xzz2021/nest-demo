//service 相当于具体接口对应的执行函数

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';  // 读取全局.env定义好的环境变量

@Injectable()
export class AppService {
  constructor(private _config: ConfigService){
    // this._config = ConfigModule
  }
  getHello(): string {
    return 'Hello World!';
  }

  getHello2(): any {
    return  {msg: 'Hello World2222222222222!', pwd: process.env.TESTPWD, ppwd: this._config.get("TESTPWD")}
  }
}
