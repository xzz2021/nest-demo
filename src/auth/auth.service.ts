import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserinfoService } from 'src/userinfo/userinfo.service';

import * as bcrypt from 'bcrypt';
import { forbidden } from 'joi';

@Injectable()
export class AuthService {
    constructor(
      private readonly userinfoService: UserinfoService,
        private jwtService: JwtService
        ){}


    async validateUser(username: string, password: string ): Promise<any> {

      const user = await this.userinfoService.findOne(username)

      if(!user){
        throw new ForbiddenException('用户不存在')
      }

      const isMatch = await bcrypt.compare(password, user.password);
 
      if(!isMatch) throw new ForbiddenException('用户名或密码错误')
      
      if (user && isMatch) {
          const { password, ...result } = user;
          return result;
        }
        return null;
      }

      async login(userinfo) {
        const payload = { username: userinfo.username, sub: 'any msg' };
        let { password, ...info} = userinfo
        return {
          info,
          access_token: this.jwtService.sign(payload),
        };
      }

}
