import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserinfoService } from 'src/userinfo/userinfo.service';

import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
      private readonly userinfoService: UserinfoService,
        private jwtService: JwtService
        ){}


    async validateUser(username: string, password: string ): Promise<any> {

      const user = await this.userinfoService.findByUsername(username)

      if(!user){
        throw new ForbiddenException('用户不存在')
      }

      const isMatch = await bcrypt.compare(password, user.password);
 
      if(!isMatch) throw new ForbiddenException('用户名或密码错误')
      
      if (user && isMatch) {
          const { username, password } = user;
          return username;
        }
        return null;
      }

      async login(userinfo) {
        const user = await this.userinfoService.findOne(userinfo.username)
        const { username, role } = user
        const payload = { username, role };
        //登录后只要返回token即可
        return {
          access_token: this.jwtService.sign(payload),
        };
      }

     

}
