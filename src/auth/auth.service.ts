import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserinfoService } from 'src/userinfo/userinfo.service';

@Injectable()
export class AuthService {
    constructor(
      private readonly userinfoService: UserinfoService,
        private jwtService: JwtService
        ){}

    async validateUser(username: string, password: string ): Promise<any> {

      const user = await this.userinfoService.findOne(username)
      if (user && user.password === password) {
          const { password, ...result } = user;
          return result;
        }
        return null;
      }

      async login(userinfo) {
        const payload = { username: userinfo.username, sub: 'any msg' };
        return {
          access_token: this.jwtService.sign(payload),
        };
      }

}
