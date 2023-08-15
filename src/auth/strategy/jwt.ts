import { Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ExtractJwt } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'TEMPsecret',
    });
  }
  async validate(payload: any) {
    // console.log("🚀 ~ file: jwt.ts:16 ~ JwtStrategy ~ validate ~ payload:", payload)
    //此处return的信息 在被装饰接口里使用@Req  会自动生成在req.user中 供使用
    return { userId: payload.sub, username: payload.username };
  }
}