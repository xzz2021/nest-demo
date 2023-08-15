import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/userinfo/entities/users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(Users) private readonly usersRepository:  //  调用数据库必须进行注入
            Repository<Users>,
        private jwtService: JwtService
        ){}

    async validateUser(username: string, password: string ): Promise<any> {

        //  为了避免循环依赖引用
        // const user = await this.userinfoService.findByUsername(userinfo);

    // const user = await this.usersRepository.findOne({ where: {username: undefined} })  // 如果是undefined 默认返回表格第一个数据???????????所以千万注意避免传的值是undefined

    const user = await this.usersRepository.findOne({ where: {username} })

        // console.log("🚀 ~ file: auth.service.ts:16 ~ AuthService ~ validateUser ~ user:", user)
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
